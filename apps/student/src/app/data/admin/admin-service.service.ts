import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { QueryDocumentSnapshot, WithFieldValue } from 'firebase/firestore';

export const CURRENT_ADMIN = 'flutter.currentUser';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  db = inject(Firestore);
  getUsers() {
    const collectionRef = collection(this.db, `users`).withConverter(userConverter);
    return collectionData(collectionRef);
  }
}
const userConverter = {
  toFirestore(value: WithFieldValue<any>) {
    return { value };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    console.log(snapshot.id);

    return { uid: snapshot.id, ...snapshot.data() };
  },
};
