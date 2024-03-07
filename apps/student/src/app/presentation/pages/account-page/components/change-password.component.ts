import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@infrastructure/user/user.service';

@Component({
  selector: 'student-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);

  @HostBinding('class') class = 'h-full';
  public passwordForm: FormGroup = this.fb.group({});
  oldPass: FormControl = new FormControl('', [Validators.required]);
  newPass: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/),
  ]);
  confirmNewPass: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.passwordForm.addControl('oldPassword', this.oldPass);
    this.passwordForm.addControl('newPassword', this.newPass);
    // this.passwordForm.addControl('confirmNewPass', this.confirmNewPass);
  }
}
