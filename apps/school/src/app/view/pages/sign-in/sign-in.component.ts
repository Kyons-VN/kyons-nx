import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@data/auth/auth.service';
import { AuthCredential } from '@data/auth/credential';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { User } from '@domain/user/user';
import { environment } from '@environments/environment';
import { FormControlStatus } from '@utils/form';
import player from 'lottie-web/build/player/lottie_light';

export function playerFactory() {
  return player;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  paths = inject(NavigationService).paths;
  authService = inject(AuthService);
  loading = inject(LoadingOverlayService);
  fb = inject(FormBuilder);
  router = inject(Router);

  @HostBinding('class') class = 'h-full';

  signInForm!: FormGroup;
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
    this.signInForm = this.fb.group({});
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    })
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    })
  }

  login() {
    if (this.isDebug) {
      this.email.setValue('binhhm2009+1205ai@gmail.com');
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
          next: (user: User) => {
            if (user) {
              setTimeout(() => {
                this.router.navigate([this.paths.home.path]);
                this.processing = false;
                this.loading.hide();
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
