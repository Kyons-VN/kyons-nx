import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountStandaloneService } from '@infrastructure/auth/account.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPath } from '@presentation/routes';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '@utils/validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  paths: AppPath;
  notHaveUppercase: (str: string) => void;
  notHaveDigit: (str: string) => void;
  notHaveSpecial: (str: string) => void;
  search: (str: string, regexStr: string) => void;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AccountStandaloneService,
    navService: NavigationService,
    private loading: LoadingOverlayService) {
    this.paths = navService.paths;
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  @HostBinding('class') class = 'h-full';

  form: FormGroup = this.fb.group({});
  firstName: FormControl = new FormControl('', [
    Validators.required,
  ]);
  lastName: FormControl = new FormControl('', [
    Validators.required,
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)
  ]);
  step = 0;
  showPassword = true;
  processing = false;
  errorMessage = '';

  ngOnInit(): void {
    this.form.addControl('firstName', this.firstName);
    this.form.addControl('lastName', this.lastName);
    this.form.addControl('email', this.email);
    this.form.addControl('password', this.password);
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = '';
    })
  }

  submit() {
    console.log('submit');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.loading.show();
    this.authService.signUp(this.email.value, this.firstName.value, this.lastName.value, this.password.value).subscribe({
      next: (res: any) => {
        if (res['success']) {
          this.step = 1;
        }
        else {
          this.errorMessage = 'Email đã có trong hệ thống';
        }
        this.processing = false;
        this.loading.hide();
      },
      error: (err) => {
        // TODO: Define error resposes
        console.log(err);
        this.errorMessage = 'Có lỗi, xin thử lại';
        this.processing = false;
        this.loading.hide();
      },
    });
  }
}
