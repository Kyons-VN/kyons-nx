import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TrackingService } from '../../../infrastructure/tracking.service';

const trackingThreshold = 10000; // miliseconds
@Component({
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
  onMouseMove(e: MouseEvent) {
    if (!this._isMouseActive) {
      this.service.resetTrackingOnLesson(this.lessonId, this.trackingType);
      this._isMouseActive = true;
      clearInterval(this._trackingInterval);
      this._trackingInterval = setInterval(() => {
        if (this._isMouseActive)
          this.service.updateTrackOnLesson(this.lessonId, this.trackingType);
      }, trackingThreshold);
    }
    clearTimeout(this._mouseInactiveTimeout);
    this._mouseInactiveTimeout = setTimeout(() => {
      clearInterval(this._trackingInterval);
      this._isMouseActive = false;
    }, trackingThreshold);
  }

  ngOnInit(): void {
    this._isMouseActive = false;
    this._trackingInterval = setInterval(() => {
      if (this._isMouseActive)
        this.service.updateTrackOnLesson(this.lessonId, this.trackingType);
    }, trackingThreshold);
    this._mouseInactiveTimeout = setTimeout(() => {
      clearInterval(this._trackingInterval);
      this._isMouseActive = false;
    }, trackingThreshold);
  }

  ngOnDestroy(): void {
    clearInterval(this._trackingInterval);
    clearTimeout(this._mouseInactiveTimeout);
  }
}
