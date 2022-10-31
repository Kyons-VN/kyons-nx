import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { delay } from 'lodash-es';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { LoadingOverlayService } from '../../../infrastructure/loading-overlay.service';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '../../../utils/validators';
import { AppPath } from '../../routes';

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
    private authService: AuthService,
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
  showPassword = false;
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
    this.loading.show();
    delay(() => {
      this.loading.hide();
      this.step = 1;
    }, 1000);
  }
}
