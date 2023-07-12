import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverApi } from '@infrastructure/auth/interceptor';
import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = 'device_id';
@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  public trackingThreshold = 10000;
  _deviceId!: string;
  constructor(private http: HttpClient) {
    const deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (deviceId == null) {
      this._deviceId = this.generateDeviceId();
      localStorage.setItem(DEVICE_ID_KEY, this._deviceId);
    }
  }

  init() {
    const deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (deviceId == null) {
      this._deviceId = this.generateDeviceId();
      localStorage.setItem(DEVICE_ID_KEY, this._deviceId);
    }
    this.resetTracking();
  }

  updateTrackOnApp() {
    let total = this.getTracking().total;
    if (total == null) {
      this.resetTrackingOnApp();
    } else {
      total += this.trackingThreshold / 1000;
      this.setTrackingOnApp(total);
      this.http
        .post(`${serverApi()}/students/on_app`, {
          on_total: total,
        })
        .subscribe();
    }
  }

  updateTrackOnLesson(lessonId: string, trackingType: string) {
    const lessonTracking = this.getTrackingLesson(lessonId);
    if (Object.keys(lessonTracking).length === 0 || lessonTracking[trackingType] == null) {
      this.resetTrackingOnLesson(lessonId, trackingType);
    } else {
      lessonTracking[trackingType] = (lessonTracking[trackingType] || 0) + this.trackingThreshold / 1000;
      this.setTrackingOnLesson(lessonId, lessonTracking);
      const updateTracking: any = {
        lesson_id: lessonId,
      };
      updateTracking[trackingType] = lessonTracking[trackingType];

      this.http.post(`${serverApi()}/students/on_lesson`, updateTracking).subscribe();
    }
  }

  private setTrackingOnApp(total: number) {
    const tracking = this.getTracking();
    tracking.total = total;
    localStorage.setItem('tracking', JSON.stringify(tracking));
  }

  private getTracking() {
    return JSON.parse(localStorage.getItem('tracking') || '{}');
  }

  private getTrackingLesson(lessonId: string) {
    return this.getTracking()[`lesson_${lessonId}`] || {};
  }

  private setTrackingOnLesson(lessonId: string, trackingLesson: any) {
    const tracking = this.getTracking();
    tracking[`lesson_${lessonId}`] = trackingLesson;
    localStorage.setItem('tracking', JSON.stringify(tracking));
  }

  getDeviceId() {
    return this._deviceId;
  }

  private generateDeviceId() {
    return uuidv4();
  }

  resetTrackingOnApp() {
    const tracking = this.getTracking();
    tracking.total = this.trackingThreshold / 1000;
    localStorage.setItem('tracking', JSON.stringify(tracking));
    this.http
      .post(`${serverApi()}/students/on_app`, {
        on_total: tracking.toJson,
        start: true,
      })
      .subscribe();
  }

  resetTrackingOnLesson(lessonId: string, trackingType: string) {
    const tracking = this.getTracking();
    const updateTracking: { [key: string]: number } = tracking[`lesson_${lessonId}`] ?? {};
    updateTracking[trackingType] = this.trackingThreshold / 1000;
    tracking[`lesson_${lessonId}`] = updateTracking;
    localStorage.setItem('tracking', JSON.stringify(tracking));
    const params: any = {
      lesson_id: lessonId,
      start: true,
    };
    params[trackingType] = updateTracking[trackingType];
    this.http.post(`${serverApi()}/students/on_lesson`, params).subscribe();
  }

  resetTracking() {
    localStorage.removeItem('tracking');
  }
}
