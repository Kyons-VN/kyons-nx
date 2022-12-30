import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';
import { environment } from '@environments/environment';
import { AppPaths } from '@view/routes';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paths: AppPaths;
  constructor(
    navService: NavigationService,
    private router: Router
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  isPromotionEnable: boolean = environment.isPromotionEnable;

  ngOnInit() {
    console.log('init Home');
  }
}
