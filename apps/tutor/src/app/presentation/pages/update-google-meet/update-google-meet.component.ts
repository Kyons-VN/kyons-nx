import { Component, OnInit } from '@angular/core';
import { UserService } from '@infrastructure/user.service';

@Component({
  templateUrl: './update-google-meet.component.html',
  styleUrls: ['./update-google-meet.component.scss']
})
export class UpdateGoogleMeetComponent implements OnInit {
  constructor(private userService: UserService) { }

  googleMeet = '';


  ngOnInit(): void {
    console.log('UpdateGoogleMeetComponent');
    this.googleMeet = this.userService.getGoogleMeet();
  }

  updateGoogleMeet() {
    this.userService.updateGoogleMeet(this.googleMeet).subscribe({
      next: () => alert('Tạo phòng học thành công.'),
      error: () => alert('Có lỗi, xin thử lại.'),
    });
  }

}
