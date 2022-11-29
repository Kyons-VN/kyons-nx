import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@infrastructure/auth/auth.service';

@Component({
  selector: 'tutor-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  @HostBinding('class') class = 'h-full';

  ngOnInit(): void {
    this.signOut();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
