// import { Injectable, inject } from '@angular/core';
// import { Firestore } from 'firebase/firestore';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DBHelper } from '@data/helper/helper';
import { environment } from '@environments';
import { Chat, Content, FileData, FilePlaceholder, Mana } from '@share-utils/data';
import { IChatService } from '@share-utils/domain';
import { Observable, catchError, map } from 'rxjs';

const chatServerApi = environment.chatApi;
// const chatServerApi = 'http://127.0.0.1:5001/kyonsvn-stg/asia-east1/chatApi';

@Injectable({
  providedIn: 'root',
})
class ChatService implements IChatService {
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
  sendMessageFile(userId: string, message: string, { lessonContext, file, image, chatId, fileData }: { chatId?: string, lessonContext?: string, file?: File, image?: FilePlaceholder, fileData?: FileData } = {}): Observable<string> {
    const formData = new FormData();
    formData.append('prompt', message);
    formData.append('userId', userId);
    if (chatId) formData.append('chatId', chatId);
    if (file) formData.append('file', file);
    if (image) {
      formData.append('fileName', image.name);
      formData.append('mimeType', image.mimeType);
    }
    if (fileData) {
      formData.append('fileId', fileData.id);
      formData.append('bucketId', fileData.bucketId);
    }
    if (lessonContext) formData.append('lessonContext', lessonContext);
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
      Accept: 'application/json',
    });
    // return new Observable();
    return this.http.post(`${chatServerApi}/askFile${fileData ? 'Storage' : ''}`, formData, { headers }).pipe(
      // catchError(DBHelper.handleError('POST sendMessage', [Content.outOfMana()])),
      map((res: any) => {
        if (res['chatId'] === undefined) return '';
        return res['chatId'];
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
      catchError(DBHelper.handleError('GET getMana', [])),
      map((res: any) => {
        if (res.data === undefined) return [];
        return (res.data as any[]).map((data: any) => Content.parseContent(data));
      })
    );
  }
  db = inject(Firestore);
  http = inject(HttpClient);

  // startChat(userId: string, message: string, { lessonContext, file, image }: { lessonContext?: string, file?: File, image?: FilePlaceholder } = {}): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('prompt', message);
  //   formData.append('userId', userId);
  //   if (file) formData.append('file', file);
  //   if (image) {
  //     formData.append('fileName', image.name);
  //     formData.append('mimeType', image.mimeType);
  //   }
  //   if (lessonContext) formData.append('lessonContext', lessonContext);
  //   const headers = new HttpHeaders({
  //     enctype: 'multipart/form-data',
  //     Accept: 'application/json',
  //   });
  //   return this.http.post(`${chatServerApi}/askFile`, formData, { headers }).pipe(
  //     // catchError(DBHelper.handleError('POST sendMessage', [Content.outOfMana()])),
  //     map((res: any) => {
  //       if (res['chatId'] === undefined) return '';
  //       return res['chatId'];
  //     })
  //   );
  // }

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

  // initDefaultMana(userId: string, userEmail: string) {
  //   const params: Record<string, unknown> = {
  //     id: userId,
  //     userInfo: {
  //       email: userEmail,
  //     },
  //     defaultMana: 3000,
  //   };
  //   return this.http.post(`${chatServerApi}/onSubscriptionChanged`, params);
  // }

  removeCache() {
    window.localStorage.removeItem('chats');
    window.localStorage.removeItem('files');
  }
  updateChatName(userId: string, chatId: string, chatName: string): Observable<any> {
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


  getChatsByIds(userId: string, ids: string[]): Observable<Chat[]> {
    if (window.localStorage.getItem('chats')) {
      const chats = JSON.parse(window.localStorage.getItem('chats') as string) as any[];
      return new Observable<Chat[]>((subscriber) => {
        subscriber.next(
          chats.map((data: any) => {
            return Chat.fromJson(data);
          }).filter((chat) => ids.includes(chat.id))
        );
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
        return collection.filter((chat) => ids.includes(chat.id));
      })
    );
  }
}

export { ChatService, chatServerApi };

// const chatConverter = {
//   toFirestore(value: WithFieldValue<Chat>) {
//     return { value };
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot) {
//     console.log(snapshot.id);

//     return Chat.fromJson(snapshot.id, snapshot.data()['createdAt'].toDate());
//   },
// };
