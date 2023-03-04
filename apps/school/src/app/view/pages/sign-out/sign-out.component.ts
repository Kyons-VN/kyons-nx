import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@data/auth/auth.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { AppPaths } from '@view/routes';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent implements OnInit {
  paths: AppPaths;
  constructor(
    private authService: AuthService,
    private router: Router,
    navService: NavigationService
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  ngOnInit(): void {
    this.signOut();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate([this.paths.signIn.path]);
  }
}
