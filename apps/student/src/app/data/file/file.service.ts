import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Capacity, FileData, Image } from '@data/file/file-model';
import { environment } from "@environments";
import { map, Observable } from "rxjs";


const fileServerApi = environment.fileApi;
// const fileServerApi = 'http://127.0.0.1:5001/kyonsvn-stg/asia-east1/fileApi';

@Injectable({
  providedIn: 'root',
})
class FileService {
  http = inject(HttpClient);
  accept = 'image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/mpeg,video/avi,video/mov,video/webm,video/mkv,video/wmv,application/pdf,text/*,application/x-javascript,application/x-typescript,text/x-python,application/json,application/rtf,audio/mpeg,audio/wav,audio/webm,audio/x-m4a,audio/opus,audio/aac,audio/flac,audio/pcm,audio/aiff,audio/ogg';

  uploadFile(userId: string, file: File, image: Image) {
    const formData = new FormData();

    formData.append('userId', userId);
    if (file) formData.append('file', file);
    if (image) {
      formData.append('fileName', image.name);
      formData.append('mimeType', image.mimeType);
    }
    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
      Accept: 'application/json',
    });
    return this.http.post(`${fileServerApi}/upload`, formData, { headers }).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  deleteFile(userId: string, fileId: string) {
    return this.http.delete(`${fileServerApi}/user/${userId}/deleteFile/${fileId}`).pipe(
      map((res: any) => {
        if (res.success) return true;
        return false;
      })
    );
  }

  getFile(userId: string, fileId: string): Observable<FileData | null> {
    const files = JSON.parse(localStorage.getItem('files') ?? '{}');
    if (files[fileId]) {
      return new Observable<FileData | null>((subscriber) => {
        subscriber.next(FileData.fromJson(files[fileId]));
        subscriber.complete();
      });
    }
    return this.http.get(`${fileServerApi}/user/${userId}/file/${fileId}`).pipe(
      map((res: any) => {
        if (res.data === undefined) return null;
        const filePart = FileData.fromJson(res.data);
        files[fileId] = filePart.toJson();
        window.localStorage.setItem('files', JSON.stringify(files));
        return filePart;
      })
    );
  }

  listFiles(userId: string): Observable<FileData[]> {
    return this.http.get(`${fileServerApi}/user/${userId}/listFiles`).pipe(
      map((res: any) => {
        if (res.data === undefined) return [];
        const files: { [key: string]: any } = {};
        const result = res.data.map((fileJson: any) => {
          const file = FileData.fromJson(fileJson);
          files[file.id] = file.toJson();
          return file;
        })
        window.localStorage.setItem('files', JSON.stringify(files));
        return result;
      })
    );
  }

  updateFileName(userId: string, id: string, fileName: string) {
    return this.http.patch(`${fileServerApi}/user/${userId}/updateFile/${id}`, { name: fileName }).pipe(
      map((res: any) => {
        return res.success;
      })
    )
  }

  getCapacity(userId: string) {
    return this.http.get(`${fileServerApi}/user/${userId}/getCapacity`).pipe(
      map((res: any) => {
        if (res.data) {
          return Capacity.fromJson(res.data);
        }
      })
    );
  }

}

export { fileServerApi, FileService };

