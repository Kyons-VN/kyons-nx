import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer } from '@angular/fire/firestore';
import { chatServerApi } from '@data/chat/chat.service';
import { QueryDocumentSnapshot, WithFieldValue } from 'firebase/firestore';
import { firstValueFrom, map } from 'rxjs';
import ChatUser from './chat-user';

export const CURRENT_ADMIN = 'flutter.currentUser';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  db = inject(Firestore);
  http = inject(HttpClient);
  resetMana(id: string) {
    return this.http.post(`${chatServerApi}/user/${id}/resetMana`, null);
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
}
const userConverter = {
  toFirestore(value: WithFieldValue<any>) {
    return { value };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return { id: snapshot.id, ...snapshot.data() };
  },
};
