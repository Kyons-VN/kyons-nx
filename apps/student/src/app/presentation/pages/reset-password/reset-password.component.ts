import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountStandaloneService } from '@infrastructure/auth/account.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '@utils/validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  paths: AppPaths;
  notHaveUppercase: (str: string) => void;
  notHaveDigit: (str: string) => void;
  notHaveSpecial: (str: string) => void;
  search: (str: string, regexStr: string) => void;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountStandaloneService,
    navService: NavigationService,
    private loading: LoadingOverlayService
  ) {
    this.paths = navService.paths;
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  @HostBinding('class') class = 'h-full';

  emailForm: FormGroup = this.fb.group({});
  resetForm: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  code: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]{6,6}$/g),

  ]);
  step = 0;
  emailNotFound = false;
  // [!@#\$%\^&\*\(\)\~\=_\+\}\{\"\:;\'\?\{\}\/>\.\<,\`\-\|\[\]]
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)
  ]);
  errorMessage = '';
  processing = false;
  isDebug = false;
  wrongCode = false;
  showPassword = false;
  @ViewChild("emailElm") emailElm!: ElementRef;
  @ViewChild("codeElm") codeElm!: ElementRef;
  @ViewChild("passwordElm") passwordElm!: ElementRef;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params['email']) {
          this.email.setValue(params['email']);
          this.step = 1;
          if (params['reset_token']) {
            this.code.setValue(params['reset_token']);
          }
        }
      }
      );
    this.emailForm.addControl('email', this.email);
    this.emailForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.emailNotFound = false;
    })
    this.emailForm.get('code')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.wrongCode = false;
    })
    this.resetForm.addControl('code', this.code);
    this.resetForm.addControl('password', this.password);
  }

  ngAfterViewInit(): void {
    if (this.step == 0) this.emailElm.nativeElement.focus();
    else if (this.step == 1) {
      if (this.email.value == '') {
        setTimeout(() => {
          this.codeElm.nativeElement.focus();
        }, 1000);
      }
      else {
        setTimeout(() => {
          this.passwordElm.nativeElement.focus();
        }, 1000);
      }
    }
  }

  sendEmail() {
    this.emailForm.markAsTouched();
    if (this.emailForm.invalid) return;
    this.loading.show();
    this.processing = true;
    this.emailNotFound = false;
    this.accountService.requestResetPassword(this.email.value).subscribe({
      next: () => {
        this.step = 1;
        this.processing = false;
        this.loading.hide();
        setTimeout(() => {
          this.codeElm.nativeElement.focus();
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.emailNotFound = true;

        this.processing = false;
        this.loading.hide();
      },
    });
  }

  sendCode() {
    this.resetForm.markAsTouched();
    if (this.resetForm.invalid) return;
    this.loading.show();
    this.processing = true;
    this.emailNotFound = false;
    this.accountService.newPassword(this.email.value, this.password.value, this.code.value).subscribe({
      next: () => {
        this.step = 2;
        this.processing = false;
        this.loading.hide();
      },
      error: (err) => {
        // {
        //   message: "Invalid verification code provided, please try again.",
        //   error_code: "CodeMismatchException",
        //   errors: [
        //   ],
        // }
        console.log(err);
        if (err.error.error_code == "CodeMismatchException") {
          this.wrongCode = true;
        }
        else if (err.error.error_code == "ExpiredCodeException") {
          this.errorMessage = 'Mã code đã hết hiệu lực, xin thử lại';
        }
        else {
          this.errorMessage = err.error.message;
        }


        this.processing = false;
        this.loading.hide();
      },
    });
  }
}
