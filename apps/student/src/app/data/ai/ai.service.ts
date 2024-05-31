import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments';

// const aiServerApi = 'http://127.0.0.1:5001/kyonsvn/us-central1/ai';
const aiServerApi = `${environment.firebase.functionsUrl}/ai`;

@Injectable({
  providedIn: 'root'
})
export class AiService {
  http = inject(HttpClient);

  ask(prompt: string, image: string, mimeType: string) {
    return this.http.post(`${aiServerApi}/ask`, { prompt, image, mimeType });
  }
}
