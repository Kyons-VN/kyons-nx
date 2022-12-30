import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
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
import { environment } from '@environments/environment';
import { FormControlStatus } from '@utils/form';
import { AppPaths } from '@view/routes';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  paths: AppPaths;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    navService: NavigationService,
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
          next: (result: any) => {
            if (result.success) {

              setTimeout(() => {
                // this.router.navigate([redirectPath]);
              }, 600);
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