/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/ban-types */
// import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// The global _flutter namespace

declare let _flutter: {
  loader: {
    loadEntrypoint: Function;
  };
};
declare let window: {
  _debug: any;
  addEventListener: Function;
};

@Component({
  selector: 'ng-flutter',
  standalone: true,
  template: `
    <div #flutterTarget>
      <div class="spinner">
        <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styles: [
    `
      :host div {
        width: 100%;
        height: 100%;
        margin-bottom: calc(16px + env(keyboard-inset-height));
      }
      .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
  imports: [MatProgressSpinnerModule],
})
export class NgFlutterComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);

  // The target that will host the Flutter app.
  @ViewChild('flutterTarget') flutterTarget!: ElementRef;

  @Input() src: String = 'main.dart.js';
  @Input() assetBase: String = '';
  @Output() appLoaded: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {
    afterNextRender(() => {
      console.log('NgFlutterComponent constructor');
    });
  }

  ngAfterViewInit(): void {
    const target: HTMLElement = this.flutterTarget.nativeElement;

    this.loadFlutterApp(target);

    target.addEventListener(
      'flutter-initialized',
      (event: Event) => {
        const state = (event as CustomEvent).detail;
        window._debug = state;
        this.appLoaded.emit(state);
      },
      {
        once: true,
      }
    );
  }
  loadFlutterApp(target: HTMLElement) {
    console.log('Loading Flutter app');
    // console.log(_flutter);

    // setTimeout(() => {
    window.addEventListener(
      'hashchange',
      () => {
        console.log('The hash has changed!');
      },
      false
    );
    console.log(_flutter);

    _flutter.loader.loadEntrypoint({
      entrypointUrl: this.src,
      onEntrypointLoaded: async (engineInitializer: any) => {
        const appRunner = await engineInitializer.initializeEngine({
          hostElement: target,
          assetBase: this.assetBase,
        });
        await appRunner.runApp();
      },
    });
    // }, 10000);
  }
}
