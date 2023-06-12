import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SERVER_API } from '@infrastructure/auth/interceptor';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  http = inject(HttpClient);
  getPromotion(event: string) {
    return this.http.get(SERVER_API + `/students/gifts/promotions/${event}`);
  }
}
