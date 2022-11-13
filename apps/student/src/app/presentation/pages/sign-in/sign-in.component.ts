import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormControlStatus } from '../../../helper/form';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { AuthCredential } from '../../../infrastructure/auth/credential';
import { LoadingOverlayService } from '../../../infrastructure/loading-overlay.service';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  paths: AppPath;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navService: NavigationService,
    private loading: LoadingOverlayService,

  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  signInForm: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', Validators.required);
  errorMessage = false;
  processing = false;
  isDebug = false;
  showPassword = false;

  isPromotionEnable = environment.isPromotionEnable;

  @ViewChild("emailElm") emailElm!: ElementRef;

  ngOnInit(): void {
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    })
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    })
  }

  ngAfterViewInit(): void {
    this.emailElm.nativeElement.focus();
  }

  login() {
    if (this.isDebug) {
      this.email.setValue('1111ss@te.st');
      this.password.setValue('Zaq1@wsx');
    }
    if (this.signInForm.untouched) {
      this.signInForm.markAllAsTouched();
      return;
    }
    if (this.signInForm.status === FormControlStatus.VALID) {
      this.loading.show();
      this.processing = true;
      this.authService
        .signIn(new AuthCredential(this.signInForm.value))
        .subscribe({
          next: (result: any) => {
            if (result.success) {
              console.log('redirect_after_auth', result.redirect_after_auth);
              const redirectPath = this.navService.getRouteAfterLogin(
                result.redirect_after_auth
              );
              console.log('redirectPath', redirectPath);

              setTimeout(() => {
                this.processing = false;
                this.loading.hide();
                this.router.navigate([redirectPath]);
              }, 600);
            } else {
              this.processing = false;
              this.errorMessage = true;
              this.loading.hide();
            }
          },
          error: () => {
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
