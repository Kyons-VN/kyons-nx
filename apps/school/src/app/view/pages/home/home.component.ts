import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@data/auth/auth.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { User } from '@domain/user/user';
import { environment } from '@environments/environment';

const UNSAFE_URL = 'https://kyons.cerebry.co/?auth_tok='

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./home.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, private authService: AuthService) { }
  paths = inject(NavigationService).paths;
  router = inject(Router);

  @ViewChild('iframe', { static: false }) iframe!: ElementRef<HTMLIFrameElement>
  @HostBinding('class') class = 'h-full';

  isPromotionEnable: boolean = environment.isPromotionEnable;
  jwt = '';
  user!: User;
  showMenu = false;
  hover = 0;

  ngOnInit() {
    this.jwt = this.authService.getIntegrateToken();
    this.user = this.authService.getUser();
  }

  public ngAfterViewInit() {
    const src = UNSAFE_URL + this.jwt;
    this.renderer.setProperty(this.iframe.nativeElement, 'src', src);
  }
}
