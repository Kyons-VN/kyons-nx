import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  constructor(private fb: FormBuilder) { }

  public profileForm: FormGroup = this.fb.group({});
  public passwordForm: FormGroup = this.fb.group({});
  // public myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   selectionTxtFontSize: '1rem',
  // };
  name: FormControl = new FormControl('Nguyễn Văn A', [Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  birthDay: FormControl = new FormControl(null, []);
  oldPass: FormControl = new FormControl('', [Validators.required]);
  newPass: FormControl = new FormControl('', [Validators.required]);
  confirmNewPass: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.profileForm.addControl('name', this.name);
    this.profileForm.addControl('birthDay', this.birthDay);
    this.profileForm.addControl('email', this.email);

    this.passwordForm.addControl('oldPass', this.oldPass);
    this.passwordForm.addControl('newPass', this.newPass);
    this.passwordForm.addControl('confirmNewPass', this.confirmNewPass);
  }

  changeAvatar() {
    //
  }
}
