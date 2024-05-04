import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '@data/admin/admin-auth.service';
import { NavigationService } from '@data/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.scss',
})
export class AdminSignInComponent {
  authService = inject(AdminAuthService);
  router = inject(Router);
  paths = inject(NavigationService).paths;

  @HostBinding('class') class = 'h-full';

  async loginGoogle() {
    const user = await this.authService.googleSignIn();

    console.log(user);


    if (user) {
      this.router.navigate([this.paths.adminDashboard.path]);
    }
  }
}
