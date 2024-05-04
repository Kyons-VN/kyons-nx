import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '@data/admin/admin-auth.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { AppPaths } from '@view/routes';

@Component({
  standalone: true,
  templateUrl: './sign-out.component.html',
})
export class AdminSignOutComponent implements OnInit {
  paths: AppPaths;
  constructor(private authService: AdminAuthService, private router: Router, navService: NavigationService) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  ngOnInit(): void {
    this.signOut();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate([this.paths.adminSignIn.path]);
  }
}
