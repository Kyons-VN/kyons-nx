// import { Injectable, inject } from '@angular/core';
// import { Firestore } from 'firebase/firestore';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DBHelper } from '@data/helper/helper';
import { UserService } from '@data/user/user.service';
import { Observable, catchError, map } from 'rxjs';
import { Chat, Content, Mana } from './chat-model';

// const chatServerApi = 'http://127.0.0.1:5001/kyonsvn/us-central1/chat';
const chatServerApi = 'https://us-central1-kyonsvn.cloudfunctions.net/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  sendMessage(userId: string, chatId: string, message: string): Observable<Content[]> {
    const params = new HttpParams().set('prompt', message);
    return this.http.get(`${chatServerApi}/user/${userId}/ask/${chatId}`, { params: params }).pipe(
      // catchError(DBHelper.handleError('POST sendMessage', [Content.outOfMana()])),
      map(() => {
        return [];
      })
    );
  }
  getMana(userId: string): Observable<Mana> {
    return this.http.get(`${chatServerApi}/user/${userId}/mana`).pipe(
      catchError(DBHelper.handleError('GET getMana', Mana.invalid())),
      map((res: any) => {
        if (res['mana'] === undefined || res['defaultMana'] === undefined) return Mana.invalid();
        return new Mana(res['mana'], res['defaultMana']);
      })
    );
  }
  getMessages(userId: string, chatId: string): Observable<Content[]> {
    return this.http.get(`${chatServerApi}/user/${userId}/chat/${chatId}`).pipe(
      catchError(DBHelper.handleError('POST startChat', '')),
      map((res: any) => {
        if (res.data === undefined) return [];
        return (res.data as any[]).map((data: any) => Content.parseContent(data));
      })
    );
  }
  db = inject(Firestore);
  http = inject(HttpClient);
  userService = inject(UserService);

  startChat(userId: string, message: string): Observable<string> {

    const params = new HttpParams().set('prompt', message);
    return this.http.get(`${chatServerApi}/user/${userId}/ask`, { params: params }).pipe(
      // catchError(DBHelper.handleError('POST startChat', '')),
      map((res: any) => {
        if (res['chatId'] === undefined) return '';
        return res['chatId'];
      })
    );
  }

  getChats(userId: string): Observable<any> {
    return this.http.get(`${chatServerApi}/user/${userId}/chats`).pipe(
      catchError(DBHelper.handleError('GET getChats', [])),
      map((res: any) => {
        if (res.data === undefined || res.data.length === 0) return [];
        // const collection = res.data;
        const collection = (res.data as any[]).map((data: any) => {
          return Chat.fromJson(data);
        });
        return collection;
      })
    );
  }

  checkCreatedUser(userId: string) {
    return this.http.get(`${chatServerApi}/user/${userId}/mana`);
  }

  initDefaultMana(userId: string) {
    const email = this.userService.getEmail();
    const params: Record<string, unknown> = {
      id: userId,
      userInfo: {
        email: email,
      },
      defaultMana: 3000,
    };
    return this.http.post(`${chatServerApi}/onUserCreated`, params);
  }
}

export { Chat };
// const chatConverter = {
//   toFirestore(value: WithFieldValue<Chat>) {
//     return { value };
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot) {
//     console.log(snapshot.id);

//     return Chat.fromJson(snapshot.id, snapshot.data()['createdAt'].toDate());
//   },
// };
