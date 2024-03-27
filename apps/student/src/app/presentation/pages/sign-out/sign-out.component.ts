import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@infrastructure/auth/auth.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';

@Component({
  standalone: true,
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  paths: AppPaths;
  constructor(private authService: AuthService, private router: Router, navService: NavigationService) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  ngOnInit(): void {
    this.signOut();
  }

  signOut() {
    window.localStorage.removeItem('dev');
    this.authService.signOut();
    this.router.navigate([this.paths.signIn.path]);
  }
}
