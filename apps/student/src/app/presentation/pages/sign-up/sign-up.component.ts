import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestType } from '@domain/knowledge/i-test';
import { AccountStandaloneService } from '@infrastructure/auth/account.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import { BeforeunloadDirective } from '@share-directives/before-unload';
import { notHaveDigit, notHaveSpecial, notHaveUppercase, search } from '@utils/validators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, BeforeunloadDirective],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {
  paths: AppPaths;
  notHaveUppercase: (str: string) => void;
  notHaveDigit: (str: string) => void;
  notHaveSpecial: (str: string) => void;
  search: (str: string, regexStr: string) => void;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AccountStandaloneService,
    navService: NavigationService,
    private loading: LoadingOverlayService
  ) {
    this.paths = navService.paths;
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  signUpForm1: FormGroup = this.fb.group({});
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  phone: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]);
  birthdate: FormControl = new FormControl('');
  class: FormControl = new FormControl('');
  school: FormControl = new FormControl('');
  city: FormControl = new FormControl('TP Hồ Chí Minh');
  step = 0;
  showPassword = true;
  processing = false;
  errorMessage = '';
  ref!: string;
  refFrom!: TestType | null;
  isShowTOS = false;
  tosChecked = new FormControl<boolean>(false, [Validators.requiredTrue]);
  @ViewChild('tosIframe') public tosIframe!: ElementRef<never>;
  currentUrl = '';
  shouldValidate = false;

  @ViewChild('lastNameElm') lastNameElm!: ElementRef;

  ngOnInit(): void {
    this.ref = this.route.snapshot.queryParams['ref'] ?? '';
    this.refFrom = this.route.snapshot.queryParams['mocktest'] ? TestType.Mock : null;
    this.signUpForm1.addControl('firstName', this.firstName);
    this.signUpForm1.addControl('lastName', this.lastName);
    this.signUpForm1.addControl('email', this.email);
    this.signUpForm1.addControl('phone', this.phone);
    this.signUpForm1.addControl('birthdate', this.birthdate);
    this.signUpForm1.addControl('class', this.class);
    this.signUpForm1.addControl('school', this.school);
    this.signUpForm1.addControl('city', this.city);
    this.signUpForm1.addControl('tosChecked', this.tosChecked);
    this.signUpForm1.markAsPristine();
    this.signUpForm1.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.currentUrl = window.location.href.replace(window.location.origin, '');
  }

  ngAfterViewInit(): void {
    this.lastNameElm.nativeElement.focus();
  }

  beforeunload = () => {
    if (this.refFrom == TestType.Mock && this.step != 1) {
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

  submitForm1() {
    if (!this.shouldValidate) this.shouldValidate = true;
    if (
      !(
        this.signUpForm1.get('email')?.dirty &&
        this.signUpForm1.get('firstname')?.dirty &&
        this.signUpForm1.get('firstName')?.dirty &&
        this.signUpForm1.get('lastname')?.dirty &&
        this.signUpForm1.get('phone')?.dirty &&
        this.signUpForm1.get('tosChecked')?.dirty
      )
    ) {
      this.signUpForm1.get('firstName')?.markAsDirty();
      this.signUpForm1.get('lastName')?.markAsDirty();
      this.signUpForm1.get('email')?.markAsDirty();
      this.signUpForm1.get('phone')?.markAsDirty();
      this.signUpForm1.get('tosChecked')?.markAsDirty();
    }
    if (this.signUpForm1.untouched) this.signUpForm1.markAllAsTouched();
    if (this.signUpForm1.invalid) return;
    this.step = 1;
  }

  submitForm2() {
    this.loading.show();
    this.processing = true;
    this.authService
      .signUp({
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phone: this.phone.value,
        birthdate: this.birthdate.value,
        className: this.class.value,
        school: this.school.value,
        city: this.city.value,
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
          // TODO: Define error resposes
          console.log(err);
          this.errorMessage = 'Có lỗi, xin thử lại';
          this.processing = false;
          this.loading.hide();
        },
      });
  }

  isSharedFromMockTest() {
    return this.refFrom === TestType.Mock;
  }
}
