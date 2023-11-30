import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountStandaloneService } from '@infrastructure/auth/account.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { Subscription, interval } from 'rxjs';

export enum VerifyPage {
  verifySuccess = 'verify-success',
  verifyFail = 'verify-fail',
}

enum ErrorCode {
  none = '',
  expiredCodeException = 'ExpiredCodeException',
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  paths = inject(NavigationService).paths;
  accountService = inject(AccountStandaloneService);
  token = '';
  type = VerifyPage.verifySuccess;
  VerifyPage = VerifyPage;
  email!: string | null;
  errorCode = ErrorCode.none;
  ErrorCode = ErrorCode;
  hasError = false;
  pendingResendEmail = false;
  countdown = 30;
  $interval!: Subscription;
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.type = this.route.snapshot.url[0].path as VerifyPage;
    if (this.type === VerifyPage.verifyFail) {
      this.route.queryParamMap.subscribe(params => {
        this.email = params.get('email');
        this.errorCode = params.get('error_code') as ErrorCode;
      });
    }
  }
  ngOnDestroy(): void {
    if (this.$interval !== undefined) this.$interval.unsubscribe();
  }
  resend() {
    this.pendingResendEmail = true;
    const requestInterval = interval(1000);
    this.$interval = requestInterval.subscribe(() => {
      this.countdown--;
      if (this.countdown == 0) {
        this.pendingResendEmail = false;
      }
    });
    this.accountService.resendVerificationEmail(this.email!).subscribe({
      next: () => {
        this.router.navigate([this.paths.resendVerified.path]);
      },
      error: () => {
        this.hasError = true;
      },
    });
  }
}
