"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_learning-path_complete_leanring-path-complete_component_ts"],{

/***/ 68690:
/*!************************************************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/learning-path/complete/leanring-path-complete.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LearningPathCompleteComponent: () => (/* binding */ LearningPathCompleteComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _infrastructure_knowledge_knowledge_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/knowledge/knowledge.service */ 66479);
/* harmony import */ var _infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @infrastructure/navigation/navigation.service */ 62033);







class LearningPathCompleteComponent {
  constructor() {
    this.learningGoal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_infrastructure_knowledge_knowledge_service__WEBPACK_IMPORTED_MODULE_0__.KnowledgeService).getStudentLearningGoal();
    this.paths = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_infrastructure_navigation_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService).paths;
  }
  static #_ = this.ɵfac = function LearningPathCompleteComponent_Factory(t) {
    return new (t || LearningPathCompleteComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: LearningPathCompleteComponent,
    selectors: [["ng-component"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 21,
    vars: 5,
    consts: [[1, "flex", "w-full", "h-full", "bg-img", "items-start", "md:items-center", "justify-center", "p-6"], [1, "w-full", "md:w-[434px]", "col", "gap-4", "md:gap-6", "text-white", "p-4"], [1, "col", "justify-center", "gap-4"], [1, "text-center", "hidden", "md:block"], [1, "text-orange"], [1, "md:hidden"], [1, "md:text-center"], [1, "col", "gap-2", "items-stretch"], [1, "btn", 3, "routerLink"], [1, "btn-rounded", 3, "routerLink"], [1, "h-[200px]"]],
    template: function LearningPathCompleteComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Hooray! L\u1ED9 tr\u00ECnh \u00F4n t\u1EADp cho m\u1EE5c ti\u00EAu ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "b", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " c\u1EE7a b\u1EA1n \u0111\u00E3 ho\u00E0n th\u00E0nh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "h6", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " Hooray! L\u1ED9 tr\u00ECnh \u00F4n t\u1EADp cho m\u1EE5c ti\u00EAu ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "b", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " c\u1EE7a b\u1EA1n \u0111\u00E3 ho\u00E0n th\u00E0nh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 7)(16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "T\u1EA1o \u201CB\u00E0i ki\u1EC3m tra th\u1EED\u201D m\u1EDBi");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Quay l\u1EA1i M\u1EE5c ti\u00EAu h\u1ECDc t\u1EADp");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.learningGoal.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.learningGoal.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("B\u00E2y gi\u1EDD ch\u1EAFc b\u1EA1n \u0111\u00E3 t\u1EF1 tin h\u01A1n \u0111\u1EC3 l\u00E0m b\u00E0i ", ctx.learningGoal.name, " r\u1ED3i. C\u00F3 mu\u1ED1n \u00F4n b\u00E0i ti\u1EBFp kh\u00F4ng?");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ctx.paths.mockTest.path);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ctx.paths.learningPath.path);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
    styles: [".bg-img[_ngcontent-%COMP%] {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n@media screen and (min-width: 768px) {\n  .bg-img[_ngcontent-%COMP%] {\n    background-image: url(\"/assets/images/finish-learninggoal.webp\");\n  }\n}\n@media screen and (max-width: 767px) {\n  .bg-img[_ngcontent-%COMP%] {\n    background-image: url(\"/assets/images/finish-learninggoal-xs.webp\");\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvc3R1ZGVudC9zcmMvYXBwL3ByZXNlbnRhdGlvbi9wYWdlcy9sZWFybmluZy1wYXRoL2NvbXBsZXRlL3N0eWxlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBQSxzQkFBQTtFQUFBLDJCQUFBO0VBQUE7QUFBQTtBQUNBO0VBRkY7SUFHSSxnRUFBQTtFQUdGO0FBQ0Y7QUFGRTtFQUxGO0lBTUksbUVBQUE7RUFLRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmJnLWltZyB7XHJcbiAgQGFwcGx5IGJnLWNvdmVyIGJnLWNlbnRlciBiZy1uby1yZXBlYXQ7XHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvZmluaXNoLWxlYXJuaW5nZ29hbC53ZWJwJyk7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2ZpbmlzaC1sZWFybmluZ2dvYWwteHMud2VicCcpO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_learning-path_complete_leanring-path-complete_component_ts.c4c12b7349cdfa1d.js.map