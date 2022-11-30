import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@infrastructure/knowledge/category';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LearningGoalCategory, LearningGoalPath } from '@infrastructure/knowledge/learning-goal-path';
import { LessonItem } from '@infrastructure/knowledge/lesson';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { Program } from '@infrastructure/knowledge/program';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { UserService } from '@infrastructure/user/user.service';
import { AppPath } from '@presentation/routes';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit, OnDestroy {
  paths: AppPath;
  userType: string;
  selectedProgram: Program;
  selectedLearningGoal: LearningGoal;
  selectedCategoryId: string;
  constructor(
    private lessonService: LessonService,
    navService: NavigationService,
    userService: UserService,
    private knowledgeService: KnowledgeService,
    private router: Router,
    private loading: LoadingOverlayService,
  ) {
    this.paths = navService.paths;
    this.userType = userService.getUserType();
    this.selectedProgram = knowledgeService.getSelectedProgram();
    this.selectedLearningGoal = knowledgeService.getSelectedLearningGoal();
    this.selectedCategoryId = knowledgeService.getSelectedCategoryId();
  }

  @HostBinding('class') class = 'h-full';

  scrollDistance = 0;
  lessons: LessonItem[] = [];
  dataSource: any[] = [];
  processing = true;
  interval!: Subscription;
  isCompleted = false;
  categories: Category[] = [];
  learningGoalCategory = LearningGoalCategory.empty();
  learningGoalPath = LearningGoalPath.empty();
  nextStep = false;
  unCompletedCategories: LearningGoalCategory[] = [];
  completeStep = false;

  get selectedCategoryIdMod() {
    return this.selectedCategoryId;
  }

  set selectedCategoryIdMod(newValue) {
    console.log(newValue);
    this.selectedCategoryId = newValue;
    this.learningGoalCategory = this.learningGoalPath.getLearningGoalCategoryById(this.selectedCategoryId);
    this.lessons = this.learningGoalCategory.lessons;
    this.knowledgeService.selectCategoryId(this.selectedCategoryId);

    this.scrollToEndOfLessons();
  }

  @ViewChild('widgetsWrapper', { read: ElementRef })
  public widgetsWrapper!: ElementRef<any>;

  ngOnInit(): void {
    if (this.selectedProgram.isEmpty()) {
      this.router.navigate([this.paths.home]);
      return;
    }
    // const requestInterval = interval(5000);
    this._getLlearningGoalPath();
    // this.interval = requestInterval.subscribe(() => this.getList());
  }

  _getLlearningGoalPath() {
    this.lessonService.getList(this.selectedProgram, this.selectedLearningGoal).subscribe({
      next: (learningGoalPath: LearningGoalPath | Error) => {
        if (learningGoalPath instanceof Error) {
          if (learningGoalPath.message == 'new_user') {
            console.log('new_user');
            this.router.navigate([this.paths.newUser]);
          }
        }
        else {
          this.learningGoalPath = learningGoalPath;
          this.categories = this.learningGoalPath.getCategories();
          const categoryIds = this.categories.map((c) => c.id);
          if (categoryIds.includes(this.selectedCategoryId)) {
            this.selectedCategoryIdMod = this.selectedCategoryId;
          }
          else {
            this.selectedCategoryId = this.categories[0].id;
          }
          this.learningGoalCategory = this.learningGoalPath.getLearningGoalCategoryById(this.selectedCategoryId);
          this.lessons = this.learningGoalCategory.lessons;
          // if (learningGoalPath.lessonList.length > 0) {
          //   const length = learningGoalPath.lessonList.length;
          //   if (
          //     this.lessons.length == length &&
          //     this.lessons[length - 1].isNew == learningGoalPath.lessonList[length - 1].isNew
          //   ) {
          //     willUpdate = false;
          //     return;
          //   }
          //   this.lessons = learningGoalPath.lessonList;
          // }
          // if (learningGoalPath.progress == 100) {
          // this.router.navigate([this.paths.finalExam, learningPath.program.id]);
          // this.isCompleted = true;
          // return;
          // }
          // else {
          this.processing = false;
          this.scrollToEndOfLessons();
          // }
        }
      },
      error: (err) => {
        this.processing = false;
        // TODO: Define error resposes
        console.log(err);
      },
    });
  }

  scrollToEndOfLessons() {
    setTimeout(() => {
      this.widgetsWrapper.nativeElement.scrollTo({
        left: this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44,
      });
    }, 500);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.detectTouchPad(event)) {
      this.scrollDistance += event.deltaX;
      return;
    }
    if (event.deltaY > 0) this.scrollRight(event.deltaY);
    else this.scrollLeft(event.deltaY);
    console.log(this.scrollDistance);
  }

  public scrollRight(deltaY: number = window.innerWidth - 300): void {

    let newScroll = this.widgetsWrapper.nativeElement.scrollLeft + 300 + deltaY;
    if (newScroll > this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44) {
      newScroll = this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44;
    }

    this.widgetsWrapper.nativeElement.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });

  }

  public scrollLeft(deltaY: number = -window.innerWidth + 300): void {
    let newScroll = this.widgetsWrapper.nativeElement.scrollLeft - 300 + deltaY;
    if (newScroll < - 44) {
      newScroll = -44;
    }

    this.widgetsWrapper.nativeElement.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }

  detectTouchPad(e: any): boolean {
    let isTouchPad = false;
    if (e.wheelDeltaY) {
      if (Math.abs(e.wheelDeltaY) !== 120) {
        isTouchPad = true;
      }
    }
    else if (e.deltaMode === 0) {
      isTouchPad = true;
    }
    return isTouchPad;
  }

  onCategoryChange(newValue: string) {
    console.log(newValue);
    this.selectedCategoryId = newValue;
    this.learningGoalCategory = this.learningGoalPath.getLearningGoalCategoryById(this.selectedCategoryId);
    this.lessons = this.learningGoalCategory.lessons;
  }

  showNextStep() {
    this.unCompletedCategories = this.learningGoalPath.getUncompletedLearningGoalCategories();
    this.nextStep = true;
  }

}

