import { Component, HostBinding, OnInit } from '@angular/core';
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
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  paths: AppPath;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navService: NavigationService
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  signInform: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', Validators.required);
  errorMessage = false;
  processing = false;
  isDebug = false;

  isPromotionEnable = environment.isPromotionEnable;

  ngOnInit(): void {
    this.signInform.addControl('email', this.email);
    this.signInform.addControl('password', this.password);
  }

  login() {
    if (this.isDebug) {
      this.email.setValue('binh+0929ss@te.st');
      this.password.setValue('Zaq1@wsx');
    }
    if (this.signInform.untouched) {
      this.signInform.markAllAsTouched();
      return;
    }
    if (this.signInform.status === FormControlStatus.VALID) {
      this.processing = true;
      this.authService
        .signIn(new AuthCredential(this.signInform.value))
        .subscribe({
          next: (result: any) => {
            if (result.success) {
              console.log('redirect_after_auth', result.redirect_after_auth);
              const redirectPath = this.navService.getRouteAfterLogin(
                result.redirect_after_auth
              );
              console.log('redirectPath', redirectPath);

              setTimeout(() => {
                this.router.navigate([redirectPath]);
              }, 500);
            } else this.errorMessage = true;
          },
          complete: () => {
            setTimeout(() => {
              this.processing = false;
            }, 500);
          },
        });
    }
  }

  debug() {
    if (!environment.production) this.isDebug = true;
  }
}
