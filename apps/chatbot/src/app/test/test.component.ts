import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgFlutterComponent } from '@view/ng-flutter/ng-flutter.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgFlutterComponent],
  templateUrl: './test.component.html',
})
export class TestComponent {

  onFlutterAppLoaded(state: any) {
    console.log(state);
  }
}
