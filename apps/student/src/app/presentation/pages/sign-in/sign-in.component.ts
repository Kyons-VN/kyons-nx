import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RedirectAfterLogin } from '@domain/navigation/i-redirect';
import { environment } from '@environments/environment';
import { AuthService } from '@infrastructure/auth/auth.service';
import { AuthCredential } from '@infrastructure/auth/credential';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { MessagingService } from '@infrastructure/notification/messaging.service';
import { notificationServiceProvider } from '@infrastructure/notification/notification.service';
import { UserService } from '@infrastructure/user/user.service';
import { FormControlStatus } from '@utils/form';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [notificationServiceProvider],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit, OnDestroy {
  location = inject(Location);
  navService = inject(NavigationService);
  paths = this.navService.paths;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loading = inject(LoadingOverlayService);
  userService = inject(UserService);
  messagingService = inject(MessagingService);

  @HostBinding('class') class = 'h-full';

  signInForm: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);
  errorMessage = false;
  processing = false;
  isDebug = false;
  showPassword = false;
  isEdited = false;

  isPromotionEnable = environment.isPromotionEnable;

  @ViewChild('emailElm') emailElm!: ElementRef;

  ngOnInit(): void {
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
  }

  ngOnDestroy(): void {
    this.loading.hide();
  }

  ngAfterViewInit(): void {
    this.emailElm.nativeElement.focus();
  }

  login() {
    if (this.isDebug) {
      this.email.setValue('binhhm2009+0801@gmail.com');
      this.password.setValue('Sx_-2m5c');
    }
    if (!this.isEdited) this.isEdited = true;
    if (!(this.signInForm.get('email')?.dirty && this.signInForm.get('password')?.dirty)) {
      this.signInForm.get('email')?.markAsDirty();
      this.signInForm.get('password')?.markAsDirty();
      return;
    }
    if (this.signInForm.status === FormControlStatus.VALID) {
      this.processing = true;
      this.authService.signIn(new AuthCredential(this.signInForm.value)).subscribe({
        next: result => {
          if (result.success) {
            this.location.replaceState('/');
            const redirectPath = this.navService.getRouteAfterLogin(result.redirect_after_auth);
            if (result.redirect_after_auth == RedirectAfterLogin[RedirectAfterLogin.HomeAppTutorial]) {
              this.userService.setForceCompleteTutorial();
            }
            this.loading.show();
            if (environment.production)
              this.messagingService.requestPermission().subscribe({
                next: value => {
                  console.log('requestPermission next', value);
                  this.messagingService.getToken().subscribe({
                    next: token => {
                      console.log('getToken next', token);

                      setTimeout(() => {
                        this.router.navigate([redirectPath[0]], redirectPath[1]);
                      }, 600);
                    },
                    error: error => {
                      console.log('getToken error', error);
                    },
                  });
                },
                error: error => {
                  console.log('requestPermission error', error);
                },
              });
            else {
              setTimeout(() => {
                this.router.navigate([redirectPath[0]], redirectPath[1]);
              }, 600);
            }
          } else {
            this.processing = false;
            this.errorMessage = true;
            this.loading.hide();
          }
        },
        error: () => {
          // TODO: Define error resposes
          this.errorMessage = true;
          this.processing = false;
          this.loading.hide();
        },
      });
    }
  }

  debug() {
    if (!environment.production) this.isDebug = true;
  }
}
