import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopMenuComponent } from '@presentation/share-components/top-menu/top-menu.component';
import { TrackingComponent } from '@presentation/share-components/tracking/tracking.component';

@Component({
  standalone: true,
  selector: 'student-layout-default',
  templateUrl: './layout-full.component.html',
  imports: [TopMenuComponent, RouterModule, TrackingComponent],
})
export class LayoutFullComponent {}
