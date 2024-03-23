import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging, SERVICE_WORKER } from '@angular/fire/compat/messaging';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messages!: Observable<any>;
  constructor(private messaging: AngularFireMessaging, private http: HttpClient) {
    this.messages = messaging.messages;
    this.messages.pipe(map(message => console.log(message)));
  }
}

export const notificationServiceProvider = {
  provide: SERVICE_WORKER,
  useFactory: () =>
    (typeof navigator !== 'undefined' &&
      navigator.serviceWorker?.register('firebase-messaging-sw.js', { scope: '__' })) ||
    undefined,
};
