import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './infrastructure/auth/auth.service';

@Component({
  selector: 'tutor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  @HostBinding('class') class = 'block w-full h-full';

  title = 'tutor-angular';
  isAuthenticated = true;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getToken() != null;
    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd)
        this.isAuthenticated = this.authService.getToken() != null;
    });
  }
}
