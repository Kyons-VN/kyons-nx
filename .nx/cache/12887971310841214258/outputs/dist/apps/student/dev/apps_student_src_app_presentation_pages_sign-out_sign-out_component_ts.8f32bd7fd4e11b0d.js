"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_sign-out_sign-out_component_ts"],{

/***/ 982:
/*!********************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/sign-out/sign-out.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignOutComponent: () => (/* binding */ SignOutComponent)
/* harmony export */ });
/* harmony import */ var _infrastructure_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/auth/auth.service */ 34440);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 27947);







class SignOutComponent {
  constructor(authService, router, navService) {
    this.authService = authService;
    this.router = router;
    this.class = 'h-full';
    this.paths = navService.paths;
  }
  ngOnInit() {
    this.signOut();
  }
  signOut() {
    this.authService.signOut();
    this.router.navigate([this.paths.signIn.path]);
  }
  static #_ = this.ɵfac = function SignOutComponent_Factory(t) {
    return new (t || SignOutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_infrastructure_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: SignOutComponent,
    selectors: [["ng-component"]],
    hostVars: 2,
    hostBindings: function SignOutComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.class);
      }
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 0,
    consts: [[1, "w-full", "h-full", "flex", "items-center", "justify-center"]],
    template: function SignOutComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u0110ang \u0111\u0103ng xu\u1EA5t...");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_sign-out_sign-out_component_ts.8f32bd7fd4e11b0d.js.map