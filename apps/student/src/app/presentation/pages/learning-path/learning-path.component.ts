import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SERVER_API } from '@infrastructure/auth/interceptor';
import { Category } from '@infrastructure/knowledge/category';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { StudentLearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LearningGoalCategory, LearningGoalPath } from '@infrastructure/knowledge/learning-goal-path';
import { LessonItem } from '@infrastructure/knowledge/lesson';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { OrderService } from '@infrastructure/order/order.service';
import { MockTestItem } from '@infrastructure/test/test-content';
import { TestService } from '@infrastructure/test/test.service';
import { UserService } from '@infrastructure/user/user.service';
import { MockTestStatus } from '@share-utils/domain';
// import { MockTestStatus } from '@share-utils/domain';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Subscription, interval } from 'rxjs';

@Component({
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit, OnDestroy, AfterViewInit {
  paths = inject(NavigationService).paths;
  lessonService = inject(LessonService);
  userType = inject(UserService).getUserType();
  // selectedProgram: Program;
  selectedStudentLearningGoal!: StudentLearningGoal;
  selectedCategoryId!: string;
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  http = inject(HttpClient);
  constructor(
    userService: UserService,
    private knowledgeService: KnowledgeService,
    private router: Router,
    private orderService: OrderService
  ) {
    // this.selectedProgram = knowledgeService.getSelectedProgram();
  }
  // route = inject(ActivatedRoute);

  @HostBinding('class') class = 'h-full';

  learingPathError = false;
  scrollDistance = 0;
  lessons: LessonItem[] = [];
  processing = true;
  interval!: Subscription;
  isCompleted = false;
  categories: Category[] = [];
  learningGoalCategory = LearningGoalCategory.empty();
  learningGoalPath = LearningGoalPath.empty();
  nextStep = false;
  // unCompletedCategories: LearningGoalCategory[] = [];
  completeStep = false;
  subscriptionExpired = false;
  showSubscriptionExpired = false;
  mockTests: MockTestItem[] = [];
  lessonBlockOf3OnMDScreen: number[] = [];
  lessonBlockOf2OnXSScreen: number[] = [];
  blockOf3 = [0, 1, 2];
  blockOf2 = [0, 1];
  showWhatIsProbabilityIndex = false;
  showWhatIsMockTest = false;
  probabilityIndex?: number;

  isLoadingResults = true;
  isRateLimitReached = false;
  dataSource: MatTableDataSource<MockTestItem> = new MatTableDataSource<MockTestItem>([]);
  get selectedCategoryIdMod() {
    return this.selectedCategoryId;
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Điểm số',
        backgroundColor: '#06A5FF',
        borderColor: '#06A5FF',
        borderWidth: 6,
        pointBackgroundColor: '#06A5FF',
        pointBorderColor: 'transparent',
        fill: 'origin',
        pointStyle: 'circle',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        title: {
          display: true,
          text: 'Điểm số',
          color: '#64748B',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        position: 'left',
        grid: {
          color: '#334155',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Bài KT',
          color: '#64748B',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        max: 10,
        min: 0,
        ticks: {
          color: '#FFFFFF',
        },
      },
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    },
  };
  showActivateLearningPathBtn = false;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('myCanvas') canvas!: ElementRef;

  // const ELEMENT_DATA: MockTestItem[] = [];

  // set selectedCategoryIdMod(newValue) {
  //   this.selectedCategoryId = newValue;
  //   this.learningGoalCategory = this.learningGoalPath.getLearningGoalCategoryById(this.selectedCategoryId);
  //   this.lessons = this.learningGoalCategory.lessons;
  //   this.knowledgeService.selectCategoryId(this.selectedCategoryId);

  //   this.scrollToEndOfLessons();
  // }

  // @ViewChild('widgetsWrapper', { read: ElementRef })
  // public widgetsWrapper!: ElementRef<any>;

  ngOnInit(): void {
    this.selectedStudentLearningGoal = this.knowledgeService.getStudentLearningGoal();
    this.selectedCategoryId = this.knowledgeService.getSelectedCategoryId();
    if (this.selectedStudentLearningGoal.isEmpty()) {
      this.router.navigate([this.paths.home.path]);
      return;
    }
    const requestInterval = interval(5000);
    this._getLearningPathData();
    this.interval = requestInterval.subscribe(() => this._getLearningPathData());

    this.testService.getProbabilityIndex({ learningGoalId: this.selectedStudentLearningGoal.id }).subscribe({
      next: result => {
        this.probabilityIndex = result;
      },
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = 'Trang kế';
    this.paginator._intl.previousPageLabel = 'Trang trước';
    this.paginator._intl.itemsPerPageLabel = 'Mỗi trang hiện:';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} trong ${length}`;
    };
  }

  _getLearningPathData() {
    this.lessonService.getLearningGoalMockTest(this.selectedStudentLearningGoal.id).subscribe({
      next: (mockTests: MockTestItem[]) => {
        this.mockTests = mockTests;
        this.dataSource = new MatTableDataSource(mockTests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.lineChartData.datasets[0].data = mockTests.map(x => x.score ?? 0);
        this.lineChartData.labels = mockTests.map(x => ((x.index ?? 0) + 1).toString());
        const gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, 'rgba(6, 165, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(6, 165, 255, 0)');
        this.lineChartData.datasets[0].backgroundColor = gradient;
        this.chart?.update();
        if (mockTests.length == 1) {
          if (mockTests[0].status == MockTestStatus.active) {
            this.router.navigate([this.paths.mockTestTest.path.replace(':id', mockTests[0].id)]);
            return;
          } else if (mockTests[0].status == MockTestStatus.learning_path_received) {
            this.showActivateLearningPathBtn = true;
          } else {
            this.showActivateLearningPathBtn = false;
          }
        } else {
          this.showActivateLearningPathBtn = false;
        }
        this.lessonService.getList(this.selectedStudentLearningGoal.id).subscribe({
          next: (learningGoalPath: LearningGoalPath) => {
            this.learningGoalPath = learningGoalPath;
            this.lessons = this.learningGoalPath.lessonCategories[0].lessons;
            // if (this.lessons[this.lessons.length - 1].isNew) {
            //   setTimeout(() => {
            //     this.lessons.push(LessonItem.waiting());
            //   }, 5000);
            // }
            // else {
            //   this.lessons.push(LessonItem.complete());
            // }
            const totalLessonBlockOf3OnMDScreen = Math.ceil((this.lessons.length + 1) / 3);
            this.lessonBlockOf3OnMDScreen = Array.from(Array(totalLessonBlockOf3OnMDScreen).keys());
            const totalLessonBlockOf2OnXSScreen = Math.ceil((this.lessons.length + 1) / 2);
            this.lessonBlockOf2OnXSScreen = Array.from(Array(totalLessonBlockOf2OnXSScreen).keys());
          },
          error: err => {
            if (err.error == undefined || err.error.error_code == undefined) {
              // this.learingPathError = true;
              return;
            }
            if (err.error.error_code == 'NewUser') {
              this.router.navigate([this.paths.newUser.path]);
              return;
            }
          },
        });

        return;
      },
      error: err => {
        this.learingPathError = true;
      },
    });
    this.testService.getProbabilityIndex({ learningGoalId: this.selectedStudentLearningGoal.id }).subscribe({
      next: result => {
        this.probabilityIndex = result;
      },
      error: err => {
        this.learingPathError = true;
      },
    });
  }

  activateLearningPath() {
    this.loading.show();
    this.http.get(SERVER_API + `/students/gifts/request_free_subscription`).subscribe({
      next: () => {
        this.lessonService.activateLearningPath(this.mockTests[0].id).subscribe({
          next: () => {
            this.loading.hide();
          },
          error: e => {
            console.log(e);
            this.loading.hide();
          },
        });
      },
      error: e => {
        console.log(e);
        this.lessonService.activateLearningPath(this.mockTests[0].id).subscribe({
          next: () => {
            this.loading.hide();
          },
          error: e => {
            console.log(e);
            this.loading.hide();
          },
        });
      },
    });
  }

  scrollToEndOfLessons() {
    //   setTimeout(() => {
    //     this.widgetsWrapper.nativeElement.scrollTo({
    //       left: this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44,
    //     });
    //   }, 500);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: WheelEvent) {
    // if (this.detectTouchPad(event)) {
    //   this.scrollDistance += event.deltaX;
    //   return;
    // }
    // if (event.deltaY > 0) this.scrollRight(event.deltaY);
    // else this.scrollLeft(event.deltaY);
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
    } else if (e.deltaMode === 0) {
      isTouchPad = true;
    }
    return isTouchPad;
  }

  onCategoryChange(newValue: string) {
    this.selectedCategoryId = newValue;
    this.learningGoalCategory = this.learningGoalPath.getLearningGoalCategoryById(this.selectedCategoryId);
    this.lessons = this.learningGoalCategory.lessons;
  }

  // showNextStep() {
  //   this.unCompletedCategories = this.learningGoalPath.getUncompletedLearningGoalCategories();
  //   this.nextStep = true;
  // }

  goToLesson(lesson: LessonItem) {
    if (lesson.isNew && this.subscriptionExpired) {
      this.showSubscriptionExpired = true;
    } else {
      this.router.navigate([this.paths.lessonPage.path, lesson.id]);
    }
  }

  goToMockTest(mockTestId: string) {
    this.router.navigate([this.paths.mockTestResult.path.replace(':id', mockTestId)], {
      queryParams: { learning_goal_id: this.selectedStudentLearningGoal.id },
    });
  }
}
