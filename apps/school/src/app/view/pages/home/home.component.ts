import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { NavigationService } from '@data/navigation/navigation.service';
import { environment } from '@environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paths = inject(NavigationService).paths;

  @HostBinding('class') class = 'h-full';

  isPromotionEnable: boolean = environment.isPromotionEnable;

  ngOnInit() {
    console.log(this.paths);
  }
}
