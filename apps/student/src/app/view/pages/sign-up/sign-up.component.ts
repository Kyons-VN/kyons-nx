import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountStandaloneService } from '@data/auth/account.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
// import { TestType } from '@domain/knowledge/i-test';
import { BeforeunloadDirective } from '@share-directives/before-unload';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '@utils/validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, BeforeunloadDirective],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  paths = inject(NavigationService).paths;
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  authService = inject(AccountStandaloneService);
  loading = inject(LoadingOverlayService);
  notHaveUppercase: (str: string) => boolean;
  notHaveDigit: (str: string) => boolean;
  notHaveSpecial: (str: string) => boolean;
  search: (str: string, regexStr: string) => void;

  constructor() {
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  platformId = inject(PLATFORM_ID);

  signUpForm1: FormGroup = this.fb.group({});
  // firstName: FormControl = new FormControl('', [Validators.required]);
  // lastName: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(/^[a-z0-9+]+@[a-z0-9]+\.[a-z]{2,4}$/),
  ]);
  phone: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]);
  // birthdate: FormControl = new FormControl('');
  // class: FormControl = new FormControl('');
  // school: FormControl = new FormControl('');
  // city: FormControl = new FormControl('TP Hồ Chí Minh');
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/),
  ]);
  step = 0;
  showPassword = false;
  processing = false;
  errorMessage = '';
  ref!: string;
  packageLevel: string = '';
  // refFrom!: TestType | null;
  isShowTOS = false;
  tosChecked = new FormControl<boolean>(false, [Validators.requiredTrue]);
  @ViewChild('tosIframe') public tosIframe!: ElementRef<never>;
  currentUrl = '';
  shouldValidate = false;
  viewPackage = '';
  packageNames: { [key: string]: string } = {
    '0': 'Gói miễn phí',
    '1': 'Gói Starter: 1 Tháng',
    '2': 'Gói Starter: 3 Tháng',
    '3': 'Gói Starter: 12 Tháng',
  }

  @ViewChild('emailElm') emailElm!: ElementRef;

  ngOnInit(): void {
    window.localStorage.removeItem('dev');
    this.ref = this.route.snapshot.queryParams['ref'] ?? '';
    this.packageLevel = this.route.snapshot.queryParams['packageLevel'] ?? '';
    if (this.packageLevel) {
      window.localStorage.setItem('selectedPackageLevel', this.packageLevel);
    }
    // this.refFrom = this.route.snapshot.queryParams['mocktest'] ? TestType.Mock : null;
    // this.signUpForm1.addControl('firstName', this.firstName);
    // this.signUpForm1.addControl('lastName', this.lastName);
    this.signUpForm1.addControl('email', this.email);
    // this.signUpForm1.addControl('phone', this.phone);
    // this.signUpForm1.addControl('birthdate', this.birthdate);
    // this.signUpForm1.addControl('class', this.class);
    // this.signUpForm1.addControl('school', this.school);
    // this.signUpForm1.addControl('city', this.city);
    this.signUpForm1.addControl('password', this.password);
    this.signUpForm1.addControl('tosChecked', this.tosChecked);
    this.signUpForm1.markAsPristine();
    this.signUpForm1.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.signUpForm1.get('email')?.valueChanges.subscribe(email => {
      this.signUpForm1.get('email')?.setValue(email.replace(/ /g, ''), { emitEvent: false });
    });
    if (isPlatformBrowser(this.platformId)) this.currentUrl = window.location.href.replace(window.location.origin, '');
  }

  ngAfterViewInit(): void {
    this.emailElm.nativeElement.focus();
  }

  beforeunload = () => {
    if (this.step != 1) {
      return 'Thử thách chỉ dành cho các bạn chưa có tài khoản.\nBạn sẽ không thể tiếp tục thử thách nếu chuyển trang khác. Nhấn ok để đi đến trang khác. Nhấn Cancel để ở lại trang';
    } else return undefined;
  };

  showTOS() {
    this.isShowTOS = true;
    // setTimeout(() => {

    //   const iframDoc = this.tosIframe.nativeElement.ownerDocument;
    //   // iframDoc.head.appendChild('style.css');
    //   const style = iframDoc.createElement("style");
    //   const rule = 'body{backgound-color:white}';
    //   style.innerHTML = rule;
    //   iframDoc.head.appendChild(style);
    //   // iframDoc.styleSheets[0].insertRule('strong { color: red; }');
    // }, 1000);
  }

  validate() {
    if (!this.shouldValidate) this.shouldValidate = true;
    if (
      !(
        this.signUpForm1.get('email')?.dirty &&
        this.signUpForm1.get('password')?.dirty &&
        // this.signUpForm1.get('firstName')?.dirty &&
        // this.signUpForm1.get('lastname')?.dirty &&
        // this.signUpForm1.get('phone')?.dirty &&
        this.signUpForm1.get('tosChecked')?.dirty
      )
    ) {
      // this.signUpForm1.get('firstName')?.markAsDirty();
      this.signUpForm1.get('password')?.markAsDirty();
      // this.signUpForm1.get('lastName')?.markAsDirty();
      this.signUpForm1.get('email')?.markAsDirty();
      // this.signUpForm1.get('phone')?.markAsDirty();
      this.signUpForm1.get('tosChecked')?.markAsDirty();
    }
    if (this.signUpForm1.untouched) this.signUpForm1.markAllAsTouched();
    if (this.signUpForm1.invalid) return;
    this.step = 0;
  }

  submitForm2() {
    this.validate();
    if (this.signUpForm1.invalid || this.processing) return;
    this.loading.show();
    this.processing = true;
    this.authService
      .signUp({
        email: this.email.value,
        // firstName: this.firstName.value,
        // lastName: this.lastName.value,
        // phone: this.phone.value,
        // birthdate: this.birthdate.value,
        // className: this.class.value,
        // school: this.school.value,
        // city: this.city.value,
        password: this.signUpForm1.get('password')?.value,
        ref: this.ref,
      })
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (res: any) => {
          if (res['success']) {
            this.step = 2;
          } else {
            this.errorMessage = 'Email đã có trong hệ thống';
          }
          this.processing = false;
          this.loading.hide();
        },
        error: err => {
          console.log(err);
          this.errorMessage = 'Có lỗi, xin thử lại';
          if (err.error.error_code == 'InvalidParam') {
            this.step = 0;
            if (err.error.invalid_param == 'email') {
              setTimeout(() => {
                this.email.setErrors({
                  serverReject: true,
                });
                this.email.markAsTouched({ onlySelf: true });
              }, 100);
              this.errorMessage = 'Email chưa đúng hoặc không tồn tại.';
            }
          } else if (err.error.error_code == 'UsernameExistsException') {
            this.step = 0;
            this.errorMessage = 'Email này đã được dùng để tạo tài khoản.';
          }
          this.processing = false;
          this.loading.hide();
        },
      });
  }

  isSharedFromMockTest() {
    return this.signUpForm1.touched;
  }

  select(level: string) {
    this.packageLevel = level;
    if (level == '0') {
      window.localStorage.removeItem('selectedPackageLevel');
    }
    else {
      window.localStorage.setItem('selectedPackageLevel', level);
    }
    this.viewPackage = '';
  }
}
