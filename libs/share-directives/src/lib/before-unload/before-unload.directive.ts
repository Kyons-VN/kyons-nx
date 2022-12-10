import { AfterViewInit, Directive, HostListener, Input, OnDestroy } from '@angular/core';

import { BeforeUnloadService } from './before-unload.service';

@Directive({
  standalone: true,
  selector: '[beforeunload]',
})
export class BeforeunloadDirective implements AfterViewInit, OnDestroy {
  @Input('beforeunload') event!: () => void;

  private eventId!: string;

  constructor(
    private service: BeforeUnloadService
  ) { }

  ngAfterViewInit(): void {
    this.eventId = this.service.addLeaveCheck(this.event);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander($event: any) {
    if (this.event() != undefined) {
      return $event.returnValue = true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.service.removeLeaveCheck(this.eventId);
  }
}

