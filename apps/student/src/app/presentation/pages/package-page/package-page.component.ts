import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss'],
})
export class PackagePageComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  constructor(navService: NavigationService,) {
    this.paths = navService.paths;
  }

  ngOnInit(): void {
    console.log("init PackagePageComponent");

  }
}
