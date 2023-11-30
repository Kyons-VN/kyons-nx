"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["common"],{

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
//# sourceMappingURL=common.c0e5bea7535c7164.js.map