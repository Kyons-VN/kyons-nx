import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { SERVER_API } from './auth/interceptor';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  _deviceId!: string;
  constructor(private http: HttpClient) {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId == null) {
      this._deviceId = this.generateDeviceId();
      localStorage.setItem('deviceId', this._deviceId);
    }
  }

  init() {
    this._deviceId = this.generateDeviceId();
    localStorage.setItem('deviceId', this._deviceId);
  }

  updateTrackOnApp() {
    const lastTime = this.getTracking().lastTime;
    const total =
      this.getTracking().total +
      Math.round((new Date().getTime() - lastTime) / 1000);
    this.setTrackingOnApp(total);
    this.http
      .post(SERVER_API + '/students/on_app', {
        on_total: total,
      })
      .subscribe();
  }

  clearTrackOnApp() {
    const tracking = this.getTracking();
    delete tracking.total;
    localStorage.setItem('tracking', JSON.stringify(tracking));
  }

  updateTrackOnLesson(lessonId: string, trackingType: string) {
    const trackingLesson = this.getTrackingLesson(lessonId);
    trackingLesson[trackingType] =
      (trackingLesson[trackingType] || 0) +
      Math.round((new Date().getTime() - trackingLesson.lastTime) / 1000);
    this.setTrackingOnLesson(lessonId, trackingLesson);
    const updateTracking: any = {
      lesson_id: lessonId,
    };
    updateTracking[trackingType] = trackingLesson[trackingType];

    this.http
      .post(SERVER_API + '/students/on_lesson', updateTracking)
      .subscribe();
  }

  private setTrackingOnApp(total: number) {
    const tracking = this.getTracking();
    tracking.lastTime = new Date().getTime();
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
    trackingLesson.lastTime = new Date().getTime();
    tracking[`lesson_${lessonId}`] = trackingLesson;
    localStorage.setItem('tracking', JSON.stringify(tracking));
  }

  getDeviceId() {
    return this._deviceId;
  }

  generateDeviceId() {
    return UUID.UUID();
  }

  resetTrackingOnApp() {
    const tracking = this.getTracking();
    tracking.total = 0;
    tracking.lastTime = new Date().getTime();
    localStorage.setItem('tracking', JSON.stringify(tracking));
    this.http
      .post(SERVER_API + '/students/on_app', {
        start: true,
      })
      .subscribe();
  }

  resetTrackingOnLesson(lessonId: string, trackingType: string) {
    const tracking = this.getTracking();
    delete tracking[`lesson_${lessonId}`];
    const updateTracking: any = {};
    updateTracking.lastTime = new Date().getTime();
    tracking[`lesson_${lessonId}`] = updateTracking;
    localStorage.setItem('tracking', JSON.stringify(tracking));
    const params: any = {
      lesson_id: lessonId,
      start: true,
    };
    params[trackingType] = 0;
    this.http.post(SERVER_API + '/students/on_lesson', params).subscribe();
  }

  removeTracking() {
    localStorage.removeItem('tracking');
  }
}
