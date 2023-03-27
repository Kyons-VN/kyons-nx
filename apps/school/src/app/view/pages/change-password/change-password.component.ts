import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@data/auth/auth.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '@utils/validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  paths = inject(NavigationService).paths;
  authService = inject(AuthService);
  loading = inject(LoadingOverlayService);
  fb = inject(FormBuilder);
  router = inject(Router);

  notHaveUppercase: (str: string) => void;
  notHaveDigit: (str: string) => void;
  notHaveSpecial: (str: string) => void;
  search: (str: string, regexStr: string) => void;

  constructor() {
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  @HostBinding('class') class = 'h-full';

  changePasswordForm!: FormGroup;
  oldPassword: FormControl = new FormControl('', [
    Validators.required,
  ]);
  newPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)
  ]);
  confirmPassword: FormControl = new FormControl('', [
    Validators.required,
    (control: FormControl) => {
      const newPassword = this.newPassword.value;
      if (newPassword !== control.value) {
        return { notMatch: true };
      }
      return null;
    }
  ]);
  errorMessage = false;
  processing = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({});
    this.changePasswordForm.addControl('oldPassword', this.oldPassword);
    this.changePasswordForm.addControl('newPassword', this.newPassword);
    this.changePasswordForm.addControl('confirmPassword', this.confirmPassword);
    this.changePasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
  }

  submit(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) return;
  }
}
