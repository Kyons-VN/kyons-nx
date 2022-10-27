import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  selector: 'student-asd',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit, AfterViewInit {
  paths: AppPath;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    navService: NavigationService,
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  emailForm: FormGroup = this.fb.group({});
  resetForm: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    notFoundValidator(this),
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
        console.log(params); // { orderby: "price" }
        if (params['email']) {
          this.email.setValue(params['email']);
          this.step = 1;
          if (params['reset_token']) {
            this.code.setValue(params['reset_token']);
            // this.sendCode();
          }
        }
      }
      );
    console.log('init ForgetPasswordComponent');
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

  async sendEmail(): Promise<void> {
    this.emailForm.markAsTouched();
    if (this.emailForm.invalid) return;
    this.processing = true;
    this.emailNotFound = false;
    await this.authService.resetPassword(this.email.value).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 1;
        setTimeout(() => {
          this.codeElm.nativeElement.focus();
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.emailNotFound = true;

      }
    });
    this.processing = false;
  }

  async sendCode(): Promise<void> {
    this.resetForm.markAsTouched();
    if (this.resetForm.invalid) return;
    this.processing = true;
    this.emailNotFound = false;
    await this.authService.newPassword(this.email.value, this.password.value, this.code.value).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 2;
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

      }
    });
    this.processing = false;
  }

  notHaveDigit(str: string) {
    return str.search(/(?=.*[0-9])/);
  }

  notHaveUppercase(str: string) {
    return str.search(/(?=.*[A-Z])/);
  }

  notHaveSpecial(str: string) {
    return str.search(/(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]])/);
  }

  search(str: string, regexStr: string) {
    str.search(regexStr);
  }
}

function notFoundValidator(valueObject: ForgetPasswordComponent): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = valueObject ? valueObject.emailNotFound : null;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

function wrongCodeValidator(valueObject: ForgetPasswordComponent): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = valueObject ? valueObject.wrongCode : null;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
