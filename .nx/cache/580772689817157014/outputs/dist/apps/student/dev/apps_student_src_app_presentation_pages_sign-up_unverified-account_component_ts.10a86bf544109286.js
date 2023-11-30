"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_sign-up_unverified-account_component_ts"],{

/***/ 87703:
/*!*****************************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/sign-up/unverified-account.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnverifiedAccountComponent: () => (/* binding */ UnverifiedAccountComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);





class UnverifiedAccountComponent {
  constructor() {
    this.paths = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_0__.NavigationService).paths;
  }
  static #_ = this.ɵfac = function UnverifiedAccountComponent_Factory(t) {
    return new (t || UnverifiedAccountComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: UnverifiedAccountComponent,
    selectors: [["ng-component"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 18,
    vars: 1,
    consts: [[1, "bg-blueGrey-100", "flex", "items-start", "justify-center", "w-full", "h-screen"], [1, "md:w-[454px]", "flex", "flex-col", "items-center", "justify-start", "gap-6", "py-[90px]"], ["src", "/assets/images/Account Not Verified.svg", "alt", ""], [1, "col", "bg-white", "rounded-lg", "p-6", "gap-6"], [1, "col", "gap-2"], [1, "btn", "orange"], [1, "btn-rounded", 3, "routerLink"]],
    template: function UnverifiedAccountComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3)(4, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "T\u00E0i kho\u1EA3n c\u1EE7a b\u1EA1n ch\u01B0a \u0111\u01B0\u1EE3c x\u00E1c th\u1EF1c");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "\u0110\u1EC3 c\u00F3 th\u1EC3 s\u1EED d\u1EE5ng \u1EE9ng d\u1EE5ng Kyons, b\u1EA1n c\u1EA7n ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "nh\u1EA5p v\u00E0o \u0111\u01B0\u1EDDng d\u1EABn x\u00E1c th\u1EF1c");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " \u0111\u00E3 \u0111\u01B0\u1EE3c g\u1EEDi trong email \u0111\u0103ng k\u00FD c\u1EE7a b\u1EA1n.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Ngo\u00E0i ra, b\u1EA1n c\u00F3 th\u1EC3 y\u00EAu c\u1EA7u g\u1EEDi l\u1EA1i link x\u00E1c th\u1EF1c b\u1EB1ng c\u00E1ch b\u1EA5m v\u00E0o n\u00FAt d\u01B0\u1EDBi \u0111\u00E2y");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 4)(14, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "G\u1EEDi l\u1EA1i email x\u00E1c th\u1EF1c (30s)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Quay l\u1EA1i \u0111\u0103ng nh\u1EADp");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", ctx.paths.signIn.path);
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink],
    encapsulation: 2
  });
}

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_sign-up_unverified-account_component_ts.10a86bf544109286.js.map