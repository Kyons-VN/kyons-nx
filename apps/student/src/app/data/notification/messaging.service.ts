import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private messaging: AngularFireMessaging) {
    // Get the current FCM token
  }

  requestPermission() {
    return this.messaging.requestPermission;
  }

  getToken() {
    return this.messaging.getToken;
  }
}
