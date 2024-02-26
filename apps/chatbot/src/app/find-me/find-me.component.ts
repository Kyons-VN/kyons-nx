/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgFlutterComponent } from '../../view/ng-flutter/ng-flutter.component';

@Component({
  selector: 'chatbot-find-me',
  standalone: true,
  imports: [CommonModule, NgFlutterComponent],
  templateUrl: 'find-me.component.html',
  styleUrl: 'find-me.component.scss',
})
export class ChatbotFindMeComponent {
  changeDetectorRef = inject(ChangeDetectorRef);
  flutterState?: any;

  onFlutterAppLoaded(state: any) {
    this.flutterState = state;
    this.flutterState.onClicksChanged(() => {
      this.onCounterChanged();
    });
    this.flutterState.onTextChanged(() => {
      this.onTextChanged();
    });

    // Set the initial values of the Flutter app from enum DemoScreen in dart file
    this.flutterState.setScreen('counter');
  }

  onCounterSet(event: Event) {
    const clicks = parseInt((event.target as HTMLInputElement).value, 10) || 0;

    this.flutterState.setClicks(clicks);
  }

  onTextSet(event: Event) {
    this.flutterState.setText((event.target as HTMLInputElement).value || '');
  }

  // I need to force a change detection here. When clicking on the "Decrement"
  // button, everything works fine, but clicking on Flutter doesn't trigger a
  // repaint (even though this method is called)
  onCounterChanged() {
    this.changeDetectorRef.detectChanges();
  }

  onTextChanged() {
    this.changeDetectorRef.detectChanges();
  }
}
