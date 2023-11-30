"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_sign-in_sign-in_component_ts"],{

/***/ 12910:
/*!****************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/auth/credential.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthCredential: () => (/* binding */ AuthCredential)
/* harmony export */ });
class AuthCredential {
  constructor({
    email,
    password
  }) {
    this.email = email;
    this.password = password;
  }
  toJson() {
    return {
      username: this.email,
      password: this.password
    };
  }
}

/***/ }),

/***/ 22277:
/*!*******************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/notification/messaging.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessagingService: () => (/* binding */ MessagingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_fire_compat_messaging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/compat/messaging */ 93986);



class MessagingService {
  constructor(messaging) {
    this.messaging = messaging;
    // Get the current FCM token
  }

  requestPermission() {
    return this.messaging.requestPermission;
  }
  getToken() {
    return this.messaging.getToken;
  }
  static #_ = this.ɵfac = function MessagingService_Factory(t) {
    return new (t || MessagingService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_fire_compat_messaging__WEBPACK_IMPORTED_MODULE_1__.AngularFireMessaging));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: MessagingService,
    factory: MessagingService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 41905:
/*!******************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/sign-in/sign-in.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignInComponent: () => (/* binding */ SignInComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _domain_navigation_i_redirect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @domain/navigation/i-redirect */ 48112);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @environments/environment */ 12092);
/* harmony import */ var _infrastructure_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @infrastructure/auth/auth.service */ 34440);
/* harmony import */ var _infrastructure_auth_credential__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @infrastructure/auth/credential */ 12910);
/* harmony import */ var _infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @infrastructure/loading-overlay.service */ 59288);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);
/* harmony import */ var _infrastructure_notification_messaging_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @infrastructure/notification/messaging.service */ 22277);
/* harmony import */ var _infrastructure_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @infrastructure/notification/notification.service */ 82732);
/* harmony import */ var _infrastructure_user_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @infrastructure/user/user.service */ 40747);
/* harmony import */ var _utils_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @utils/form */ 75572);


















const _c0 = ["emailElm"];
function SignInComponent_div_17_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Vui l\u00F2ng nh\u1EADp theo \u0111\u1ECBnh d\u1EA1ng abc@email.com.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function SignInComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, SignInComponent_div_17_div_1_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.email.errors == null ? null : ctx_r1.email.errors["email"]);
  }
}
function SignInComponent_i_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "i", 27);
  }
}
function SignInComponent_i_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "i", 28);
  }
}
function SignInComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Th\u00F4ng tin ch\u01B0a ch\u00EDnh x\u00E1c");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
class SignInComponent {
  constructor() {
    this.location = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_11__.Location);
    this.navService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_5__.NavigationService);
    this.paths = this.navService.paths;
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder);
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_infrastructure_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router);
    this.loading = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_4__.LoadingOverlayService);
    this.userService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_infrastructure_user_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService);
    this.messagingService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.inject)(_infrastructure_notification_messaging_service__WEBPACK_IMPORTED_MODULE_6__.MessagingService);
    this.class = 'h-full';
    this.signInForm = this.fb.group({});
    this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.email]);
    this.password = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required);
    this.errorMessage = false;
    this.processing = false;
    this.isDebug = false;
    this.showPassword = false;
    this.isEdited = false;
    this.isPromotionEnable = _environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.isPromotionEnable;
  }
  ngOnInit() {
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
  }
  ngOnDestroy() {
    this.loading.hide();
  }
  ngAfterViewInit() {
    this.emailElm.nativeElement.focus();
  }
  login() {
    if (this.isDebug) {
      this.email.setValue('binhhm2009+0801@gmail.com');
      this.password.setValue('Sx_-2m5c');
    }
    if (!this.isEdited) this.isEdited = true;
    if (!(this.signInForm.get('email')?.dirty && this.signInForm.get('password')?.dirty)) {
      this.signInForm.get('email')?.markAsDirty();
      this.signInForm.get('password')?.markAsDirty();
      return;
    }
    if (this.signInForm.status === _utils_form__WEBPACK_IMPORTED_MODULE_9__.FormControlStatus.VALID) {
      this.processing = true;
      this.authService.signIn(new _infrastructure_auth_credential__WEBPACK_IMPORTED_MODULE_3__.AuthCredential(this.signInForm.value)).subscribe({
        next: result => {
          if (result.success) {
            this.location.replaceState('/');
            const redirectPath = this.navService.getRouteAfterLogin(result.redirect_after_auth);
            if (result.redirect_after_auth == _domain_navigation_i_redirect__WEBPACK_IMPORTED_MODULE_0__.RedirectAfterLogin[_domain_navigation_i_redirect__WEBPACK_IMPORTED_MODULE_0__.RedirectAfterLogin.HomeAppTutorial]) {
              this.userService.setForceCompleteTutorial();
            }
            this.loading.show();
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) this.messagingService.requestPermission().subscribe({
              next: value => {
                console.log('requestPermission next', value);
                this.messagingService.getToken().subscribe({
                  next: token => {
                    console.log('getToken next', token);
                    setTimeout(() => {
                      this.router.navigate([redirectPath[0]], redirectPath[1]);
                    }, 600);
                  },
                  error: error => {
                    console.log('getToken error', error);
                  }
                });
              },
              error: error => {
                console.log('requestPermission error', error);
              }
            });else {
              setTimeout(() => {
                this.router.navigate([redirectPath[0]], redirectPath[1]);
              }, 600);
            }
          } else {
            this.processing = false;
            this.errorMessage = true;
            this.loading.hide();
          }
        },
        error: () => {
          // TODO: Define error resposes
          this.errorMessage = true;
          this.processing = false;
          this.loading.hide();
        }
      });
    }
  }
  debug() {
    if (!_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) this.isDebug = true;
  }
  static #_ = this.ɵfac = function SignInComponent_Factory(t) {
    return new (t || SignInComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: SignInComponent,
    selectors: [["ng-component"]],
    viewQuery: function SignInComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.emailElm = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function SignInComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"](ctx.class);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵProvidersFeature"]([_infrastructure_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__.notificationServiceProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵStandaloneFeature"]],
    decls: 40,
    vars: 10,
    consts: [[1, "flex-col", "md:flex", "md:flex-row", "h-full", "md:overflow-hidden"], [1, "col", "md:hidden", "hero-bg", "py-8", "px-6", "gap-2", 2, "height", "calc(100vw * 204 / 375)"], ["src", "/assets/images/logo-horizontal-light.webp", "alt", "", 1, "self-start", "h-[32px]"], [1, "h7", "text-white", "w-full", "text-center"], [1, "background-image", "flex", "w-full", "h-full", "md:items-center", "justify-center"], [1, "flex", "flex-col", "w-full", "md:w-[434px]", "min-h-[338px]", "p-6", "mb-24", "gap-6", "overflow-auto", "flex-shrink-0"], ["src", "/assets/images/logo-h.svg", "alt", "Logo", 1, "h-12", "self-start", "hidden", "md:block", 3, "dblclick"], [1, "col", "gap-6", "w-full", 3, "formGroup"], [1, "col", "gap-2"], [1, "col", "w-full"], ["type", "text", "placeholder", "Nh\u1EADp email", "formControlName", "email"], ["emailElm", ""], [4, "ngIf"], [1, "relative", "w-full"], ["placeholder", "Nh\u1EADp m\u1EADt kh\u1EA9u", "formControlName", "password", 1, "w-full", 3, "type"], ["passwordElm", ""], [1, "absolute", "right-0", "top-0", "w-11", "h-full", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["class", "icon-VisibilityOff", "tabindex", "0", 4, "ngIf"], ["class", "icon-Visibility", "tabindex", "0", 4, "ngIf"], ["class", "error", 4, "ngIf"], [1, "btn", 3, "disabled", "click"], [1, "col", "items-start", "gap-2"], [1, "text-orange", 3, "routerLink"], [1, "hero-img", "hidden", "md:flex", "justify-center", "flex-shrink-0", "overflow-hidden", "relative"], ["src", "/assets/images/hero-image.webp", "alt", "", 1, "w-full", "h-full", "object-cover", "absolute", "top-0"], [1, "text-white", "text-[36px]", "font-semibold", "text-center", "relative"], [1, "error"], ["tabindex", "0", 1, "icon-VisibilityOff"], ["tabindex", "0", 1, "icon-Visibility"]],
    template: function SignInComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Tri th\u1EE9c kh\u1EDFi \u0111\u1EA7u t\u1EEB");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "\u201CT\u1EA1i sao\u201D?");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "div", 4)(8, "div", 5)(9, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dblclick", function SignInComponent_Template_img_dblclick_9_listener() {
          return ctx.debug();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "form", 7)(11, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12, "M\u1EEBng b\u1EA1n quay tr\u1EDF l\u1EA1i!");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "div", 8)(14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, SignInComponent_div_17_Template, 2, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "input", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SignInComponent_Template_div_click_21_listener() {
          return ctx.showPassword = !ctx.showPassword;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, SignInComponent_i_22_Template, 1, 0, "i", 17)(23, SignInComponent_i_23_Template, 1, 0, "i", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](24, SignInComponent_div_24_Template, 2, 0, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SignInComponent_Template_button_click_25_listener() {
          return ctx.login();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 21)(28, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](29, "Qu\u00EAn m\u1EADt kh\u1EA9u");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31, "B\u1EA1n ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n? \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](33, "\u0110\u0103ng k\u00FD t\u1EA1i \u0111\u00E2y");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](35, "img", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](36, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](37, "Tri th\u1EE9c kh\u1EDFi \u0111\u1EA7u");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](38, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](39, "t\u1EEB \u201CT\u1EA1i sao\u201D?");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx.signInForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.email.invalid && ctx.isEdited);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("type", ctx.showPassword ? "text" : "password");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.showPassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.showPassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.processing);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx.processing ? "\u0110ang x\u1EED l\u00FD" : "\u0110\u0103ng nh\u1EADp", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("routerLink", ctx.paths.resetPassword.path);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("routerLink", ctx.paths.signUp.path);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLink],
    styles: [".error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n.hero-img[_ngcontent-%COMP%] {\n  border-radius: 16px 0px 0px 16px;\n  width: 88.5vh;\n  padding-top: 20vh;\n}\n\n.hero-bg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  background-image: url(\"/assets/images/hero-image-xs.webp\");\n  background-position: bottom right;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.background-image[_ngcontent-%COMP%] {\n  background-image: url(\"/assets/images/sign-in-top-right-bg.webp\"), url(\"/assets/images/sign-in-bottom-left-bg.webp\");\n  background-position: top right 23px, bottom left;\n  background-repeat: no-repeat;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvc3R1ZGVudC9zcmMvYXBwL3ByZXNlbnRhdGlvbi9wYWdlcy9zaWduLWluL3NpZ24taW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxtQkFBQTtFQUFBLG9CQUFBO0VBQUEsb0JBQUE7RUFBQTtBQUFBOztBQUVGO0VBQ0UsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7QUFFRjs7QUFBQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsMERBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7QUFHRjs7QUFBQTtFQUNFLG9IQUFBO0VBQ0EsZ0RBQUE7RUFDQSw0QkFBQTtBQUdGIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yIHtcclxuICBAYXBwbHkgdGV4dC1yZWQtMCB0ZXh0LXNtO1xyXG59XHJcbi5oZXJvLWltZyB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweCAwcHggMHB4IDE2cHg7XHJcbiAgd2lkdGg6IGNhbGMoMTAwdmggKiA3MDggLyA4MDApO1xyXG4gIHBhZGRpbmctdG9wOiAyMHZoO1xyXG59XHJcbi5oZXJvLWJnIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDIwMHB4O1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvaGVyby1pbWFnZS14cy53ZWJwJyk7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tIHJpZ2h0O1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAvLyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcbi5iYWNrZ3JvdW5kLWltYWdlIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL3NpZ24taW4tdG9wLXJpZ2h0LWJnLndlYnAnKSwgdXJsKCcvYXNzZXRzL2ltYWdlcy9zaWduLWluLWJvdHRvbS1sZWZ0LWJnLndlYnAnKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiB0b3AgcmlnaHQgMjNweCwgYm90dG9tIGxlZnQ7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 75572:
/*!********************************************!*\
  !*** ./apps/student/src/app/utils/form.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormControlStatus: () => (/* binding */ FormControlStatus)
/* harmony export */ });
var FormControlStatus;
(function (FormControlStatus) {
  FormControlStatus["VALID"] = "VALID";
  FormControlStatus["INVALID"] = "INVALID";
  FormControlStatus["PENDING"] = "PENDING";
  FormControlStatus["DISABLED"] = "DISABLED";
})(FormControlStatus || (FormControlStatus = {}));

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_sign-in_sign-in_component_ts.7bb2eeaa80d34bb0.js.map