import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, docData, getCountFromServer, updateDoc } from '@angular/fire/firestore';
import { TOKEN_HEADER_KEY } from '@data/auth/interceptor';
import { QueryDocumentSnapshot, WithFieldValue, doc } from 'firebase/firestore';
import { firstValueFrom, map, } from 'rxjs';
import ChatUser from './chat-user';

export const CURRENT_ADMIN = 'flutter.currentUser';

// const adminServerApi = environment.adminApi;
const adminServerApi = 'http://127.0.0.1:5001/kyonsvn-stg/asia-east1/adminApi';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  afAuth = inject(Auth);
  db = inject(Firestore);
  backend = inject(HttpBackend);

  async resetMana(id: string) {
    const adminToken = await this.afAuth.currentUser?.getIdToken();
    const http = new HttpClient(this.backend);
    const contentType = 'application/json';
    const options = {
      headers: new HttpHeaders().set(TOKEN_HEADER_KEY, `Bearer ${adminToken}`).set('Content-Type', contentType),
    };
    return http.post(`${adminServerApi}/user/${id}/resetMana`, null, options);
  }

  async getUsers(): Promise<Array<ChatUser>> {
    const usersStorage: any[] = JSON.parse(window.localStorage.getItem('users') ?? '[]');
    if (usersStorage.length > 0) {
      return usersStorage.map((user) => ChatUser.fromJson(user));
    }
    console.log('get users from firestore');

    const collectionRef = collection(this.db, `users`).withConverter(userConverter);
    const users = await firstValueFrom(collectionData(collectionRef)
      .pipe(map((users) => {
        console.log(users);

        return users
          .filter(user => user.email).map(user => ChatUser.fromJson(user));
      })));
    window.localStorage.setItem('users', JSON.stringify(users));
    return users;
  }
  async countUsers() {
    const collectionRef = collection(this.db, `users`);
    const snapshot = await getCountFromServer(collectionRef);

    return snapshot.data().count;
  }

  clearStorage() {
    window.localStorage.removeItem('users');
  }

  async getConfig() {
    const docRef = doc(this.db, 'configurations/settings');
    return await firstValueFrom(docData(docRef));
  }

  async getDefaultMana() {
    const config = await this.getConfig();
    if (config == undefined) return -1;
    console.log(config);

    return config['defaultMana'];
  }

  async getContext(): Promise<any> {
    const data = {
      initialGameContext: '',
      initialNoGameContext: '',
      websiteContext: '',
    }
    const config = await this.getConfig();
    if (config == undefined) return data;
    data.initialGameContext = config['initialGameContext'];
    data.initialNoGameContext = config['initialNoGameContext'];
    data.websiteContext = config['websiteContext'];
    return data;
  }

  async getFileValidation(): Promise<any> {
    const data = {
      maxFileSize: 0,
      maxImageSize: 0,
      allowedFileTypes: [''],
      maxStorageSize: 0,
    }
    const config = await this.getConfig();
    if (config == undefined) return data;
    data.maxFileSize = config['maxFileSize'];
    data.maxImageSize = config['maxImageSize'];
    data.allowedFileTypes = config['allowedFileTypes'];
    data.maxStorageSize = config['maxStorageSize'];
    return data;
  }

  saveContext(context: { initialGameContext: string; initialNoGameContext: string; websiteContext: string; }) {
    const docRef = doc(this.db, 'configurations/settings');
    this.updateConfigCache();
    return updateDoc(docRef, context);
  }

  saveDefaultMana(defaultMana: number) {
    const docRef = doc(this.db, 'configurations/settings');
    this.updateConfigCache();
    return updateDoc(docRef, { defaultMana });
  }

  saveFileValidation(fileValidation: { maxFileSize: number; maxImageSize: number; allowedFileTypes: string[]; }) {
    const docRef = doc(this.db, 'configurations/settings');
    this.updateConfigCache();
    return updateDoc(docRef, fileValidation);
  }

  async updateConfigCache() {
    const adminToken = await this.afAuth.currentUser?.getIdToken();
    console.log(adminToken);

    const http = new HttpClient(this.backend);
    const contentType = 'application/json';
    const options = {
      headers: new HttpHeaders().set(TOKEN_HEADER_KEY, `Bearer ${adminToken}`).set('Content-Type', contentType),
    };
    await firstValueFrom(http.post(adminServerApi + '/updateSettings', null, options));
  }

}
const userConverter = {
  toFirestore(value: WithFieldValue<any>) {
    return { value };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return { id: snapshot.id, ...snapshot.data() };
  },
};
