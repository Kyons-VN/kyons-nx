import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  paths: AppPath;
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
    this.router.navigate([this.paths.signIn]);
  }
}
