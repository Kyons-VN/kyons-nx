// import { Injectable, inject } from '@angular/core';
// import { Firestore } from 'firebase/firestore';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { serverApi } from '@data/auth/interceptor';
import { DBHelper } from '@data/helper/helper';
import { UserService } from '@data/user/user.service';
import { environment } from '@environments';
import { Observable, catchError, map } from 'rxjs';
import { Chat, Content, FileData, Image, Mana } from './chat-model';

const chatServerApi = `${environment.firebase.functionsUrl}/chat`;
// const chatServerApi = 'http://127.0.0.1:5001/kyonsvn-dev/us-central1/chat';

@Injectable({
  providedIn: 'root',
})
class ChatService {
  backend = inject(HttpBackend);
  getGreeting(): Observable<Content> {
    const params = new HttpParams().set('prompt', '/hello');
    return this.http.get(`${chatServerApi}/greet`, { params: params }).pipe(
      map((res: any) => {
        console.log(res);

        return res.data !== undefined && res.data['text'] !== undefined ? Content.parseContent({
          role: 'model',
          parts: [{ text: res.data['text'] }],
          createdAt: {
            _seconds: Date.now() / 1000,
          },
        }) : Content.outOfMana();
      })
    );
  }
  resetLessonChat(userId: any, lessonId: string) {
    return this.http.put(`${chatServerApi}/user/${userId}/resetLessonChat/${lessonId}`, null);
  }
  // sendMessage(userId: string, chatId: string, message: string, { lessonContext = null, file }: { lessonContext?: string | null, file?: File } = {}): Observable<Content[]> {
  //   let params = new HttpParams();
  //   params = params.set('prompt', message);
  //   if (lessonContext != null) params = params.set('lessonContext', lessonContext);
  //   if(file){
  //     return 
  //   }
  //   return this.http.get(`${chatServerApi}/user/${userId}/${lessonContext ? 'askLesson' : 'ask'}/${chatId}`, { params: params }).pipe(
  //     // catchError(DBHelper.handleError('POST sendMessage', [Content.outOfMana()])),
  //     map(() => {
  //       return [];
  //     })
  //   );
  // }
  sendMessageFile(userId: string, chatId: string, message: string, { lessonContext, file, image }: { lessonContext?: string, file?: File, image?: Image } = {}): Observable<Content[]> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (image) {
      formData.append('fileName', image.name);
      formData.append('mimeType', image.mimeType);
    }
    if (lessonContext) formData.append('lessonContext', lessonContext);
    formData.append('prompt', message);
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
      Accept: 'application/json',
    });
    return this.http.post(`${chatServerApi}/user/${userId}/askFile/${chatId}`, formData, { headers }).pipe(
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

  getChats(userId: string, forceReload = false): Observable<Chat[]> {
    if (window.localStorage.getItem('chats') && !forceReload) {
      const chats = JSON.parse(window.localStorage.getItem('chats') as string);
      return new Observable<Chat[]>((subscriber) => {
        subscriber.next(chats.map((data: any) => {
          return Chat.fromJson(data);
        }));
        subscriber.complete();
      });
    }
    else {
      window.localStorage.removeItem('chats');
    }
    return this.http.get(`${chatServerApi}/user/${userId}/chats`).pipe(
      catchError(DBHelper.handleError('GET getChats', [])),
      map((res: any) => {
        if (res.data === undefined || res.data.length === 0) return [];
        // const collection = res.data;
        window.localStorage.setItem('chats', JSON.stringify(res.data));
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
    return this.http.post(`${chatServerApi}/onSubscriptionChanged`, params);
  }

  removeCache() {
    window.localStorage.removeItem('chats');
    window.localStorage.removeItem('files');
  }
  updateChatName(userId: string, chatId: string, chatName: string) {
    console.log(userId, chatId, chatName);
    return this.http.put(`${chatServerApi}/user/${userId}/updateChat/${chatId}`, { firstMessage: chatName });
  }

  deleteChat(userId: string, chatId: string) {
    return this.http.delete(`${chatServerApi}/user/${userId}/deleteChat/${chatId}`).pipe(
      map((res: any) => {
        console.log(res);
        if (res.success) {
          window.localStorage.removeItem('chats');
        }
        return res;
      })
    );
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
      Accept: 'application/json',
    });

    return this.http.post(`${serverApi()}/api/v2/users/images/upload`, formData, { headers });
  }

  deleteFile(fileName: string) {
    console.log(fileName);
    const body = JSON.stringify({ id: '1718460117.png' });  // Data for request body

    return this.http.delete(`${serverApi()}/api/v2/users/images/delete`, { body })
  }

  getFile(userId: string, fileId: string): Observable<FileData | null> {
    const files = JSON.parse(localStorage.getItem('files') ?? '{}');
    if (files[fileId]) {
      return new Observable<FileData | null>((subscriber) => {
        subscriber.next(FileData.fromJson(files[fileId]));
        subscriber.complete();
      });
    }
    return this.http.get(`${chatServerApi}/user/${userId}/file/${fileId}`).pipe(
      map((res: any) => {
        if (res.data === undefined) return null;
        const filePart = FileData.fromJson(res.data);
        files[fileId] = filePart.toJson();
        window.localStorage.setItem('files', JSON.stringify(files));
        return filePart;
      })
    );
  }
}

export { Chat, ChatService, chatServerApi };

// const chatConverter = {
//   toFirestore(value: WithFieldValue<Chat>) {
//     return { value };
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot) {
//     console.log(snapshot.id);

//     return Chat.fromJson(snapshot.id, snapshot.data()['createdAt'].toDate());
//   },
// };
