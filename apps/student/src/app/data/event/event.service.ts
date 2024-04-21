import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import { TestContent } from '@share-utils/data';
import math from './sample/math.json';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  backend = inject(HttpBackend);
  http = new HttpClient(this.backend);
  getEvent(only3Questions = false) {
    if (!only3Questions) return TestContent.fromJson(math);
    // Get 3 different unique number randomly from 0 to 8
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {
      const r = Math.floor(Math.random() * 8);
      if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
    }
    math.data = math.data.filter((_, index) => randomNumbers.includes(index));

    return TestContent.fromJson(math);
  }

  submitTest({ event, email, score }: { event: string; email: string; score: number }) {
    return this.http.post(`${serverApi()}/public/offline_event`, {
      event_name: event,
      email: email,
      score: `${score}/3`,
      have_gifts: score === 3,
    });
  }
}
