import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@infrastructure/user/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  userId = this.userService.getUserId();

  @HostBinding('class') class = 'h-full';
  public profileForm: FormGroup = this.fb.group({});
  public passwordForm: FormGroup = this.fb.group({});
  // public myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   selectionTxtFontSize: '1rem',
  // };
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  phone: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  birthDay: FormControl = new FormControl(null, []);
  oldPass: FormControl = new FormControl('', [Validators.required]);
  newPass: FormControl = new FormControl('', [Validators.required]);
  confirmNewPass: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.profileForm.addControl('firstName', this.firstName);
    this.profileForm.addControl('lastName', this.lastName);
    this.profileForm.addControl('birthDay', this.birthDay);
    this.profileForm.addControl('phone', this.phone);
    this.profileForm.addControl('email', this.email);

    this.passwordForm.addControl('oldPass', this.oldPass);
    this.passwordForm.addControl('newPass', this.newPass);
    this.passwordForm.addControl('confirmNewPass', this.confirmNewPass);
    this.userService.getUserInfo(this.userId).subscribe({
      next: user => {
        this.firstName.setValue(user.firstName);
        this.lastName.setValue(user.lastName);
        this.email.setValue(user.email);
        this.phone.setValue(user.phone);
      },
    });
  }

  changeAvatar() {
    //
  }
}
