// import { Injectable, inject } from '@angular/core';
// import { Firestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DBHelper } from '@data/helper/helper';
import { UserService } from '@data/user/user.service';
import { formatedDate } from '@share-utils/formats';
import { Observable, catchError, map, throwError } from 'rxjs';

// const chatServerApi = 'http://127.0.0.1:5001/kyonsvn/us-central1/chat';
const chatServerApi = 'https://us-central1-kyonsvn.cloudfunctions.net/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  db = inject(Firestore);
  http = inject(HttpClient);
  userService = inject(UserService);

  getChats(): Observable<any> {
    const userId = this.userService.getUserId();
    if (userId === '') {
      return throwError(() => new Error('Unauthenticated'));
    }
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

  checkCreatedUser() {
    const userId = this.userService.getUserId();
    if (userId === '') {
      return throwError(() => new Error('Unauthenticated'));
    }
    return this.http.get(`${chatServerApi}/user/${userId}/mana`);
  }

  initDefaultMana() {
    const userId = this.userService.getUserId();
    if (userId === '') {
      return throwError(() => new Error('Unauthenticated'));
    }
    const email = this.userService.getEmail();
    const params: Record<string, unknown> = {
      id: userId,
      userInfo: {
        email: email,
      },
      defaultMana: 1000,
    };
    return this.http.post(`${chatServerApi}/onUserCreated`, params);
  }
}
// const chatConverter = {
//   toFirestore(value: WithFieldValue<Chat>) {
//     return { value };
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot) {
//     console.log(snapshot.id);

//     return Chat.fromJson(snapshot.id, snapshot.data()['createdAt'].toDate());
//   },
// };

export class Chat {
  id: string;
  createdAt: Date;
  firstMessage: string;
  messages: Content[] = [];
  dateDisplay: string;
  constructor(id: string, createdAt: Date, firstMessage: string) {
    this.id = id;
    this.firstMessage = firstMessage;
    this.createdAt = createdAt;
    this.dateDisplay = formatedDate(this.createdAt);
  }
  static fromJson({
    id,
    createdAt,
    firstMessage,
  }: {
    id: string;
    createdAt: { _seconds: number };
    messages: { role: string; parts: { text: string }[] }[];
    firstMessage: string;
  }) {
    const createdAtDate = new Date(createdAt._seconds * 1000); // Convert Firebase moment time to TypeScript
    return new Chat(id, createdAtDate, firstMessage);
  }

  updateMessages(messages: { role: string; parts: { text: string }[] }[]) {
    this.messages = messages.map(message => Content.fromJson(message));
  }
}

class Content {
  role: string;
  parts: { text: string }[];
  constructor(role: string, parts: { text: string }[]) {
    this.role = role;
    this.parts = parts;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(data: { role: string; parts: { text: string }[] }) {
    return new Content(data.role, data.parts);
  }
}
