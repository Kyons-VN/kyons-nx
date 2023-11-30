"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_reset-password_reset-password_component_ts"],{

/***/ 22195:
/*!********************************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/reset-password/reset-password.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResetPasswordComponent: () => (/* binding */ ResetPasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _infrastructure_auth_account_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/auth/account.service */ 23486);
/* harmony import */ var _infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @infrastructure/loading-overlay.service */ 59288);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/validators */ 44901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 61699);















const _c0 = ["emailElm"];
const _c1 = ["codeElm"];
const _c2 = ["passwordElm"];
function ResetPasswordComponent_form_5_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ch\u01B0a nh\u1EADp Email.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_5_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Email ch\u01B0a \u0111\u00FAng.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_5_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ResetPasswordComponent_form_5_div_7_div_1_Template, 2, 0, "div", 19)(2, ResetPasswordComponent_form_5_div_7_div_2_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.email.errors == null ? null : ctx_r4.email.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.email.errors == null ? null : ctx_r4.email.errors["email"]);
  }
}
function ResetPasswordComponent_form_5_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Kh\u00F4ng t\u00ECm th\u1EA5y t\u00E0i kho\u1EA3n tr\u00F9ng kh\u1EDBp email.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ResetPasswordComponent_form_5_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Th\u00F4ng tin ch\u01B0a ch\u00EDnh x\u00E1c");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c3 = a0 => ({
  "!text-orange border-orange": a0
});
function ResetPasswordComponent_form_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 9)(1, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Nh\u1EADp email c\u1EE7a b\u1EA1n \u0111\u1EC3 nh\u1EADn m\u00E3 thay \u0111\u1ED5i m\u1EADt kh\u1EA9u.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 7)(4, "input", 11, 12)(6, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ResetPasswordComponent_form_5_div_7_Template, 3, 2, "div", 14)(8, ResetPasswordComponent_form_5_div_8_Template, 3, 0, "div", 14)(9, ResetPasswordComponent_form_5_div_9_Template, 2, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ResetPasswordComponent_form_5_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r9.sendEmail());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx_r0.emailForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](7, _c3, ctx_r0.email.invalid || ctx_r0.emailNotFound));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.email.invalid && (ctx_r0.email.dirty || ctx_r0.email.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.emailNotFound && (ctx_r0.email.dirty || ctx_r0.email.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.errorMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r0.emailForm.touched && ctx_r0.emailForm.invalid || ctx_r0.processing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r0.processing ? "\u0110ang x\u1EED l\u00FD" : "G\u1EEDi t\u00F4i m\u00E3 code", " ");
  }
}
function ResetPasswordComponent_form_6_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ch\u01B0a nh\u1EADp m\u00E3.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_6_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "C\u00FA ph\u00E1p ch\u01B0a \u0111\u00FAng.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_6_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ResetPasswordComponent_form_6_div_8_div_1_Template, 2, 0, "div", 19)(2, ResetPasswordComponent_form_6_div_8_div_2_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r12.code.errors == null ? null : ctx_r12.code.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r12.code.errors == null ? null : ctx_r12.code.errors["pattern"]);
  }
}
function ResetPasswordComponent_form_6_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "M\u00E3 x\u00E1c th\u1EF1c kh\u00F4ng \u0111\u00FAng.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function ResetPasswordComponent_form_6_i_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i", 30);
  }
}
function ResetPasswordComponent_form_6_i_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i", 31);
  }
}
function ResetPasswordComponent_form_6_div_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ch\u01B0a nh\u1EADp m\u1EADt kh\u1EA9u.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_6_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "M\u1EADt kh\u1EA9u kh\u00F4ng h\u1EE3p l\u1EC7.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ResetPasswordComponent_form_6_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ResetPasswordComponent_form_6_div_18_div_1_Template, 2, 0, "div", 19)(2, ResetPasswordComponent_form_6_div_18_div_2_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r17.password.errors == null ? null : ctx_r17.password.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r17.password.errors == null ? null : ctx_r17.password.errors["pattern"]);
  }
}
const _c4 = a0 => ({
  "text-red-0": a0
});
function ResetPasswordComponent_form_6_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " M\u1EADt kh\u1EA9u ph\u1EA3i c\u00F3:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ul", 33)(4, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " T\u1EEB 8 k\u00FD t\u1EF1 tr\u1EDF l\u00EAn ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " K\u00FD t\u1EF1 vi\u1EBFt hoa (A-Z) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " K\u00FD t\u1EF1 s\u1ED1 (0-9) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " K\u00FD t\u1EF1 \u0111\u1EB7c bi\u1EC7t (~! @#$%^&*_-+=`|\\(){}[]:;\"'<>,.?/) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](4, _c4, (ctx_r18.password.dirty || ctx_r18.password.touched) && ctx_r18.password.value.length < 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](6, _c4, (ctx_r18.password.dirty || ctx_r18.password.touched) && ctx_r18.notHaveUppercase(ctx_r18.password.value)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](8, _c4, (ctx_r18.password.dirty || ctx_r18.password.touched) && ctx_r18.notHaveDigit(ctx_r18.password.value)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](10, _c4, (ctx_r18.password.dirty || ctx_r18.password.touched) && ctx_r18.notHaveSpecial(ctx_r18.password.value)));
  }
}
function ResetPasswordComponent_form_6_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r19.errorMessage);
  }
}
const _c5 = a0 => ({
  "!text-orange": a0
});
function ResetPasswordComponent_form_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " M\u00E3 code \u0111\u00E3 \u0111\u01B0\u1EE3c g\u1EEDi \u0111\u1EBFn email c\u1EE7a b\u1EA1n. Vui l\u00F2ng ki\u1EC3m tra email v\u00E0 nh\u1EADp m\u00E3 v\u00E0o \u00F4 b\u00EAn d\u01B0\u1EDBi. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "div", 7)(5, "input", 21, 22)(7, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, ResetPasswordComponent_form_6_div_8_Template, 3, 2, "div", 14)(9, ResetPasswordComponent_form_6_div_9_Template, 3, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ResetPasswordComponent_form_6_Template_div_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r24.showPassword = !ctx_r24.showPassword);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ResetPasswordComponent_form_6_i_15_Template, 1, 0, "i", 27)(16, ResetPasswordComponent_form_6_i_16_Template, 1, 0, "i", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](17, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, ResetPasswordComponent_form_6_div_18_Template, 3, 2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, ResetPasswordComponent_form_6_div_20_Template, 12, 12, "div", 29)(21, ResetPasswordComponent_form_6_div_21_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ResetPasswordComponent_form_6_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r25);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r26.sendCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx_r1.resetForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](12, _c5, ctx_r1.wrongCode || ctx_r1.code.invalid && (ctx_r1.code.dirty || ctx_r1.code.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.code.invalid && (ctx_r1.code.dirty || ctx_r1.code.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.wrongCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("type", ctx_r1.showPassword ? "text" : "password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.showPassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r1.showPassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.password.invalid && (ctx_r1.password.dirty || ctx_r1.password.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.password.touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.errorMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r1.resetForm.touched && ctx_r1.resetForm.invalid || ctx_r1.processing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.processing ? "\u0110ang x\u1EED l\u00FD" : "Ti\u1EBFp t\u1EE5c", " ");
  }
}
function ResetPasswordComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " \u0110\u1ED5i m\u1EADt kh\u1EA9u th\u00E0nh c\u00F4ng! H\u00E3y \u0111\u0103ng nh\u1EADp v\u00E0 tr\u1EA3i nghi\u1EC7m Kyons th\u00F4i n\u00E0o! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c6 = (a0, a1) => ({
  "text-orange": a0,
  btn: a1
});
class ResetPasswordComponent {
  constructor(route, fb, accountService, navService, loading) {
    this.route = route;
    this.fb = fb;
    this.accountService = accountService;
    this.loading = loading;
    this.class = 'h-full';
    this.emailForm = this.fb.group({});
    this.resetForm = this.fb.group({});
    this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email]);
    this.code = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern(/^[0-9]{6,6}$/g)]);
    this.step = 0;
    this.emailNotFound = false;
    // [!@#\$%\^&\*\(\)\~\=_\+\}\{\"\:;\'\?\{\}\/>\.\<,\`\-\|\[\]]
    this.password = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern(/^((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]]).{8,99})/)]);
    this.errorMessage = '';
    this.processing = false;
    this.isDebug = false;
    this.wrongCode = false;
    this.showPassword = false;
    this.paths = navService.paths;
    this.notHaveUppercase = _utils_validators__WEBPACK_IMPORTED_MODULE_3__.notHaveUppercase;
    this.notHaveDigit = _utils_validators__WEBPACK_IMPORTED_MODULE_3__.notHaveDigit;
    this.notHaveSpecial = _utils_validators__WEBPACK_IMPORTED_MODULE_3__.notHaveSpecial;
    this.search = _utils_validators__WEBPACK_IMPORTED_MODULE_3__.search;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email.setValue(params['email']);
        this.step = 1;
        if (params['reset_token']) {
          this.code.setValue(params['reset_token']);
        }
      }
    });
    this.emailForm.addControl('email', this.email);
    this.emailForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.emailNotFound = false;
    });
    this.emailForm.get('code')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.wrongCode = false;
    });
    this.resetForm.addControl('code', this.code);
    this.resetForm.addControl('password', this.password);
  }
  // ngAfterViewInit(): void {
  //   if (this.step == 0) this.emailElm.nativeElement.focus();
  //   else if (this.step == 1) {
  //     if (this.email.value == '') {
  //       setTimeout(() => {
  //         this.codeElm.nativeElement.focus();
  //       }, 1000);
  //     }
  //     else {
  //       setTimeout(() => {
  //         this.passwordElm.nativeElement.focus();
  //       }, 1000);
  //     }
  //   }
  // }
  sendEmail() {
    if (this.emailForm.untouched) {
      this.emailForm.markAllAsTouched();
      return;
    }
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
      error: err => {
        console.log(err);
        this.emailNotFound = true;
        this.processing = false;
        this.loading.hide();
      }
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
      error: err => {
        // {
        //   message: "Invalid verification code provided, please try again.",
        //   error_code: "CodeMismatchException",
        //   errors: [
        //   ],
        // }
        console.log(err);
        if (err.error.error_code == "CodeMismatchException") {
          this.wrongCode = true;
        } else if (err.error.error_code == "ExpiredCodeException") {
          this.errorMessage = 'Mã code đã hết hiệu lực, xin thử lại';
        } else {
          this.errorMessage = err.error.message;
        }
        this.processing = false;
        this.loading.hide();
      }
    });
  }
  static #_ = this.ɵfac = function ResetPasswordComponent_Factory(t) {
    return new (t || ResetPasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_infrastructure_auth_account_service__WEBPACK_IMPORTED_MODULE_0__.AccountStandaloneService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_2__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_infrastructure_loading_overlay_service__WEBPACK_IMPORTED_MODULE_1__.LoadingOverlayService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: ResetPasswordComponent,
    selectors: [["ng-component"]],
    viewQuery: function ResetPasswordComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.emailElm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.codeElm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.passwordElm = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function ResetPasswordComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMap"](ctx.class);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 11,
    vars: 8,
    consts: [[1, "flex", "flex-col", "md:flex-row", "h-full"], [1, "flex", "flex-col", "w-full", "h-full", "items-center", "justify-center", "bg-primaryBlue"], [1, "flex", "flex-col", "w-full", "md:w-[434px]", "p-4"], ["src", "./assets/images/logo-v.svg", "alt", "Logo", 1, "h-24"], [1, "h-12"], ["class", "flex flex-col", "autocomplete", "off", 3, "formGroup", 4, "ngIf"], ["class", "text-white", 4, "ngIf"], [1, "h-6"], [3, "routerLink", "ngClass"], ["autocomplete", "off", 1, "flex", "flex-col", 3, "formGroup"], [1, "text-white"], ["type", "text", "placeholder", "Nh\u1EADp email", "formControlName", "email", "autocomplete", "off", 3, "ngClass"], ["emailElm", ""], [1, "h-1"], ["class", "error", 4, "ngIf"], ["class", "error mt-1", 4, "ngIf"], [1, "h-4"], [1, "btn", 3, "disabled", "click"], [1, "error"], [4, "ngIf"], [1, "error", "mt-1"], ["type", "text", "placeholder", "Nh\u1EADp m\u00E3 code", "formControlName", "code", "autocomplete", "new-code", 3, "ngClass"], ["codeElm", ""], [1, "relative", "w-full"], ["placeholder", "Nh\u1EADp m\u1EADt kh\u1EA9u", "formControlName", "password", 1, "w-full", 3, "type"], ["passwordElm", ""], [1, "absolute", "right-0", "top-0", "w-11", "h-full", "flex", "items-center", "justify-center", "cursor-pointer", 3, "click"], ["class", "icon-VisibilityOff", 4, "ngIf"], ["class", "icon-Visibility", 4, "ngIf"], ["class", "text-white text-sm", 4, "ngIf"], [1, "icon-VisibilityOff"], [1, "icon-Visibility"], [1, "text-white", "text-sm"], [1, "list-disc"], [1, "ml-5", 3, "ngClass"]],
    template: function ResetPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "img", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ResetPasswordComponent_form_5_Template, 13, 9, "form", 5)(6, ResetPasswordComponent_form_6_Template, 25, 14, "form", 5)(7, ResetPasswordComponent_div_7_Template, 2, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Quay l\u1EA1i \u0111\u0103ng nh\u1EADp");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.step === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.step === 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.step === 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", ctx.paths.home.path)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](5, _c6, ctx.step !== 2, ctx.step === 2));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink],
    styles: [".error[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n    --tw-text-opacity: 1;\n    color: rgb(239 68 68 / var(--tw-text-opacity))\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvc3R1ZGVudC9zcmMvYXBwL3ByZXNlbnRhdGlvbi9wYWdlcy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtJQUFBLG1CQUFBO0lBQUEsb0JBQUE7SUFBQSxvQkFBQTtJQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3Ige1xyXG4gIEBhcHBseSB0ZXh0LXJlZC0wIHRleHQtc207XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_reset-password_reset-password_component_ts.4f83a7ba54405316.js.map