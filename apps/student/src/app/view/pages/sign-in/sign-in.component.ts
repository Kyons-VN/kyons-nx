import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountStandaloneService } from '@data/auth/account.service';
import { AuthService } from '@data/auth/auth.service';
import { AuthCredential } from '@data/auth/credential';
import { ChatService } from '@data/chat/chat.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
// import { MessagingService } from '@data/notification/messaging.service';
// import { notificationServiceProvider } from '@data/notification/notification.service';
import { UserService } from '@data/user/user.service';
import { environment } from '@environments';
import { FormControlStatus } from '@utils/form';
import { Subscription, interval, throwError } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  // providers: [notificationServiceProvider],
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
  // messagingService = inject(MessagingService);
  accountService = inject(AccountStandaloneService);
  chatService = inject(ChatService);

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
  userNotConfirmedError = false;
  resendVerificationEmailError = false;
  pendingResendEmail = false;
  countdown = 30;
  $interval!: Subscription;

  @ViewChild('emailElm') emailElm!: ElementRef;
  @ViewChild('passwordElm') passwordElm!: ElementRef;

  ngOnInit(): void {
    window.localStorage.removeItem('dev');
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
    // this.afAuth.onAuthStateChanged(user => {
    //   console.log(user);

    //   if (user != null) {
    //     this.router.navigate(['/']);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.loading.hide();
    if (this.$interval !== undefined) this.$interval.unsubscribe();
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
            // this.location.replaceState('/');
            // const redirectPath = this.navService.getRouteAfterLogin(result.redirect_after_auth);
            // if (result.redirect_after_auth == RedirectAfterLogin[RedirectAfterLogin.HomeAppTutorial]) {
            //   this.userService.setForceCompleteTutorial();
            // }
            this.loading.show();
            // if (environment.production)
            //   this.messagingService.requestPermission().subscribe({
            //     next: value => {
            //       console.log('requestPermission next', value);
            //       this.messagingService.getToken().subscribe({
            //         next: token => {
            //           console.log('getToken next', token);

            //           setTimeout(() => {
            //             this.router.navigate([redirectPath[0]], redirectPath[1]);
            //           }, 600);
            //         },
            //         error: error => {
            //           console.log('getToken error', error);
            //         },
            //       });
            //     },
            //     error: error => {
            //       console.log('requestPermission error', error);
            //     },
            //   });
            // else {

            setTimeout(() => {
              const userId = this.userService.getUserId();
              if (userId === '') {
                throwError(() => new Error('Unauthenticated'));
              }
              this.chatService.checkCreatedUser(userId).subscribe({
                next: () => {
                  if (window.localStorage.getItem('selectedPackageLevel') != undefined) {
                    const packageLevel = window.localStorage.getItem('selectedPackageLevel');
                    this.router.navigate([this.paths.account.path], { queryParams: { "packageLevel": packageLevel } });
                  }
                  else { this.router.navigate([this.paths.home.path]); }
                },
                error: error => {
                  if (error.error == 'Not found') {
                    this.chatService.initDefaultMana(userId)?.subscribe({
                      next: () => {
                        // this.router.navigate([this.paths.home.path]);
                      },
                      error: () => {
                        // this.router.navigate([this.paths.home.path]);
                      },
                    });
                  }
                  if (window.localStorage.getItem('selectedPackageLevel') != undefined) {
                    const packageLevel = window.localStorage.getItem('selectedPackageLevel');
                    this.router.navigate([this.paths.account.path], { queryParams: { "packageLevel": packageLevel } });
                  }
                  else { this.router.navigate([this.paths.home.path]); }
                },
              });
            }, 600);
            // }
          } else {
            this.processing = false;
            this.errorMessage = true;
            this.loading.hide();
            if (result.error_code == 'UserNotConfirmedException') {
              this.userNotConfirmedError = true;
            }
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

  resend() {
    this.pendingResendEmail = true;
    const requestInterval = interval(1000);
    this.$interval = requestInterval.subscribe(() => {
      this.countdown--;
      if (this.countdown == 0) {
        this.pendingResendEmail = false;
      }
    });
    this.accountService.resendVerificationEmail(this.email.value).subscribe({
      next: () => {
        this.router.navigate([this.paths.resendVerified.path]);
      },
      error: () => {
        this.resendVerificationEmailError = true;
      },
    });
  }

  // async loginGoogle() {
  //   // const auth = getAuth();
  //   const user = await this.authService.googleSignIn();

  //   if (user) {
  //     this.router.navigate(['/']);
  //   }
  // }
}
