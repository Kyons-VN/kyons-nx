"use strict";
(self["webpackChunkstudent"] = self["webpackChunkstudent"] || []).push([["apps_student_src_app_presentation_pages_flashcard_flashcard_component_ts"],{

/***/ 65265:
/*!****************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/flashcard.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlashcardService: () => (/* binding */ FlashcardService)
/* harmony export */ });
/* harmony import */ var _share_utils_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @share-utils/data */ 47970);
/* harmony import */ var _sample_cong_thuc_dao_ham_co_ban_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sample/cong-thuc-dao-ham-co-ban.json */ 39538);
/* harmony import */ var _sample_cong_thuc_logarit_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sample/cong-thuc-logarit.json */ 84739);
/* harmony import */ var _sample_cong_thuc_nguyen_ham_co_ban_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sample/cong-thuc-nguyen-ham-co-ban.json */ 80551);
/* harmony import */ var _sample_dien_tich_hinh_phang_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sample/dien-tich-hinh-phang.json */ 25841);
/* harmony import */ var _sample_the_tich_hinh_tru_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sample/the-tich-hinh-tru.json */ 33886);
/* harmony import */ var _sample_the_tich_khoi_cau_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sample/the-tich-khoi-cau.json */ 55474);
/* harmony import */ var _sample_the_tich_khoi_tru_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sample/the-tich-khoi-tru.json */ 90899);
/* harmony import */ var _sample_tong_n_cap_so_cong_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sample/tong-n-cap-so-cong.json */ 52965);
/* harmony import */ var _sample_tong_n_cap_so_nhan_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sample/tong-n-cap-so-nhan.json */ 44563);
/* harmony import */ var _sample_xac_suat_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sample/xac-suat.json */ 74258);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);












class FlashcardService {
  getFlashcard(id) {
    let dataObject = {};
    switch (id) {
      case 'cong-thuc-logarit':
        dataObject = _sample_cong_thuc_logarit_json__WEBPACK_IMPORTED_MODULE_2__;
        break;
      case 'cong-thuc-dao-ham-co-ban':
        dataObject = _sample_cong_thuc_dao_ham_co_ban_json__WEBPACK_IMPORTED_MODULE_1__;
        break;
      case 'cong-thuc-nguyen-ham-co-ban':
        dataObject = _sample_cong_thuc_nguyen_ham_co_ban_json__WEBPACK_IMPORTED_MODULE_3__;
        break;
      case 'dien-tich-hinh-phang':
        dataObject = _sample_dien_tich_hinh_phang_json__WEBPACK_IMPORTED_MODULE_4__;
        break;
      case 'the-tich-khoi-tru':
        dataObject = _sample_the_tich_khoi_tru_json__WEBPACK_IMPORTED_MODULE_7__;
        break;
      case 'xac-suat':
        dataObject = _sample_xac_suat_json__WEBPACK_IMPORTED_MODULE_10__;
        break;
      case 'tong-n-cap-so-cong':
        dataObject = _sample_tong_n_cap_so_cong_json__WEBPACK_IMPORTED_MODULE_8__;
        break;
      case 'tong-n-cap-so-nhan':
        dataObject = _sample_tong_n_cap_so_nhan_json__WEBPACK_IMPORTED_MODULE_9__;
        break;
      case 'the-tich-hinh-tru':
        dataObject = _sample_the_tich_hinh_tru_json__WEBPACK_IMPORTED_MODULE_5__;
        break;
      case 'the-tich-khoi-cau':
        dataObject = _sample_the_tich_khoi_cau_json__WEBPACK_IMPORTED_MODULE_6__;
        break;
    }
    return _share_utils_data__WEBPACK_IMPORTED_MODULE_0__.TestContent.fromJson(dataObject);
  }
  static #_ = this.ɵfac = function FlashcardService_Factory(t) {
    return new (t || FlashcardService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
    token: FlashcardService,
    factory: FlashcardService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 44363:
/*!**********************************************************************************!*\
  !*** ./apps/student/src/app/presentation/pages/flashcard/flashcard.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlashcardComponent: () => (/* binding */ FlashcardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ 60702);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _infrastructure_flashcard_flashcard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @infrastructure/flashcard/flashcard.service */ 65265);
/* harmony import */ var _share_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @share-components */ 41760);
/* harmony import */ var _share_utils_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @share-utils/data */ 47970);










function FlashcardComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_button_15_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.showWaitlistPopup = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Ti\u1EBFp ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function FlashcardComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_button_16_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.handleNextQuestion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r1.testProgress.value < ctx_r1.currentTestIndex + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.showResult ? "Ti\u1EBFp" : "Tr\u1EA3 l\u1EDDi", " ");
  }
}
function FlashcardComponent_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_button_25_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.showWaitlistPopup = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function FlashcardComponent_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_button_26_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.handleNextQuestion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r3.testProgress.value < ctx_r3.currentTestIndex + 1);
  }
}
const _c0 = () => ["/waitlist"];
function FlashcardComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 27)(1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2)(4, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Oh no...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " M\u1ED7i flashcard hi\u1EC7n t\u1EA1i ch\u1EC9 c\u00F3 2 c\u00E2u b\u00E0i t\u1EADp th\u00F4i \u00E0 \uD83D\uDE22. Nh\u01B0ng sau khi Kyons ra m\u1EAFt th\u00EC m\u1ED7i flashcard s\u1EBD mang t\u1EDBi v\u00F4 h\u1EA1n b\u00E0i t\u1EADp th\u00EDch \u1EE9ng ri\u00EAng cho b\u1EA1n \u0111\u00F3! Tham gia ngay \u201CDanh s\u00E1ch ch\u1EDD\u201D \u0111\u1EC3 \u0111\u01B0\u1EE3c th\u00F4ng b\u00E1o s\u1EDBm nh\u1EA5t nha! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p")(9, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "B\u00ED m\u1EADt n\u00E8: tham gia danh s\u00E1ch ch\u1EDD \u0111\u01B0\u1EE3c nh\u1EADn qu\u00E0 \u0111\u00F3!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 2)(12, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "T\u1EDBi lu\u00F4n nha");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_div_27_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r13.showWaitlistPopup = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "\u0110\u00F3ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c0));
  }
}
class FlashcardComponent {
  constructor() {
    this.route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute);
    this.service = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_infrastructure_flashcard_flashcard_service__WEBPACK_IMPORTED_MODULE_0__.FlashcardService);
    this.testSubmission = new _share_utils_data__WEBPACK_IMPORTED_MODULE_2__.Submission();
    this.testProgress = new _share_utils_data__WEBPACK_IMPORTED_MODULE_2__.Progress();
    this.currentTestIndex = 0;
    this.showResult = false;
    this.showWaitlistPopup = false;
  }
  ngOnInit() {
    this.flashcardId = this.route.snapshot.paramMap.get('id') ?? '';
    this.testContent = this.service.getFlashcard(this.flashcardId);
    console.log(this.testContent);
    this.title = this.testContent.topicName;
    this.testProgress = _share_utils_data__WEBPACK_IMPORTED_MODULE_2__.Progress.from(0, this.testContent.questions.length);
  }
  updateProgress(nextProgress) {
    this.testProgress = nextProgress;
  }
  updateSubmission(nextSubmission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }
  testComplete() {
    this.showWaitlistPopup = true;
  }
  handleNextQuestion() {
    if (this.showResult) {
      this.currentTestIndex++;
      this.showResult = false;
    } else {
      this.showResult = true;
    }
  }
  static #_ = this.ɵfac = function FlashcardComponent_Factory(t) {
    return new (t || FlashcardComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: FlashcardComponent,
    selectors: [["ng-component"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 28,
    vars: 12,
    consts: [[1, "w-full", "h-screen", "bg-blueGrey-100", "flex", "justify-center"], [1, "w-full", "max-w-[894px]", "col", "gap-4", "p-6"], [1, "col", "gap-2"], [1, "w-full", 3, "progress"], [1, "col", "rounded-lg", "bg-white", "p-4", "overflow-y-auto", "md:flex-1", "max-h-[calc(100vh_-_200px)]", "md:max-h-fit"], [1, "flex", "md:flex-1", 3, "content", "submission", "currentIndex", "isActive", "showResult", "progressEvent", "submissionEvent", "currentIndexEvent", "completeCallback", "showResultEvent"], [1, "justify-between", "hidden", "md:flex"], [1, "hidden", "md:flex", "flex-1", "flex-col"], [1, "uppercase"], [1, "flex", "gap-2", "items-center"], ["id", "continue", "class", "btn", 3, "click", 4, "ngIf"], ["class", "btn", 3, "disabled", "click", 4, "ngIf"], [1, "ads"], [1, "text-white"], [1, "btn", "btn-large", "w-full", "md:w-auto", 3, "click"], [1, "md:hidden", "w-full", "flex", "items-center", "justify-between", "gap-2", "mb-20"], ["src", "/assets/images/logo-h.svg", "alt", "Logo", 1, "w-[155px]"], [1, "flex", "gap-2", "items-center", "justify-center"], ["class", "btn btn-icon order-2 md:order-3", 3, "click", 4, "ngIf"], ["class", "btn btn-icon order-2 md:order-3", 3, "disabled", "click", 4, "ngIf"], ["class", "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-start p-4 bg-black bg-opacity-80", 4, "ngIf"], ["id", "continue", 1, "btn", 3, "click"], [1, "btn", 3, "disabled", "click"], [1, "btn", "btn-icon", "order-2", "md:order-3", 3, "click"], [1, "icon-Submit"], [1, "btn", "btn-icon", "order-2", "md:order-3", 3, "disabled", "click"], [1, "icon-ArrowRight"], [1, "fixed", "top-0", "left-0", "right-0", "bottom-0", "flex", "justify-center", "items-start", "p-4", "bg-black", "bg-opacity-80"], [1, "col", "p-4", "gap-4", "rounded-lg", "bg-white", "max-w-[700px]"], ["src", "/assets/images/rule-full.jpg", "alt", "Banner"], ["id", "register", 1, "btn", "btn-large", "w-full", 3, "routerLink"], [1, "btn", "btn-rounded", "btn-large", "w-full", 3, "click"]],
    template: function FlashcardComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "kyonsvn-questions-progress", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4)(7, "kyonsvn-test-content", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("progressEvent", function FlashcardComponent_Template_kyonsvn_test_content_progressEvent_7_listener($event) {
          return ctx.updateProgress($event);
        })("submissionEvent", function FlashcardComponent_Template_kyonsvn_test_content_submissionEvent_7_listener($event) {
          return ctx.updateSubmission($event);
        })("currentIndexEvent", function FlashcardComponent_Template_kyonsvn_test_content_currentIndexEvent_7_listener($event) {
          return ctx.currentTestIndex = $event;
        })("completeCallback", function FlashcardComponent_Template_kyonsvn_test_content_completeCallback_7_listener() {
          return ctx.testComplete();
        })("showResultEvent", function FlashcardComponent_Template_kyonsvn_test_content_showResultEvent_7_listener($event) {
          return ctx.showResult = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "div", 7)(10, "strong", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Ph\u00EDm t\u1EAFt:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "B\u1EA5m 1,2,3,4 ch\u1ECDn \u0111\u00E1p \u00E1n, b\u1EA5m space s\u1EBD l\u00E0m ti\u1EBFp ho\u1EB7c n\u1ED9p b\u00E0i");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, FlashcardComponent_button_15_Template, 2, 0, "button", 10)(16, FlashcardComponent_button_16_Template, 2, 2, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 12)(18, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Mu\u1ED1n luy\u1EC7n t\u1EADp v\u1EDBi v\u00F4 h\u1EA1n c\u00E2u h\u1ECFi \u0111\u01B0\u1EE3c t\u1EA1o ra b\u1EDFi Tr\u00ED tu\u1EC7 nh\u00E2n t\u1EA1o (AI)?");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FlashcardComponent_Template_button_click_20_listener() {
          return ctx.showWaitlistPopup = true;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " \u0110\u0103ng k\u00FD Danh s\u00E1ch ch\u1EDD c\u1EE7a Kyons! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, FlashcardComponent_button_25_Template, 2, 0, "button", 18)(26, FlashcardComponent_button_26_Template, 2, 1, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, FlashcardComponent_div_27_Template, 16, 2, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("B\u00E0i t\u1EADp ", ctx.title, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("progress", ctx.testProgress);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("content", ctx.testContent)("submission", ctx.testSubmission)("currentIndex", ctx.currentTestIndex)("isActive", true)("showResult", ctx.showResult);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.testProgress.isComplete() && ctx.showResult);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !(ctx.testProgress.isComplete() && ctx.showResult));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.testProgress.isComplete() && ctx.showResult);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !(ctx.testProgress.isComplete() && ctx.showResult));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.showWaitlistPopup);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _share_components__WEBPACK_IMPORTED_MODULE_1__.TestContentComponent, _share_components__WEBPACK_IMPORTED_MODULE_1__.QuestionsProgressComponent, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
    styles: [".ads[_ngcontent-%COMP%] {\n    display: flex;\n    min-height: 108px;\n    width: 100%;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    border-radius: 0.5rem;\n    background-image: url(\"/assets/images/bg-contact-xs.jpg\");\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem\n}\n@media (min-width: 768px) {\n    .ads[_ngcontent-%COMP%] {\n        min-height: 118px;\n        flex-direction: row;\n        gap: 1.75rem;\n        background-image: url(\"/assets/images/bg-contact.jpg\");\n        padding-left: 3rem;\n        padding-right: 3rem;\n        padding-top: 1.5rem;\n        padding-bottom: 1.5rem\n    }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL2FwcHMvc3R1ZGVudC9zcmMvYXBwL3ByZXNlbnRhdGlvbi9wYWdlcy9mbGFzaGNhcmQvZmxhc2hjYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0lBQUEsYUFBQTtJQUFBLGlCQUFBO0lBQUEsV0FBQTtJQUFBLHNCQUFBO0lBQUEsbUJBQUE7SUFBQSw4QkFBQTtJQUFBLFdBQUE7SUFBQSxxQkFBQTtJQUFBLHlEQUFBO0lBQUEsc0JBQUE7SUFBQSwyQkFBQTtJQUFBLDRCQUFBO0lBQUEsb0JBQUE7SUFBQSxxQkFBQTtJQUFBLG9CQUFBO0lBQUE7QUFBQTtBQUFBO0lBQUE7UUFBQSxpQkFBQTtRQUFBLG1CQUFBO1FBQUEsWUFBQTtRQUFBLHNEQUFBO1FBQUEsa0JBQUE7UUFBQSxtQkFBQTtRQUFBLG1CQUFBO1FBQUE7SUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLmFkcyB7XHJcbiAgQGFwcGx5IGZsZXggbWQ6ZmxleC1yb3cgZmxleC1jb2wgdy1mdWxsIHJvdW5kZWQtbGcgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBtZDpnYXAtNyBweC02IG1kOnB4LTEyIHB5LTMgbWQ6cHktNiBiZy1bdXJsKCcvYXNzZXRzL2ltYWdlcy9iZy1jb250YWN0LXhzLmpwZycpXSBtZDpiZy1bdXJsKCcvYXNzZXRzL2ltYWdlcy9iZy1jb250YWN0LmpwZycpXSBtaW4taC1bMTA4cHhdIG1kOm1pbi1oLVsxMThweF0gYmctbm8tcmVwZWF0IGJnLWNlbnRlciBiZy1jb3ZlcjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 39538:
/*!********************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/cong-thuc-dao-ham-co-ban.json ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":2,"learning_point_name":"Đạo hàm","data":[{"id":1,"content":"<p>Tính đạo hàm của y với <img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681988014image.png\\"></p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:105px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681988180image.png\\"></p>","explanation":"<p>Đặt <img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682007810image.png\\"></p><p>=&gt; <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682007839image.png\\"></p><p>Ta có <img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682008345image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:600px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682008807image.png\\"></p>","is_correct":true},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:89px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681988360image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:89px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681988445image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:105px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681988543image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Tính đạo hàm của y với&nbsp;</p><p><img class=\\"image_resized\\" style=\\"width:115px\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989073image.png\\"></p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:130px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989569image.png\\"></p>","explanation":"<p><img class=\\"image_resized\\" style=\\"width:460px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989445image.png\\"></p>","is_correct":true},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:130px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989654image.png\\"></p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:130px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989811image.png\\"></p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:130px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681989735image.png\\"></p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 84739:
/*!*************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/cong-thuc-logarit.json ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Công thức Logarit","data":[{"id":1,"content":"<p>Giải phương trình <img class=\\"image_resized\\" style=\\"width: 135px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681956061image.png\\"></p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681965621image.png\\"</p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:42px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681965218image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:45px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682058210image.png\\"> và <img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682058244image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p class=\\"MsoNormal\\">Phương trình vô nghiệm</p>","explanation":"<p>Áp dụng công thức <img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967575image.png\\"> cho <img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967583image.png\\">, ta có</p><p><img class=\\"image_resized\\" style=\\"width:180px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967596image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967618image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967626image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:250px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967656image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967662image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:190px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967671image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681967682image.png\\"></p><p>Giải phương trình bậc 2 ta có kết quả là phương trình này vô nghiệm</p>","is_correct":true}]},{"id":2,"content":"<p>Cho</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681975530image.png\\"></p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682027890image.png\\"></p><p>Mệnh đề nào sau đây là đúng</p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682028113image.png\\"></p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681977825image.png\\"></p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681977994image.png\\"></p>","explanation":"<p>Đặt <img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976018image.png\\"</p><p>Áp dụng công thức <img class=\\"image_resized\\" style=\\"width:230px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976323image.png\\"> &nbsp;ta có:</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:160px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976492image.png\\"></p><p>&nbsp;Áp dụng công thức <img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976647image.png\\"> ta có</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:160px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976722image.png\\"></p><p>Áp dụng công thức <img class=\\"image_resized\\" style=\\"width:230px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976804image.png\\"> ta có</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:320px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976889image.png\\"></p><p>Áp dụng công thức <img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681976963image.png\\"> ta có</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:420px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681977051image.png\\"></p><p>&nbsp;Vậy đáp án là <img class=\\"image_resized\\" style=\\"width:95px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1681977161image.png\\"></p>","is_correct":true},{"id":8,"value":"8","content":"<p>Tất cả đều không đúng</p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 80551:
/*!***********************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/cong-thuc-nguyen-ham-co-ban.json ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Nguyên hàm","data":[{"id":1,"content":"<p>Tìm</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682006139image.png\\"></p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009111image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009198image.png\\"></p>","explanation":"<p>Đặt <img class=\\"image_resized\\" style=\\"width:160px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682007810image.png\\"></p><p>=&gt; <img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682007839image.png\\"></p><p>Ta có <img class=\\"image_resized\\" style=\\"width:250px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682008345image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:600px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682008807image.png\\"></p>","is_correct":true},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009278image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:170px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009347image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Tìm nguyên hàm của</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:140px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009504image.png\\"></p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010152image.png\\"></p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010038image.png\\"></p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009974image.png\\"></p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:65px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009865image.png\\"></p>","explanation":"<p><img class=\\"image_resized\\" style=\\"width:600px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682009750image.png\\"></p>","is_correct":true}]}]}');

/***/ }),

/***/ 25841:
/*!****************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/dien-tich-hinh-phang.json ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Diện tích hình phẳng","data":[{"id":1,"content":"<p>Diện tích hình phẳng giới hạn bởi hai đồ thị hàm số <img class=\\"image_resized\\" style=\\"width:65px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010388image.png\\">, trục hoành và hai đường thẳng <img class=\\"image_resized\\" style=\\"width:65px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010452image.png\\"> , <img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010591image.png\\"></p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:9px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011549image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011479image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011399image.png\\"></p>","explanation":"<p>Phương trình hoành độ giao điểm của đồ thị hàm số <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010388image.png\\"> và trục hoành là&nbsp;</p><p><img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010859image.png\\">&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010909image.png\\"></p><p>Hàm số <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682010388image.png\\"> không đổi dấu trên <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011028image.png\\"> nên</p><p><img class=\\"image_resized\\" style=\\"width:400px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011279image.png\\"></p>","is_correct":true},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:9px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011607image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Tính diện tích của các hình phẳng giới hạn bởi đường cong <img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011869image.png\\">và trục Ox</p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:9px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012929image.png\\"></p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:9px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012851image.png\\"></p>","explanation":"<p>Phương trình hoành độ giao điểm của của đồ thị hàm số <img class=\\"image_resized\\" style=\\"width:140px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682011869image.png\\">và trục <img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012089image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012164image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012400image.png\\"></p><p>Vì <img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012553image.png\\"></p><p>nên <img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012708image.png\\"></p>","is_correct":true},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682012988image.png\\"></p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682013038image.png\\"></p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 33886:
/*!*************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/the-tich-hinh-tru.json ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Thể tích hình trụ","data":[{"id":1,"content":"<p>Một hình trụ (T) có chu vi đáy là 8π và chiều cao h = 10. Tính thể tích hình trụ</p>","answers":[{"id":1,"value":"1","content":"<p>80π</p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p>40π</p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p>160π</p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:180px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682058599image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682058683image.png\\"></p>","is_correct":true},{"id":4,"value":"4","content":"<p>150π</p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Chiều cao của 1 hình trụ bằng bán kính đường tròn đáy. Diện tích xung quanh của hình trụ là <img class=\\"image_resized\\" style=\\"width:63px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682025388image.png\\">. Tính thể tích hình trụ</p>","answers":[{"id":5,"value":"5","content":"<p>1000π</p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p>100π</p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:53px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059182image.png\\"></p><p>Vậy nên</p><p><img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059121image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:300px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059259image.png\\"></p>","is_correct":true},{"id":7,"value":"7","content":"<p>500π</p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p>Đáp án khác</p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 55474:
/*!*************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/the-tich-khoi-cau.json ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Thể tích khối cầu","data":[{"id":1,"content":"<p>Cho khối cầu có thể tích là <img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682025734image.png\\"></p><p>Bán kính R của khối cầu là</p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682025851image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682025905image.png\\"></p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059688image.png\\"></p><p>=&gt; <img class=\\"image_resized\\" style=\\"width:75px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059764image.png\\"></p><p>=&gt; <img class=\\"image_resized\\" style=\\"width:98px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682059826image.png\\"></p>","is_correct":true},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:89px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682025951image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:77px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026027image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Cho khối cầu <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026195image.png\\"> có bán kính <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026322image.png\\">&nbsp;</p><p>Cho khối cầu <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026250image.png\\"> có bán kính <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026300image.png\\"></p><p>Biết <img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026392image.png\\"></p><p>Tính tỉ số diện tích mặt cầu <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026195image.png\\">so với <img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682026250image.png\\"></p>","answers":[{"id":5,"value":"5","content":"<p>0.5</p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"2","explanation":"","is_correct":false},{"id":7,"value":"7","content":"0.25","explanation":"","is_correct":false},{"id":8,"value":"8","content":"4","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:250px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682060135image.png\\"></p>","is_correct":true}]}]}');

/***/ }),

/***/ 90899:
/*!*************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/the-tich-khoi-tru.json ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Thể tích khối trụ","data":[{"id":1,"content":"<p>Trong mặt phẳng Oxy, cho hình phẳng (K) giới hạn bởi các đường <img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682013325image.png\\"> và <img class=\\"image_resized\\" style=\\"width:45px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682013395image.png\\"></p><p>Thể tích của vật thể tròn xoay khi quay hình (H) quanh trục hoành một vòng</p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:11px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014945image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:11px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014899image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:11px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014852image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:20px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014757image.png\\"></p>","explanation":"<p>Phương trình hoành độ giao điểm của <img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682013325image.png\\"> và <img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682013395image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014327image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014428image.png\\"></p><p>Ta có <img class=\\"image_resized\\" style=\\"width:300px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682014620image.png\\"></p>","is_correct":true}]},{"id":2,"content":"<p>Cho đường cong <img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015233image.png\\"> và đường thẳng <img class=\\"image_resized\\" style=\\"width:45px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015292image.png\\"></p><p>Tính thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi hai đường trên quanh trục Ox</p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:27px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015824image.png\\"></p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:27px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015878image.png\\"></p>","explanation":"<p>Phương trình hoành độ giao điểm của <img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015233image.png\\"> và &nbsp;<img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015292image.png\\"> là</p><p><img class=\\"image_resized\\" style=\\"width:100px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015440image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015500image.png\\"></p><p>Ta có <img class=\\"image_resized\\" style=\\"width:400px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015712image.png\\"></p>","is_correct":true},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015928image.png\\"></p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:27px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682015974image.png\\"></p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 52965:
/*!**************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/tong-n-cap-so-cong.json ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Cấp số cộng","data":[{"id":1,"content":"<p>Cho cấp số cộng <img class=\\"image_resized\\" style=\\"width:25px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022030image.png\\"> có</p><p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022108image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:85px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022183image.png\\"></p><p>Tổng của 20 số hạng đầu tiên của cấp số cộng là</p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022329image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:85px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022450image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022527image.png\\"></p>","explanation":"<p><img class=\\"image_resized\\" style=\\"width:200px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682063893image.png\\"></p><p>=&gt; <img class=\\"image_resized\\" style=\\"width:290px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682064025image.png\\"></p>","is_correct":true},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:85px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022576image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Cho cấp số cộng <img class=\\"image_resized\\" style=\\"width:25px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022030image.png\\"> có</p><p><img class=\\"image_resized\\" style=\\"width:92px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022654image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682022735image.png\\"></p><p>Khẳng định nào sau đây sai?</p>","answers":[{"id":5,"value":"5","content":"<p>Số hạng thứ 2 của cấp số cộng này là: 1,4</p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p>Số hạng thứ 3 của cấp số cộng này là: 2,5</p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p>Số hạng thứ 4 của cấp số cộng này là: 3,6</p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p>Số hạng thứ 7 của cấp số cộng này là: 7,7</p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682064187image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682064459image.png\\"></p><p>Vậy số hạng thứ 8 của cấp số cộng này là: 1,1</p>","is_correct":true}]}]}');

/***/ }),

/***/ 44563:
/*!**************************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/tong-n-cap-so-nhan.json ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Cấp số nhân","data":[{"id":1,"content":"<p>Cho cấp số nhân có</p><p><img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023299image.png\\"></p><p><img class=\\"image_resized\\" style=\\"width:68px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023348image.png\\"></p><p>Tìm q và <img class=\\"image_resized\\" style=\\"width:20px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023669image.png\\"> của cấp số nhân</p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023768image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023828image.png\\"></p>","explanation":"","is_correct":false},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023901image.png\\"></p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682064887image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682064993image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:70px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682065043image.png\\"></p><p>&lt;=&gt; <img class=\\"image_resized\\" style=\\"width:135px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682065181image.png\\"></p>","is_correct":true},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:115px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682023961image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Cho dãy số</p><p><img class=\\"image_resized\\" style=\\"width:80px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024221image.png\\"></p><p>Tính tổng&nbsp;</p><p><img class=\\"image_resized\\" style=\\"width:220px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024406image.png\\"></p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024648image.png\\"></p>","explanation":"","is_correct":false},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024730image.png\\"></p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024783image.png\\"></p>","explanation":"<p>Ta có</p><p><img class=\\"image_resized\\" style=\\"width:240px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682065503image.png\\"></p><p>Dãy số là cấp số nhân với <img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682065649image.png\\"></p><p>Ta có <img class=\\"image_resized\\" style=\\"width:150px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682065828image.png\\">lập thành dãy cấp số nhân mới với <img class=\\"image_resized\\" style=\\"width:210px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682066224image.png\\"></p><p>Nên ta có</p><p><img class=\\"image_resized\\" style=\\"width:230px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682066564image.png\\"></p><p>&nbsp;</p><p>&nbsp;</p>","is_correct":true},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682024825image.png\\"></p>","explanation":"","is_correct":false}]}]}');

/***/ }),

/***/ 74258:
/*!****************************************************************************!*\
  !*** ./apps/student/src/app/infrastructure/flashcard/sample/xac-suat.json ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"test_id":1,"learning_point_name":"Xác suất","data":[{"id":1,"content":"<p>Một công ty có 20 nhân viên, trong đó có 8 nhân viên chính thức và 7 nhân viên part-time và 5 nhân viên thực tập. Quản lý chọn ngẫu nhiên 3 người để chạy dự án. Tính xác suất để 3 người được chọn không quá 2 nhóm</p>","answers":[{"id":1,"value":"1","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021193image.png\\"></p>","explanation":"","is_correct":false},{"id":2,"value":"2","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021270image.png\\"></p>","explanation":"<p>Chọn 3 người gồm đủ 3 nhóm có số cách chọn là</p><p><img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062295image.png\\"></p><p>Chọn 3 người bất kỳ có số &nbsp;cách chọn là</p><p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062482image.png\\"></p><p>Xác xuất để 3 người được chọn được không quá 2 nhóm là</p><p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062803image.png\\"></p>","is_correct":true},{"id":3,"value":"3","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021317image.png\\"></p>","explanation":"","is_correct":false},{"id":4,"value":"4","content":"<p><img class=\\"image_resized\\" style=\\"width:18px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021354image.png\\"></p>","explanation":"","is_correct":false}]},{"id":2,"content":"<p>Một ngân hàng đề thi gồm 100 câu hỏi, mỗi đề thi có 5 câu. Một học sinh học thuộc 80 câu. Tính xác suất để học sinh đó rút ngẫu nhiên được một đề thi có 4 câu học thuộc.</p>","explanation":"<p>Chọn 5 câu từ bộ 100 câu để tạo bài thi có các cách chọn</p><p><img class=\\"image_resized\\" style=\\"width:38px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682063150image.png\\"></p><p>&nbsp;Chọn sao cho đề thi có 4 câu học sinh đã thuộc và 1 câu học sinh chưa thuộc</p><p>&nbsp;<img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682063268image.png\\"></p><p>Vậy xác suất là</p><p><img class=\\"image_resized\\" style=\\"width:60px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682063359image.png\\"></p>","answers":[{"id":5,"value":"5","content":"<p><img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021520image.png\\"></p>","explanation":"<p>Chọn 3 người gồm đủ 3 nhóm có số cách chọn là</p><p><img class=\\"image_resized\\" style=\\"width:120px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062295image.png\\"></p><p>Chọn 3 người bất kỳ có số &nbsp;cách chọn là</p><p><img class=\\"image_resized\\" style=\\"width:90px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062482image.png\\"></p><p>Xác xuất để 3 người được chọn được không quá 2 nhóm là</p><p><img class=\\"image_resized\\" style=\\"width:110px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682062803image.png\\"></p>","is_correct":true},{"id":6,"value":"6","content":"<p><img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021646image.png\\"></p>","explanation":"","is_correct":false},{"id":7,"value":"7","content":"<p><img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021709image.png\\"></p>","explanation":"","is_correct":false},{"id":8,"value":"8","content":"<p><img class=\\"image_resized\\" style=\\"width:50px;\\" src=\\"https://kyons-stg-images.s3.ap-southeast-1.amazonaws.com/1682021746image.png\\"></p>","explanation":"","is_correct":false}]}]}');

/***/ })

}]);
//# sourceMappingURL=apps_student_src_app_presentation_pages_flashcard_flashcard_component_ts.c12655271afe7ba3.js.map