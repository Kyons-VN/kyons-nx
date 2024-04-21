import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackingService } from '@data/tracking/tracking.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'student-tracking-lesson',
  template: `<ng-container></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingLessonComponent implements OnInit, OnDestroy {
  _isMouseActive = false;
  _mouseInactiveTimeout: any;
  _trackingInterval: any;

  constructor(private service: TrackingService) { }

  @Input() lessonId!: string;
  @Input() trackingType!: string;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    if (window.localStorage.getItem('dev') === 'true') return;
    if (!this._isMouseActive) {
      // this.service.resetTrackingOnLesson(this.lessonId, this.trackingType);
      this._isMouseActive = true;
      clearInterval(this._trackingInterval);
      this._trackingInterval = setInterval(() => {
        if (this._isMouseActive) this.service.updateTrackOnLesson(this.lessonId, this.trackingType);
      }, this.service.trackingThreshold);
    }
    clearTimeout(this._mouseInactiveTimeout);
    this._mouseInactiveTimeout = setTimeout(() => {
      clearInterval(this._trackingInterval);
      this._isMouseActive = false;
    }, this.service.trackingThreshold);
  }

  ngOnInit(): void {
    if (window.localStorage.getItem('dev') === 'true') return;
    this._isMouseActive = false;
    this._trackingInterval = setInterval(() => {
      if (this._isMouseActive) this.service.updateTrackOnLesson(this.lessonId, this.trackingType);
    }, this.service.trackingThreshold);
    this._mouseInactiveTimeout = setTimeout(() => {
      clearInterval(this._trackingInterval);
      this._isMouseActive = false;
    }, this.service.trackingThreshold);
  }

  ngOnDestroy(): void {
    if (window.localStorage.getItem('dev') === 'true') return;
    clearInterval(this._trackingInterval);
    clearTimeout(this._mouseInactiveTimeout);
  }
}
