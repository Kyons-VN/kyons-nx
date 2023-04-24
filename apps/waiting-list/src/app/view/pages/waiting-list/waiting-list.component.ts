import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMAIL_KEY, TOKEN_KEY } from '@data/auth/auth.service';
import { SERVER_API } from '@data/auth/interceptor';
import { environment } from '@environments/environment';
import { RankTextComponent } from '@view/components/rank-ss/rank-ss.component';
import { FacebookModule, FacebookService } from 'ngx-facebook';

@Component({
  standalone: true,
  imports: [CommonModule, FacebookModule, FormsModule, ReactiveFormsModule, RankTextComponent],
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
})
export class WaitingListComponent implements OnInit {
  http = inject(HttpClient);
  FB = inject(FacebookService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  el = inject(ElementRef);
  clipboard = inject(Clipboard);

  showRegisterForm = false;
  showLoginForm = false;
  isLogedIn = false;
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  showPassword = false;
  emailSignIn: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
    Validators.pattern(/^((?!\+).)*$/)
  ]);
  emailSignUp: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
    Validators.pattern(/^((?!\+).)*$/)
  ]);
  password: FormControl = new FormControl('', Validators.required);
  class: FormControl = new FormControl('12', Validators.required);
  emailExistError = false;
  invitorCode = '';
  isLoading = false;
  showRegisterSuccess = false;
  wrongPassword = false;
  showRule = false;
  invitationCode?: string;
  point?: number;
  pointUpRank?: number;
  rank = 0;
  sharedFb?: boolean;
  shareLink?: string;
  isTouched = false;
  imageRank?: string;
  imageRankFull?: string;
  imageRankXs?: string;

  ngOnInit() {
    this.emailSignIn.setValue(window.localStorage.getItem(EMAIL_KEY));
    this.password.setValue(window.localStorage.getItem(TOKEN_KEY));
    if (this.emailSignIn.value && this.password.value) {
      this.logInService(this.emailSignIn.value, this.password.value);
    }
    this.signInForm = this.fb.group({});
    this.signInForm.addControl('email', this.emailSignIn);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.wrongPassword = false;
    })
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.wrongPassword = false;
    })

    this.signUpForm = this.fb.group({});
    this.signUpForm.addControl('email', this.emailSignUp);
    this.signUpForm.addControl('class', this.class);
    this.signUpForm.get('email')?.valueChanges.subscribe(() => {
      this.emailExistError = false;
    })

    this.invitorCode = this.route.snapshot.queryParamMap.get('code') || '';
  }
  toggleRegisterFormFn(enable = true) {
    this.showRegisterForm = enable;
    setTimeout(() => this.updateModalPosition(enable));
  }
  toggleLoginFormFn(enable = true) {
    this.showLoginForm = enable;
    setTimeout(() => this.updateModalPosition(enable));
  }
  toggleRuleFn(enable = true) {
    this.showRule = enable;
    setTimeout(() => this.updateModalPosition(enable));
  }
  toggleRegisterSuccessFn(enable = true) {
    this.showRegisterSuccess = enable;
    setTimeout(() => this.updateModalPosition(enable));
  }
  register() {
    this.isTouched = true;
    // if (!this.signUpForm.touched) this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;
    console.log(this.signUpForm.value);
    this.isLoading = true;
    const params = {
      "email": this.signUpForm.value.email,
      "grade": this.signUpForm.value.class,
      "inviter_code": this.invitorCode,
    };

    this.http.post(SERVER_API + '/waitlist/subscriber', params).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res["success"]) {
          this.signUpForm.reset();
          this.signInForm.markAsUntouched();
          this.showRegisterForm = false;
          this.showRegisterSuccess = true;
          this.isTouched = false;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        if (err.error["error_code"] == "StandardError") {
          this.emailExistError = true;
        }
      }
    });
  }
  share() {
    if (!this.sharedFb) {
      const params = new HttpParams().set('email', this.emailSignIn.value).set('login_code', this.password.value);
      this.http.put(SERVER_API + '/waitlist/subscriber/shared_fb', params).subscribe({});
      this.sharedFb = true;
    }
    this.FB.ui({
      method: 'share',
      href: this.shareLink,
      display: 'popup',
      hashtag: '#kyonswaitlist',
      redirect_uri: this.shareLink,
    });
  }
  logIn() {
    this.isTouched = true;
    // if (!this.signInForm.touched) this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) return;
    this.isLoading = true;
    this.logInService(this.signInForm.value.email, this.signInForm.value.password);
  }
  private logInService(email: string, code: string) {
    const params = new HttpParams().set('email', email).set('login_code', code);
    this.http.get(SERVER_API + '/waitlist/subscriber', { params: params }).subscribe({
      next: (res: any) => {
        console.log(res);
        // res = { "id": 49, "email": "binhhm2009@gmail.com", "rank": 1001, "invitation_code": "WLT-e58bc8eb-a923-4b67-8f50-f01f0be79374", "point": 0, "point_up_rank": 1, "shared_fb": false }
        this.invitationCode = res.invitation_code;
        this.point = res.point;
        this.pointUpRank = res.point_up_rank;
        this.rank = res.rank ?? 0;
        this.sharedFb = res.shared_fb;
        this.isLogedIn = true;
        this.isLoading = false;
        this.shareLink = environment.origin + '/waitlist?code=' + this.invitationCode;
        this.imageRank = 'd';
        if (this.rank == 1) this.imageRank = 'ss';
        else if (this.rank > 1 && this.rank <= 10) this.imageRank = 's';
        else if (this.rank > 10 && this.rank <= 100) this.imageRank = 'a';
        else if (this.rank > 100 && this.rank <= 500) this.imageRank = 'b';
        else if (this.rank > 500 && this.rank <= 1000) this.imageRank = 'c';
        this.imageRankFull = `/assets/up-rank-${this.imageRank}-full.png`;
        this.imageRankXs = `/assets/up-rank-${this.imageRank}-xs.png`;
        this.toggleLoginFormFn(false);
        window.localStorage.setItem(EMAIL_KEY, email);
        window.localStorage.setItem(TOKEN_KEY, code);
      },
      error: (err) => {
        if (!this.showLoginForm) {
          this.toggleLoginFormFn();
          this.signInForm.markAsTouched();
          this.isTouched = true;
        }
        this.wrongPassword = true;
        this.isLoading = false;
      },
    });
  }
  logOut() {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    this.isLogedIn = false;
  }
  private updateModalPosition(enable = true) {
    if (enable) {
      this.isTouched = false;
      this.signInForm.markAsUntouched();
      this.signUpForm.markAsUntouched();
    }
    enable ? document.body.classList.add('modal-open') : document.body.classList.remove('modal-open');
  }
  copy() {
    this.clipboard.copy(this.shareLink ?? '');
  }
}