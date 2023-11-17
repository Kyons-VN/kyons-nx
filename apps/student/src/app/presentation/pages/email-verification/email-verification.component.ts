import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';

export enum VerifyPage {
  verifySuccess = 'verify-success',
  nonexistentAccount = 'nonexistent-account',
  expiredLink = 'expired-link',
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent implements OnInit {
  route = inject(ActivatedRoute);
  paths = inject(NavigationService).paths;
  token = '';
  type = VerifyPage.verifySuccess;
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.type = this.route.snapshot.url[0].path as VerifyPage;
  }
}
