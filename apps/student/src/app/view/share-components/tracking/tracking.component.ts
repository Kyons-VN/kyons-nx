import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TrackingService } from '@data/tracking/tracking.service';

@Component({
  standalone: true,
  selector: 'student-tracking',
  template: `<ng-container></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingComponent implements OnInit, OnDestroy {
  _isMouseActive = false;
  _mouseInactiveTimeout: any;
  _trackingInterval: any;

  constructor(private service: TrackingService) { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    if (window.localStorage.getItem('dev') === 'true') return;
    const isLocalhost = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1/';
    if (isLocalhost) return;
    if (!this._isMouseActive) {
      // this.service.resetTrackingOnApp();
      this._isMouseActive = true;
      clearInterval(this._trackingInterval);
      this._trackingInterval = setInterval(() => {
        if (this._isMouseActive) this.service.updateTrackOnApp();
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
    const isLocalhost = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1/';
    if (isLocalhost) return;
    this._isMouseActive = false;
    this._trackingInterval = setInterval(() => {
      if (this._isMouseActive) this.service.updateTrackOnApp();
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
