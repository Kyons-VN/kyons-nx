import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '@data/auth/auth.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { environment } from '@environments/environment';

const UNSAFE_URL = 'https://app.cerebry.co/?auth_tok='

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, private auth: AuthService) { }
  paths = inject(NavigationService).paths;

  @ViewChild('iframe', { static: false }) iframe!: ElementRef<HTMLIFrameElement>
  @HostBinding('class') class = 'h-full';

  isPromotionEnable: boolean = environment.isPromotionEnable;
  jwt = '';

  ngOnInit() {
    console.log(this.paths);
    this.jwt = this.auth.getIntegrateToken();
  }

  public ngAfterViewInit() {
    const src = UNSAFE_URL + this.jwt;
    this.renderer.setProperty(this.iframe.nativeElement, 'src', src);
  }
}
