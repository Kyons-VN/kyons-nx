import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { TrackingComponent } from '@view/share-components/tracking/tracking.component';

@Component({
  standalone: true,
  selector: 'student-layout-default',
  templateUrl: './layout-default.component.html',
  imports: [TopMenuComponent, RouterModule, TrackingComponent],
})
export class LayoutDefaultComponent { }
