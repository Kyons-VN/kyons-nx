import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';

@Component({
  selector: 'student-right-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './right-menu.component.html',
  styleUrl: './right-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RightMenuComponent {
  paths = inject(NavigationService).paths;
}
