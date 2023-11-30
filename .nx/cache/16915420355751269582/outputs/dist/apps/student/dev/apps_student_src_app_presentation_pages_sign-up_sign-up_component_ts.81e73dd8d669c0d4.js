"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_sign-up_sign-up_component_ts"],{

/***/ 37548:
/*!*********************************************************!*\
  !*** ./apps/student/src/app/domain/knowledge/i-test.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestType: () => (/* binding */ TestType)
/* harmony export */ });
var TestType;
(function (TestType) {
  TestType[TestType["Mock"] = 0] = "Mock";
  TestType[TestType["Lesson"] = 1] = "Lesson";
  TestType[TestType["Exercise"] = 2] = "Exercise";
})(TestType || (TestType = {}));


/***/ }),

/***/ 28593:
/*!******************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/sign-up/sign-up.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpComponent: () => (/* binding */ SignUpComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _domain_knowledge_i_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @domain/knowledge/i-test */ 37548);
/* harmony import */ var _infrastructure_auth_account_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @infrastructure/auth/account.service */ 23486);
/* harmony import */ var _infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @infrastructure/loading-overlay.service */ 59288);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);
/* harmony import */ var _share_directives_before_unload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @share-directives/before-unload */ 75198);
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/validators */ 44901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);

















const _c0 = ["tosIframe"];
const _c1 = ["emailElm"];
function SignUpComponent_div_0_form_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 37);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("beforeunload", ctx_r4.beforeunload);
  }
}
function SignUpComponent_div_0_form_10_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " H\u00E3y \u0111i\u1EC1n email \u0111\u00FAng \u0111\u1ECBnh d\u1EA1ng. V\u00ED d\u1EE5 nh\u01B0 l\u00E0: example@gmail.com ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SignUpComponent_div_0_form_10_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SignUpComponent_div_0_form_10_div_9_div_1_Template, 2, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r6.email.errors == null ? null : ctx_r6.email.errors["pattern"]);
  }
}
function SignUpComponent_div_0_form_10_i_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 39);
  }
}
function SignUpComponent_div_0_form_10_i_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 40);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 46);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 47);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 46);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 47);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 46);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 47);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 46);
  }
}
function SignUpComponent_div_0_form_10_div_16_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "i", 47);
  }
}
const _c2 = (a0, a1) => ({
  "text-red-0": a0,
  "text-darkEmerald": a1
});
function SignUpComponent_div_0_form_10_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " M\u1EADt kh\u1EA9u ph\u1EA3i c\u00F3:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ul", 42)(4, "li", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, SignUpComponent_div_0_form_10_div_16_i_5_Template, 1, 0, "i", 44)(6, SignUpComponent_div_0_form_10_div_16_i_6_Template, 1, 0, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, " \u00A0T\u1EEB 8 k\u00FD t\u1EF1 tr\u1EDF l\u00EAn ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "li", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, SignUpComponent_div_0_form_10_div_16_i_9_Template, 1, 0, "i", 44)(10, SignUpComponent_div_0_form_10_div_16_i_10_Template, 1, 0, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " \u00A0K\u00FD t\u1EF1 vi\u1EBFt hoa (A-Z) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "li", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, SignUpComponent_div_0_form_10_div_16_i_13_Template, 1, 0, "i", 44)(14, SignUpComponent_div_0_form_10_div_16_i_14_Template, 1, 0, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, " \u00A0K\u00FD t\u1EF1 s\u1ED1 (0-9) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "li", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, SignUpComponent_div_0_form_10_div_16_i_17_Template, 1, 0, "i", 44)(18, SignUpComponent_div_0_form_10_div_16_i_18_Template, 1, 0, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, " \u00A0K\u00FD t\u1EF1 \u0111\u1EB7c bi\u1EC7t (~! @#$%^&*_-+=`|\\(){}[]:;\"'<>,.?/) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](12, _c2, (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.password.value.length < 8, (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.password.value.length >= 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.password.value.length < 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.password.value.length >= 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](15, _c2, (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveUppercase(ctx_r10.password.value), (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveUppercase(ctx_r10.password.value)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveUppercase(ctx_r10.password.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveUppercase(ctx_r10.password.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](18, _c2, (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveDigit(ctx_r10.password.value), (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveDigit(ctx_r10.password.value)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveDigit(ctx_r10.password.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveDigit(ctx_r10.password.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](21, _c2, (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveSpecial(ctx_r10.password.value), (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveSpecial(ctx_r10.password.value)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && ctx_r10.notHaveSpecial(ctx_r10.password.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r10.password.dirty || ctx_r10.password.touched) && !ctx_r10.notHaveSpecial(ctx_r10.password.value));
  }
}
function SignUpComponent_div_0_form_10_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r12.errorMessage);
  }
}
const _c3 = a0 => ({
  "no-validate": a0
});
const _c4 = a0 => ({
  error: a0
});
function SignUpComponent_div_0_form_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "form", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SignUpComponent_div_0_form_10_div_1_Template, 1, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 17)(3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u0110\u0103ng k\u00FD t\u00E0i kho\u1EA3n Kyons");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 18)(6, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "input", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, SignUpComponent_div_0_form_10_div_9_Template, 2, 1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SignUpComponent_div_0_form_10_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r22.showPassword = !ctx_r22.showPassword);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, SignUpComponent_div_0_form_10_i_14_Template, 1, 0, "i", 27)(15, SignUpComponent_div_0_form_10_i_15_Template, 1, 0, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, SignUpComponent_div_0_form_10_div_16_Template, 20, 24, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "input", 31, 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, " T\u00F4i \u0111\u1ED3ng \u00FD v\u1EDBi \u0111i\u1EC1u ki\u1EC7n v\u00E0 \u0111i\u1EC1u kho\u1EA3n s\u1EED d\u1EE5ng c\u1EE7a Kyons. Xem \u0111i\u1EC1u ki\u1EC7n v\u00E0 \u0111i\u1EC1u kho\u1EA3n s\u1EED d\u1EE5ng t\u1EA1i ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "a", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "\u0111\u00E2y");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, SignUpComponent_div_0_form_10_div_24_Template, 2, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SignUpComponent_div_0_form_10_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r24.submitForm2());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "Ti\u1EBFp t\u1EE5c");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx_r2.signUpForm1)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](12, _c3, !ctx_r2.shouldValidate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.isSharedFromMockTest());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.email.invalid && ctx_r2.shouldValidate);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("type", ctx_r2.showPassword ? "text" : "password");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.showPassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.showPassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.password.touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](14, _c4, ctx_r2.tosChecked.invalid && ctx_r2.shouldValidate));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", ctx_r2.paths.termsOfService.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.errorMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r2.processing);
  }
}
function SignUpComponent_div_0_form_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 37);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("beforeunload", ctx_r25.beforeunload);
  }
}
function SignUpComponent_div_0_form_11_div_158_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r26.errorMessage);
  }
}
function SignUpComponent_div_0_form_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "form", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SignUpComponent_div_0_form_11_div_1_Template, 1, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 17)(3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Tr\u01B0\u1EDBc khi b\u1EAFt \u0111\u1EA7u h\u00E0nh tr\u00ECnh...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Kyons c\u1EA7n m\u1ED9t v\u00E0i th\u00F4ng tin c\u01A1 b\u1EA3n \u0111\u1EC3 hi\u1EC3u b\u1EA1n h\u01A1n nh\u00E9!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "L\u01B0u \u00FD: B\u1EA1n c\u00F3 th\u1EC3 thay \u0111\u1ED5i th\u00F4ng tin n\u00E0y sau.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 18)(10, "div", 49)(11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "Ng\u00E0y sinh c\u1EE7a b\u1EA1n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 49)(15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "Kh\u1ED1i l\u1EDBp c\u1EE7a b\u1EA1n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "select", 51)(18, "option", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "L\u1EDBp 10");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "option", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "L\u1EDBp 11");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "option", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "L\u1EDBp 12");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 49)(25, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "B\u1EA1n \u0111ang h\u1ECDc tr\u01B0\u1EDDng n\u00E0o?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 49)(29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30, "Th\u00E0nh ph\u1ED1 n\u01A1i b\u1EA1n sinh s\u1ED1ng?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "select", 56)(32, "option", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "TP H\u1ED3 Ch\u00ED Minh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "H\u00E0 N\u1ED9i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "option", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, "An Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39, "B\u00E0 R\u1ECBa-V\u0169ng T\u00E0u");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](41, "B\u1EA1c Li\u00EAu");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](42, "option", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](43, "B\u1EAFc Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "option", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](45, "B\u1EAFc K\u1EA1n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](47, "B\u1EAFc Ninh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](48, "option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](49, "B\u1EBFn Tre");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](50, "option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](51, "B\u00ECnh D\u01B0\u01A1ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "option", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](53, "B\u00ECnh \u0110\u1ECBnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](54, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](55, "B\u00ECnh Ph\u01B0\u1EDBc");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](56, "option", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](57, "B\u00ECnh Thu\u1EADn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](58, "option", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](59, "C\u00E0 Mau");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](60, "option", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](61, "Cao B\u1EB1ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](62, "option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](63, "C\u1EA7n Th\u01A1");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](64, "option", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](65, "\u0110\u00E0 N\u1EB5ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](66, "option", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](67, "\u0110\u1EAFk L\u1EAFk");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](68, "option", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](69, "\u0110\u1EAFk N\u00F4ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](70, "option", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](71, "\u0110i\u1EC7n Bi\u00EAn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](72, "option", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](73, "\u0110\u1ED3ng Nai");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](74, "option", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](75, "\u0110\u1ED3ng Th\u00E1p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](76, "option", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](77, "Gia Lai");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](78, "option", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](79, "H\u00E0 Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](80, "option", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](81, "H\u00E0 Nam");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](82, "option", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](83, "H\u00E0 T\u0129nh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](84, "option", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](85, "H\u1EA3i D\u01B0\u01A1ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](86, "option", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](87, "H\u1EA3i Ph\u00F2ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](88, "option", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](89, "H\u1EADu Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](90, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](91, "H\u00F2a B\u00ECnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](92, "option", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](93, "H\u01B0ng Y\u00EAn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](94, "option", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](95, "Kh\u00E1nh H\u00F2a");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](96, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](97, "Ki\u00EAn Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](98, "option", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](99, "Kon Tum");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](100, "option", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](101, "Lai Ch\u00E2u");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](102, "option", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](103, "L\u1EA1ng S\u01A1n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](104, "option", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](105, "L\u00E0o Cai");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](106, "option", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](107, "L\u00E2m \u0110\u1ED3ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](108, "option", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](109, "Long An");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](110, "option", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](111, "Nam \u0110\u1ECBnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](112, "option", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](113, "Ngh\u1EC7 An");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](114, "option", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](115, "Ninh B\u00ECnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](116, "option", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](117, "Ninh Thu\u1EADn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](118, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](119, "Ph\u00FA Th\u1ECD");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](120, "option", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](121, "Ph\u00FA Y\u00EAn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](122, "option", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](123, "Qu\u1EA3ng B\u00ECnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](124, "option", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](125, "Qu\u1EA3ng Nam");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](126, "option", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](127, "Qu\u1EA3ng Ng\u00E3i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](128, "option", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](129, "Qu\u1EA3ng Ninh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](130, "option", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](131, "Qu\u1EA3ng Tr\u1ECB");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](132, "option", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](133, "S\u00F3c Tr\u0103ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](134, "option", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](135, "S\u01A1n La");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](136, "option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](137, "T\u00E2y Ninh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](138, "option", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](139, "Th\u00E1i B\u00ECnh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](140, "option", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](141, "Th\u00E1i Nguy\u00EAn");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](142, "option", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](143, "Thanh H\u00F3a");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](144, "option", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](145, "Th\u1EEBa Thi\u00EAn Hu\u1EBF");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](146, "option", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](147, "Ti\u1EC1n Giang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](148, "option", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](149, "Tr\u00E0 Vinh");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](150, "option", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](151, "Tuy\u00EAn Quang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](152, "option", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](153, "V\u0129nh Long");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](154, "option", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](155, "V\u0129nh Ph\u00FAc");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](156, "option", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](157, "Y\u00EAn B\u00E1i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](158, SignUpComponent_div_0_form_11_div_158_Template, 2, 1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](159, "div", 120)(160, "button", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SignUpComponent_div_0_form_11_Template_button_click_160_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r27.step = 0);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](161, "i", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](162, " Quay l\u1EA1i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](163, "button", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SignUpComponent_div_0_form_11_Template_button_click_163_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r29.submitForm2());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](164);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx_r3.signUpForm1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.isSharedFromMockTest());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](157);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.errorMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r3.processing);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r3.processing ? "\u0110ang x\u1EED l\u00FD" : "T\u1EA1o t\u00E0i kho\u1EA3n", " ");
  }
}
function SignUpComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 2)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Tri th\u1EE9c kh\u1EDFi \u0111\u1EA7u t\u1EEB");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "\u201CT\u1EA1i sao\u201D?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 6)(8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, SignUpComponent_div_0_form_10_Template, 27, 16, "form", 9)(11, SignUpComponent_div_0_form_11_Template, 165, 5, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "\u0110\u00E3 c\u00F3 t\u00E0i kho\u1EA3n? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "\u0110\u0103ng nh\u1EADp");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](17, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Tri th\u1EE9c kh\u1EDFi \u0111\u1EA7u");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](20, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "t\u1EEB \u201CT\u1EA1i sao\u201D?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.step === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.step === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", ctx_r0.paths.signIn.path);
  }
}
function SignUpComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 124)(1, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 127)(4, "h4", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "C\u1EA3m \u01A1n b\u1EA1n \u0111\u00E3 t\u1EA1o t\u00E0i kho\u1EA3n c\u00F9ng Kyons!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 129)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Tr\u01B0\u1EDBc khi s\u1EED d\u1EE5ng Kyons, b\u1EA1n h\u00E3y ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "strong", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "x\u00E1c th\u1EF1c t\u00E0i kho\u1EA3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " b\u1EB1ng c\u00E1ch nh\u1EA5n v\u00E0o \u0111\u01B0\u1EDDng link \u0111\u00E3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " c\u1EE7a b\u1EA1n nh\u00E9!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "N\u1EBFu kh\u00F4ng t\u00ECm th\u1EA5y email, b\u1EA1n ki\u1EC3m tra th\u1EED m\u1EE5c Spam v\u00E0 qu\u1EA3ng c\u00E1o xem sao \uD83E\uDD14?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Qua 10 ph\u00FAt v\u1EABn kh\u00F4ng th\u1EA5y email n\u00E0o? Li\u00EAn h\u1EC7 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "a", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "Kyons fanpage");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, " \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 k\u1ECBp th\u1EDDi!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "a", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "\u0110\u0103ng nh\u1EADp ngay th\u00F4i");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.email.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", ctx_r1.paths.signIn.path);
  }
}
class SignUpComponent {
  constructor(route, fb, authService, navService, loading) {
    this.route = route;
    this.fb = fb;
    this.authService = authService;
    this.loading = loading;
    this.signUpForm1 = this.fb.group({});
    // firstName: FormControl = new FormControl('', [Validators.required]);
    // lastName: FormControl = new FormControl('', [Validators.required]);
    this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(/^[a-z0-9+]+@[a-z0-9]+\.[a-z]{2,4}$/)]);
    this.phone = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(/^[0-9]{10,11}$/)]);
    this.birthdate = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
    this.class = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
    this.school = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('');
    this.city = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('TP Hồ Chí Minh');
    this.password = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)]);
    this.step = 0;
    this.showPassword = true;
    this.processing = false;
    this.errorMessage = '';
    this.isShowTOS = false;
    this.tosChecked = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(false, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.requiredTrue]);
    this.currentUrl = '';
    this.shouldValidate = false;
    this.beforeunload = () => {
      if (this.refFrom == _domain_knowledge_i_test__WEBPACK_IMPORTED_MODULE_0__.TestType.Mock && this.step != 1) {
        return 'Thử thách chỉ dành cho các bạn chưa có tài khoản.\nBạn sẽ không thể tiếp tục thử thách nếu chuyển trang khác. Nhấn ok để đi đến trang khác. Nhấn Cancel để ở lại trang';
      } else return undefined;
    };
    this.paths = navService.paths;
    this.notHaveUppercase = _utils_validators__WEBPACK_IMPORTED_MODULE_5__.notHaveUppercase;
    this.notHaveDigit = _utils_validators__WEBPACK_IMPORTED_MODULE_5__.notHaveDigit;
    this.notHaveSpecial = _utils_validators__WEBPACK_IMPORTED_MODULE_5__.notHaveSpecial;
    this.search = _utils_validators__WEBPACK_IMPORTED_MODULE_5__.search;
  }
  ngOnInit() {
    this.ref = this.route.snapshot.queryParams['ref'] ?? '';
    this.refFrom = this.route.snapshot.queryParams['mocktest'] ? _domain_knowledge_i_test__WEBPACK_IMPORTED_MODULE_0__.TestType.Mock : null;
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
      this.signUpForm1.get('email')?.setValue(email.replace(/[^a-z0-9@.+]/g, ''), {
        emitEvent: false
      });
    });
    this.currentUrl = window.location.href.replace(window.location.origin, '');
  }
  ngAfterViewInit() {
    this.emailElm.nativeElement.focus();
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

  validate() {
    if (!this.shouldValidate) this.shouldValidate = true;
    if (!(this.signUpForm1.get('email')?.dirty && this.signUpForm1.get('password')?.dirty && this.signUpForm1.get('firstName')?.dirty && this.signUpForm1.get('lastname')?.dirty && this.signUpForm1.get('phone')?.dirty && this.signUpForm1.get('tosChecked')?.dirty)) {
      this.signUpForm1.get('firstName')?.markAsDirty();
      this.signUpForm1.get('password')?.markAsDirty();
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
    this.validate();
    if (this.step == 0) return;
    this.loading.show();
    this.processing = true;
    this.authService.signUp({
      email: this.email.value,
      // firstName: this.firstName.value,
      // lastName: this.lastName.value,
      // phone: this.phone.value,
      // birthdate: this.birthdate.value,
      // className: this.class.value,
      // school: this.school.value,
      // city: this.city.value,
      password: this.signUpForm1.get('password')?.value,
      ref: this.ref
    }).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: res => {
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
                serverReject: true
              });
              this.email.markAsTouched({
                onlySelf: true
              });
            }, 100);
            this.errorMessage = 'Email không thể có dấu + hoặc dấu .';
          }
        } else if (err.error.error_code == 'UsernameExistsException') {
          this.step = 0;
          this.errorMessage = 'Email này đã được dùng để tạo tài khoản.';
        }
        this.processing = false;
        this.loading.hide();
      }
    });
  }
  isSharedFromMockTest() {
    return this.refFrom === _domain_knowledge_i_test__WEBPACK_IMPORTED_MODULE_0__.TestType.Mock;
  }
  static #_ = this.ɵfac = function SignUpComponent_Factory(t) {
    return new (t || SignUpComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_infrastructure_auth_account_service__WEBPACK_IMPORTED_MODULE_1__.AccountStandaloneService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_3__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_2__.LoadingOverlayService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: SignUpComponent,
    selectors: [["ng-component"]],
    viewQuery: function SignUpComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.tosIframe = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.emailElm = _t.first);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 2,
    consts: [["class", "flex-col md:flex md:flex-row h-full md:overflow-hidden", 4, "ngIf"], ["class", "bg-blueGrey-100 absolute top-0 left-0 w-screen h-screen flex items-center justify-center p-6", 4, "ngIf"], [1, "flex-col", "md:flex", "md:flex-row", "h-full", "md:overflow-hidden"], [1, "col", "md:hidden", "hero-bg", "py-8", "px-6", "gap-2", 2, "height", "calc(100vw * 204 / 375)"], ["src", "/assets/images/logo-horizontal-light.webp", "alt", "", 1, "self-start", "h-[32px]"], [1, "h7", "text-white", "w-full", "text-center"], [1, "background-image", "flex", "w-full", "h-full", "md:items-center", "justify-center"], [1, "flex", "flex-col", "w-full", "md:w-[434px]", "min-h-[338px]", "p-6", "mb-24", "gap-6", "overflow-auto", "flex-shrink-0"], ["src", "/assets/images/logo-h.svg", "alt", "Logo", 1, "h-12", "self-start"], ["class", "col gap-6 w-full", "autocomplete", "off", 3, "formGroup", "ngClass", 4, "ngIf"], ["class", "col gap-6 w-full", "autocomplete", "off", 3, "formGroup", 4, "ngIf"], [3, "routerLink"], [1, "hero-img", "hidden", "md:flex", "justify-center", "flex-shrink-0", "overflow-hidden", "relative"], ["src", "/assets/images/hero-image.webp", "alt", "", 1, "w-full", "h-full", "object-cover", "absolute", "top-0"], [1, "text-white", "text-[36px]", "font-semibold", "text-center", "relative"], ["autocomplete", "off", 1, "col", "gap-6", "w-full", 3, "formGroup", "ngClass"], [3, "beforeunload", 4, "ngIf"], [1, "col", "gap-2"], [1, "col", "gap-2", "w-full"], [1, "col", "w-full"], ["type", "text", "placeholder", "Nh\u1EADp email c\u1EE7a b\u1EA1n (*)", "formControlName", "email", "autocomplete", "off"], ["emailElm", ""], [4, "ngIf"], [1, "relative", "w-full"], ["placeholder", "Nh\u1EADp m\u1EADt kh\u1EA9u", "formControlName", "password", 1, "w-full", 3, "type"], ["passwordElm", ""], [1, "absolute", "right-0", "top-0", "w-11", "h-full", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["class", "icon-VisibilityOff", 4, "ngIf"], ["class", "icon-Visibility", 4, "ngIf"], ["class", "text-sm", 4, "ngIf"], ["for", "tos", 1, "checkbox", "dark", "flex", "gap-2"], ["type", "checkbox", "formControlName", "tosChecked", "id", "tos"], ["tos", ""], [1, "text-sm", "!mt-0", 3, "ngClass"], ["target", "_blank", 3, "routerLink"], ["class", "error", 4, "ngIf"], [1, "btn", 3, "disabled", "click"], [3, "beforeunload"], [1, "error"], [1, "icon-VisibilityOff"], [1, "icon-Visibility"], [1, "text-sm"], [1, "list-disc"], [1, "ml-5", 3, "ngClass"], ["class", "text-red-0 icon-Cancel", 4, "ngIf"], ["class", "text-darkEmerald icon-Check", 4, "ngIf"], [1, "text-red-0", "icon-Cancel"], [1, "text-darkEmerald", "icon-Check"], ["autocomplete", "off", 1, "col", "gap-6", "w-full", 3, "formGroup"], [1, "col", "w-full", "gap-1"], ["type", "date", "placeholder", "07/05/2023", "formControlName", "birthdate", "autocomplete", "off"], ["formControlName", "class"], ["value", "L\u1EDBp 10"], ["value", "L\u1EDBp 11"], ["value", "L\u1EDBp 12"], ["type", "text", "placeholder", "VD: THPT Nguy\u1EC5n Th\u01B0\u1EE3ng Hi\u1EC1n", "formControlName", "school", "autocomplete", "off"], ["formControlName", "city"], ["value", "TP H\u1ED3 Ch\u00ED Minh", "selected", ""], ["value", "H\u00E0 N\u1ED9i"], ["value", "An Giang"], ["value", "B\u00E0 R\u1ECBa-V\u0169ng T\u00E0u"], ["value", "B\u1EA1c Li\u00EAu"], ["value", "B\u1EAFc Giang"], ["value", "B\u1EAFc K\u1EA1n"], ["value", "B\u1EAFc Ninh"], ["value", "B\u1EBFn Tre"], ["value", "B\u00ECnh D\u01B0\u01A1ng"], ["value", "B\u00ECnh \u0110\u1ECBnh"], ["value", "B\u00ECnh Ph\u01B0\u1EDBc"], ["value", "B\u00ECnh Thu\u1EADn"], ["value", "C\u00E0 Mau"], ["value", "Cao B\u1EB1ng"], ["value", "C\u1EA7n Th\u01A1"], ["value", "\u0110\u00E0 N\u1EB5ng"], ["value", "\u0110\u1EAFk L\u1EAFk"], ["value", "\u0110\u1EAFk N\u00F4ng"], ["value", "\u0110i\u1EC7n Bi\u00EAn"], ["value", "\u0110\u1ED3ng Nai"], ["value", "\u0110\u1ED3ng Th\u00E1p"], ["value", "Gia Lai"], ["value", "H\u00E0 Giang"], ["value", "H\u00E0 Nam"], ["value", "H\u00E0 T\u0129nh"], ["value", "H\u1EA3i D\u01B0\u01A1ng"], ["value", "H\u1EA3i Ph\u00F2ng"], ["value", "H\u1EADu Giang"], ["value", "H\u00F2a B\u00ECnh"], ["value", "H\u01B0ng Y\u00EAn"], ["value", "Kh\u00E1nh H\u00F2a"], ["value", "Ki\u00EAn Giang"], ["value", "Kon Tum"], ["value", "Lai Ch\u00E2u"], ["value", "L\u1EA1ng S\u01A1n"], ["value", "L\u00E0o Cai"], ["value", "L\u00E2m \u0110\u1ED3ng"], ["value", "Long An"], ["value", "Nam \u0110\u1ECBnh"], ["value", "Ngh\u1EC7 An"], ["value", "Ninh B\u00ECnh"], ["value", "Ninh Thu\u1EADn"], ["value", "Ph\u00FA Th\u1ECD"], ["value", "Ph\u00FA Y\u00EAn"], ["value", "Qu\u1EA3ng B\u00ECnh"], ["value", "Qu\u1EA3ng Nam"], ["value", "Qu\u1EA3ng Ng\u00E3i"], ["value", "Qu\u1EA3ng Ninh"], ["value", "Qu\u1EA3ng Tr\u1ECB"], ["value", "S\u00F3c Tr\u0103ng"], ["value", "S\u01A1n La"], ["value", "T\u00E2y Ninh"], ["value", "Th\u00E1i B\u00ECnh"], ["value", "Th\u00E1i Nguy\u00EAn"], ["value", "Thanh H\u00F3a"], ["value", "Th\u1EEBa Thi\u00EAn Hu\u1EBF"], ["value", "Ti\u1EC1n Giang"], ["value", "Tr\u00E0 Vinh"], ["value", "Tuy\u00EAn Quang"], ["value", "V\u0129nh Long"], ["value", "V\u0129nh Ph\u00FAc"], ["value", "Y\u00EAn B\u00E1i"], [1, "flex", "item-center", "justify-between", "gap-2"], [1, "btn-rounded", 3, "click"], [1, "icon-ArrowLeft", "text-[24px]"], ["type", "submit", 1, "btn", "flex-1", 3, "disabled", "click"], [1, "bg-blueGrey-100", "absolute", "top-0", "left-0", "w-screen", "h-screen", "flex", "items-center", "justify-center", "p-6"], [1, "flex", "flex-col", "items-center", "justify-center", "w-full", "sm:w-[493px]", "gap-6"], ["src", "assets/images/New Account.svg"], [1, "bg-white", "rounded-sm", "p-6", "flex", "flex-col", "gap-6"], [1, "text-primaryBlue"], [1, "flex", "flex-col", "gap-2"], [1, "text-orange"], ["href", "https://www.facebook.com/KyonsVN", "target", "_blank"], [1, "btn", 3, "routerLink"]],
    template: function SignUpComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SignUpComponent_div_0_Template, 22, 3, "div", 0)(1, SignUpComponent_div_1_Template, 24, 2, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.step !== 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.step === 2);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _share_directives_before_unload__WEBPACK_IMPORTED_MODULE_4__.BeforeunloadDirective],
    styles: [".error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\nembed[_ngcontent-%COMP%]   body[_ngcontent-%COMP%] {\n  background-color: white !important;\n}\n\n.error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n.hero-img[_ngcontent-%COMP%] {\n  border-radius: 16px 0px 0px 16px;\n  width: 88.5vh;\n  padding-top: 20vh;\n}\n\n.hero-bg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  background-image: url(\"/assets/images/hero-image-xs.webp\");\n  background-position: bottom right;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.background-image[_ngcontent-%COMP%] {\n  background-image: url(\"/assets/images/sign-in-top-right-bg.webp\"), url(\"/assets/images/sign-in-bottom-left-bg.webp\");\n  background-position: top right 23px, bottom left;\n  background-repeat: no-repeat;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvc3R1ZGVudC9zcmMvYXBwL3ByZXNlbnRhdGlvbi9wYWdlcy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxtQkFBQTtFQUFBLG9CQUFBO0VBQUEsb0JBQUE7RUFBQTtBQUFBOztBQUVGO0VBQ0Usa0NBQUE7QUFFRjs7QUFDRTtFQUFBLG1CQUFBO0VBQUEsb0JBQUE7RUFBQSxvQkFBQTtFQUFBO0FBQUE7O0FBRUY7RUFDRSxnQ0FBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQUlGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSwwREFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtBQUtGOztBQUZBO0VBQ0Usb0hBQUE7RUFDQSxnREFBQTtFQUNBLDRCQUFBO0FBS0YiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3Ige1xyXG4gIEBhcHBseSB0ZXh0LXJlZC0wIHRleHQtc207XHJcbn1cclxuZW1iZWQgYm9keSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDtcclxufVxyXG4uZXJyb3Ige1xyXG4gIEBhcHBseSB0ZXh0LXJlZC0wIHRleHQtc207XHJcbn1cclxuLmhlcm8taW1nIHtcclxuICBib3JkZXItcmFkaXVzOiAxNnB4IDBweCAwcHggMTZweDtcclxuICB3aWR0aDogY2FsYygxMDB2aCAqIDcwOCAvIDgwMCk7XHJcbiAgcGFkZGluZy10b3A6IDIwdmg7XHJcbn1cclxuLmhlcm8tYmcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9oZXJvLWltYWdlLXhzLndlYnAnKTtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b20gcmlnaHQ7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIC8vIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuLmJhY2tncm91bmQtaW1hZ2Uge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvc2lnbi1pbi10b3AtcmlnaHQtYmcud2VicCcpLCB1cmwoJy9hc3NldHMvaW1hZ2VzL3NpZ24taW4tYm90dG9tLWxlZnQtYmcud2VicCcpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHRvcCByaWdodCAyM3B4LCBib3R0b20gbGVmdDtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 22585:
/*!********************************************************************************!*\
  !*** ./libs/share-directives/src/lib/before-unload/before-unload.directive.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeforeunloadDirective: () => (/* binding */ BeforeunloadDirective)
/* harmony export */ });
/* harmony import */ var _before_unload_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./before-unload.service */ 49674);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);



class BeforeunloadDirective {
  constructor(service) {
    this.service = service;
  }
  ngAfterViewInit() {
    this.eventId = this.service.addLeaveCheck(this.event);
  }
  beforeUnloadHander($event) {
    if (this.event() != undefined) {
      return $event.returnValue = true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.service.removeLeaveCheck(this.eventId);
  }
  static #_ = this.ɵfac = function BeforeunloadDirective_Factory(t) {
    return new (t || BeforeunloadDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_before_unload_service__WEBPACK_IMPORTED_MODULE_0__.BeforeUnloadService));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
    type: BeforeunloadDirective,
    selectors: [["", "beforeunload", ""]],
    hostBindings: function BeforeunloadDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("beforeunload", function BeforeunloadDirective_beforeunload_HostBindingHandler($event) {
          return ctx.beforeUnloadHander($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
      }
    },
    inputs: {
      event: ["beforeunload", "event"]
    },
    standalone: true
  });
}

/***/ }),

/***/ 49674:
/*!******************************************************************************!*\
  !*** ./libs/share-directives/src/lib/before-unload/before-unload.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeforeUnloadService: () => (/* binding */ BeforeUnloadService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 84980);
/* harmony import */ var _before_unload_token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./before-unload.token */ 17659);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);



class BeforeUnloadService {
  constructor(alertFn) {
    this.alertFn = alertFn;
    this.leaveCheckFn = {};
  }
  addLeaveCheck(fn) {
    const nowKey = Object.keys(this.leaveCheckFn).length;
    this.leaveCheckFn[nowKey] = fn;
    return `${nowKey}`;
  }
  leaveCheck(message) {
    const checkResult = Object.keys(this.leaveCheckFn).some(key => {
      const result = this.leaveCheckFn[key]();
      if (typeof result === 'string') {
        message = result;
      }
      return result;
    });
    if (checkResult) {
      return this.alertFn ? this.alertFn(message) : (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(confirm(message));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(true);
  }
  removeLeaveCheck(key) {
    delete this.leaveCheckFn[key];
  }
  static #_ = this.ɵfac = function BeforeUnloadService_Factory(t) {
    return new (t || BeforeUnloadService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_before_unload_token__WEBPACK_IMPORTED_MODULE_0__.BEFORE_UNLOAD_FN, 8));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: BeforeUnloadService,
    factory: BeforeUnloadService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 17659:
/*!****************************************************************************!*\
  !*** ./libs/share-directives/src/lib/before-unload/before-unload.token.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BEFORE_UNLOAD_FN: () => (/* binding */ BEFORE_UNLOAD_FN),
/* harmony export */   BEFORE_UNLOAD_MESSAGE: () => (/* binding */ BEFORE_UNLOAD_MESSAGE)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);

const BEFORE_UNLOAD_MESSAGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('BEFORE_UNLOAD_MESSAGE');
const BEFORE_UNLOAD_FN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('BEFORE_UNLOAD_FN');

/***/ }),

/***/ 75198:
/*!**************************************************************!*\
  !*** ./libs/share-directives/src/lib/before-unload/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BEFORE_UNLOAD_MESSAGE: () => (/* reexport safe */ _before_unload_token__WEBPACK_IMPORTED_MODULE_2__.BEFORE_UNLOAD_MESSAGE),
/* harmony export */   BeforeUnloadService: () => (/* reexport safe */ _before_unload_service__WEBPACK_IMPORTED_MODULE_1__.BeforeUnloadService),
/* harmony export */   BeforeunloadDirective: () => (/* reexport safe */ _before_unload_directive__WEBPACK_IMPORTED_MODULE_0__.BeforeunloadDirective),
/* harmony export */   beforeUnloadDirective: () => (/* binding */ beforeUnloadDirective)
/* harmony export */ });
/* harmony import */ var _before_unload_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./before-unload.directive */ 22585);
/* harmony import */ var _before_unload_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./before-unload.service */ 49674);
/* harmony import */ var _before_unload_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./before-unload.token */ 17659);



function beforeUnloadDirective() {
  return 'before-unload-directive';
}


/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_sign-up_sign-up_component_ts.81e73dd8d669c0d4.js.map