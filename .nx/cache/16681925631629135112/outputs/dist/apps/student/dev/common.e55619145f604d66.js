"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["common"],{

/***/ 23486:
/*!*********************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/auth/account.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountStandaloneService: () => (/* binding */ AccountStandaloneService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var _interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interceptor */ 7483);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);




class AccountStandaloneService {
  constructor(http, backend) {
    this.http = http;
    this.http = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient(backend);
  }
  signUp({
    email,
    // firstName,
    // lastName,
    // phone,
    // birthdate,
    // className,
    // school,
    // city,
    password,
    ref
  }) {
    const params = {
      email: email,
      password: password,
      family_name: '_',
      given_name: email,
      phone_number: '000'
    };
    if (ref) {
      params['referral'] = {
        mocktest_referral: ref
      };
    }
    return this.http.post(`${(0,_interceptor__WEBPACK_IMPORTED_MODULE_0__.serverApi)()}/auth/sign_up`, params);
  }
  requestResetPassword(email) {
    return this.http.post(`${(0,_interceptor__WEBPACK_IMPORTED_MODULE_0__.serverApi)()}/forgot_password`, {
      email: email
    });
  }
  newPassword(email, newPassword, code) {
    return this.http.put(`${(0,_interceptor__WEBPACK_IMPORTED_MODULE_0__.serverApi)()}/forgot_password`, {
      email: email,
      password: newPassword,
      code: code
    });
  }
  static #_ = this.ɵfac = function AccountStandaloneService_Factory(t) {
    return new (t || AccountStandaloneService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpBackend));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AccountStandaloneService,
    factory: AccountStandaloneService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 44901:
/*!**************************************************!*\
  !*** ./apps/student/src/app/utils/validators.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notHaveDigit: () => (/* binding */ notHaveDigit),
/* harmony export */   notHaveSpecial: () => (/* binding */ notHaveSpecial),
/* harmony export */   notHaveUppercase: () => (/* binding */ notHaveUppercase),
/* harmony export */   search: () => (/* binding */ search)
/* harmony export */ });
function notHaveDigit(str) {
  return str.search(/(?=.*[0-9])/) == -1;
}
function notHaveUppercase(str) {
  return str.search(/(?=.*[A-Z])/) == -1;
}
function notHaveSpecial(str) {
  return str.search(/(?=.*[!@#$%^&*()~=_+}{":;'?{}/>.<,`\-|[\]])/) == -1;
}
function search(str, regexStr) {
  str.search(regexStr);
}


/***/ })

}]);
//# sourceMappingURL=common.e55619145f604d66.js.map