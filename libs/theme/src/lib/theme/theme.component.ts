import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent {}
