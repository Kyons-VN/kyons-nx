import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { serverApi } from '@infrastructure/auth/interceptor';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  http = inject(HttpClient);
  getPromotion(event: string) {
    return this.http.get(`${serverApi()}/students/gifts/promotions/${event}`);
  }
}
