import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    BeforeunloadDirective],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  paths: AppPaths;
  notHaveUppercase: (str: string) => void;
  notHaveDigit: (str: string) => void;
  notHaveSpecial: (str: string) => void;
  search: (str: string, regexStr: string) => void;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AccountStandaloneService,
    navService: NavigationService,
    private loading: LoadingOverlayService) {
    this.paths = navService.paths;
    this.notHaveUppercase = notHaveUppercase;
    this.notHaveDigit = notHaveDigit;
    this.notHaveSpecial = notHaveSpecial;
    this.search = search;
  }

  @HostBinding('class') class = 'h-full';

  form: FormGroup = this.fb.group({});
  firstName: FormControl = new FormControl('', [
    Validators.required,
  ]);
  lastName: FormControl = new FormControl('', [
    Validators.required,
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)
  ]);
  step = 0;
  showPassword = true;
  processing = false;
  errorMessage = '';
  ref!: string;
  refFrom!: TestType | null;
  isShowTOS = false;
  tosChecked = new FormControl<boolean>(false, [
    Validators.requiredTrue
  ]);
  @ViewChild('tosIframe') public tosIframe!: ElementRef<any>;
  currentUrl = '';

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander($event: any) {
  //   if (this.refFrom == TestType.Mock) {
  //     return $event.returnValue = true;
  //   }
  //   else {
  //     return;
  //   }
  // }

  beforeunload = () => {
    console.log('d??');

    if (this.refFrom == TestType.Mock && this.step != 1) {
      return 'Th??? th??ch ch??? d??nh cho c??c b???n ch??a c?? t??i kho???n.\nB???n s??? kh??ng th??? ti???p t???c th??? th??ch n???u chuy???n trang kh??c. Nh???n ok ????? ??i ?????n trang kh??c. Nh???n Cancel ????? ??? l???i trang';
    }
    else return undefined;
  }

  ngOnInit(): void {
    this.ref = this.route.snapshot.queryParams['ref'] ?? '';
    this.refFrom = this.route.snapshot.queryParams['mocktest'] ? TestType.Mock : null;
    this.form.addControl('firstName', this.firstName);
    this.form.addControl('lastName', this.lastName);
    this.form.addControl('email', this.email);
    this.form.addControl('password', this.password);
    this.form.addControl('tosChecked', this.tosChecked);
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.currentUrl = window.location.href.replace(window.location.origin, '');
  }

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

  submit() {
    console.log('submit');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.loading.show();
    this.processing = true;
    this.authService.signUp(this.email.value, this.firstName.value, this.lastName.value, this.password.value, this.tosChecked.value ?? false, this.ref).subscribe({
      next: (res: any) => {
        if (res['success']) {
          this.step = 1;
        }
        else {
          this.errorMessage = 'Email ???? c?? trong h??? th???ng';
        }
        this.processing = false;
        this.loading.hide();
      },
      error: (err) => {
        // TODO: Define error resposes
        console.log(err);
        this.errorMessage = 'C?? l???i, xin th??? l???i';
        this.processing = false;
        this.loading.hide();
      },
    });
  }

  isSharedFromMockTest() {
    return this.refFrom === TestType.Mock;
  }
}
