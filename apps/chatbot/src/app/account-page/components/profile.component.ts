import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserService } from '@data/user/user.service';
import { User } from '@domain/user/user';

@Component({
  selector: 'chatbot-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  userId = this.userService.getUserId();
  activeTab = 0;
  user!: User;

  @HostBinding('class') class = 'h-full';
  public profileForm: FormGroup = this.fb.group({});
  public extraForm: FormGroup = this.fb.group({});
  // public myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd/mm/yyyy',
  //   selectionTxtFontSize: '1rem',
  // };
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  phone: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  birthDay: FormControl = new FormControl(null, []);
  school: FormControl = new FormControl('', []);
  grade: FormControl = new FormControl('', [Validators.required]);
  city: FormControl = new FormControl('', []);
  birthdate: FormControl = new FormControl('', []);

  ngOnInit(): void {
    this.profileForm.addControl('firstName', this.firstName);
    this.profileForm.addControl('lastName', this.lastName);
    this.profileForm.addControl('birthDay', this.birthDay);
    this.profileForm.addControl('phone', this.phone);
    this.profileForm.addControl('email', this.email);

    this.extraForm.addControl('school', this.school);
    this.extraForm.addControl('grade', this.grade);
    this.extraForm.addControl('city', this.city);
    this.extraForm.addControl('birthdate', this.city);
    this.userService.getUserInfo(this.userId).subscribe({
      next: user => {
        this.firstName.setValue(user.firstName);
        this.lastName.setValue(user.lastName);
        this.email.setValue(user.email);
        this.phone.setValue(user.phone);
        // this.school.setValue(user.school);
        // this.grade.setValue(user.grade);
        // this.city.setValue(user.city);
        // // Format dd/mm/YYYY
        // if (user.birthdate != null) this.birthdate.setValue(user.displayBirthdate());
        this.user = user;
      },
    });
  }

  changeAvatar() {
    //
  }
}
