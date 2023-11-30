"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_sign-up_resend-verified_component_ts"],{

/***/ 4424:
/*!**************************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/sign-up/resend-verified.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResendVerifiedComponent: () => (/* binding */ ResendVerifiedComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);





class ResendVerifiedComponent {
  constructor() {
    this.paths = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_0__.NavigationService).paths;
  }
  static #_ = this.ɵfac = function ResendVerifiedComponent_Factory(t) {
    return new (t || ResendVerifiedComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ResendVerifiedComponent,
    selectors: [["ng-component"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 16,
    vars: 1,
    consts: [[1, "bg-blueGrey-100", "flex", "items-start", "justify-center", "w-full", "h-screen"], [1, "md:w-[454px]", "flex", "flex-col", "items-center", "justify-start", "gap-6", "py-[90px]"], ["src", "/assets/images/Resend email.svg", "alt", ""], [1, "col", "bg-white", "rounded-lg", "p-6", "gap-6"], ["href", "https://www.facebook.com/KyonsVN", "target", "_blank", 1, "text-orange", "font-bold", "underline"], [1, "col", "gap-2"], [1, "btn", 3, "routerLink"]],
    template: function ResendVerifiedComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3)(4, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Email v\u1EDBi \u0111\u01B0\u1EDDng d\u1EABn x\u00E1c th\u1EF1c \u0111\u00E3 tr\u00EAn \u0111\u01B0\u1EDDng t\u1EDBi v\u1EDBi b\u1EA1n r\u1ED3i n\u00E8");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "N\u1EBFu kh\u00F4ng t\u00ECm th\u1EA5y email, b\u1EA1n ki\u1EC3m tra th\u1EED m\u1EE5c Spam v\u00E0 qu\u1EA3ng c\u00E1o xem sao \uD83E\uDD14?");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Qua 10 ph\u00FAt v\u1EABn kh\u00F4ng th\u1EA5y email n\u00E0o? Li\u00EAn h\u1EC7 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Kyons fanpage");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 k\u1ECBp th\u1EDDi!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 5)(14, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Quay l\u1EA1i \u0111\u0103ng nh\u1EADp");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", ctx.paths.signIn.path);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink],
    encapsulation: 2
  });
}

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_sign-up_resend-verified_component_ts.5e1436678cb9f8d1.js.map