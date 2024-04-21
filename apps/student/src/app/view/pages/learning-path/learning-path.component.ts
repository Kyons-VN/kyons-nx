import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '@data/knowledge/category';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { StudentLearningGoal } from '@data/knowledge/learning-goal';
import { LearningGoalCategory, LearningGoalPath } from '@data/knowledge/learning-goal-path';
import { LessonItem } from '@data/knowledge/lesson';
import { LessonService } from '@data/knowledge/lesson.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { MockTestItem } from '@data/test/test-content';
import { TestService } from '@data/test/test.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { UserService } from '@data/user/user.service';
import { TutorialComponent } from '@share-components';
import { MockTestStatus } from '@share-utils/domain';
import { ChartConfiguration } from 'chart.js';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import { serverApi } from '@data/auth/interceptor';
import { Subscription, interval } from 'rxjs';
import { MaterialModule } from '../../../material.module';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TutorialComponent, NgCircleProgressModule, MaterialModule, NgChartsModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit, OnDestroy, AfterViewInit {
  paths = inject(NavigationService).paths;
  lessonService = inject(LessonService);
  userService = inject(UserService);
  userType = this.userService.getUserType();
  selectedStudentLearningGoal!: StudentLearningGoal;
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  http = inject(HttpClient);
  knowledgeService = inject(KnowledgeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  tutorialService = inject(TutorialService);

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
  hasNewMockTest = false;
  shouldScrollBottom = true;
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
    },
  };
  showActivateLearningPathBtn = false;
  MockTestStatus = MockTestStatus;
  activeTab = parseInt(this.route.snapshot.queryParams['active_tab'] ?? '0');
  showTutorial = false;
  tutorialPart = 0;
  scriptElements: HTMLElement[] = [];
  scriptXsElements: HTMLElement[] = [];
  showCompleteTutorial = false;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('scrollBottomElm') scrollBottomElm!: ElementRef;
  @ViewChild('scrollBottomXSElm') scrollBottomXSElm!: ElementRef;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('tutorial') == '1') {
        this.showTutorial = true;
        this.selectedStudentLearningGoal = this.tutorialService.getStudentLearningGoal();
        this.probabilityIndex = this.tutorialService.getProbabilityIndex();
        this.mockTests = this.tutorialService.getLearningGoalMockTest();
        this.learningGoalPath = this.tutorialService.getLearningGoalLessons();
        this.lessons = this.learningGoalPath.lessonCategories[0].lessons;
        this._updateLessonsData();
        setTimeout(() => {
          this._updateMockTestData(this.mockTests);
          const lessonElm = new ElementRef(document.getElementById(`lesson-${this.lessons[0].id}`));
          const lessonXsElm = new ElementRef(document.getElementById(`lessonXs-${this.lessons[0].id}`));
          if (lessonElm && lessonElm.nativeElement) this.scriptElements.push(lessonElm.nativeElement);
          if (lessonXsElm && lessonXsElm.nativeElement) this.scriptXsElements.push(lessonXsElm.nativeElement);
          this.tutorialPart = 1;
        }, 200);
      } else if (params.get('tutorial') == '2') {
        this.showTutorial = true;
        this.selectedStudentLearningGoal = this.tutorialService.getStudentLearningGoal();
        this.probabilityIndex = this.tutorialService.getProbabilityIndex2();
        this.mockTests = this.tutorialService.getLearningGoalMockTest();
        this.learningGoalPath = this.tutorialService.getLearningGoalLessons2();
        this.lessons = this.learningGoalPath.lessonCategories[0].lessons;
        this._updateLessonsData();
        setTimeout(() => {
          this._updateMockTestData(this.mockTests);
          const lessonElm = new ElementRef(document.getElementsByClassName('finish-block')[0] as HTMLElement);
          lessonElm.nativeElement.setAttribute(
            'data-tooltip-content',
            'Bạn hãy hoàn tất lộ trình học của mình để khám phá điều bất ngờ khi nhấn vào ô cuối cùng này nhé!'
          );
          lessonElm.nativeElement.setAttribute('data-tooltip-position', 'bottom');
          if (lessonElm && lessonElm.nativeElement) this.scriptElements.push(lessonElm.nativeElement);
          const lessonXsElm = new ElementRef(document.getElementsByClassName('finish-blockXs')[0] as HTMLElement);
          lessonXsElm.nativeElement.setAttribute(
            'data-tooltip-content',
            'Bạn hãy hoàn tất lộ trình học của mình để khám phá điều bất ngờ khi nhấn vào ô cuối cùng này nhé!'
          );
          lessonXsElm.nativeElement.setAttribute('data-tooltip-position', 'bottom');
          if (lessonXsElm && lessonXsElm.nativeElement) this.scriptXsElements.push(lessonXsElm.nativeElement);
          this.tutorialPart = 2;
        }, 200);
      } else {
        this.selectedStudentLearningGoal = this.knowledgeService.getStudentLearningGoal();
        // this.selectedCategoryId = this.knowledgeService.getSelectedCategoryId();
        if (this.selectedStudentLearningGoal.isEmpty()) {
          this.router.navigate([this.paths.home.path]);
          return;
        }
        this._getLearningPathData();
        const requestInterval = interval(5000);
        this.interval = requestInterval.subscribe(() => this._getLearningPathData());

        this.testService.getProbabilityIndex({ learningGoalId: this.selectedStudentLearningGoal.id }).subscribe({
          next: result => {
            this.probabilityIndex = result;
          },
        });
      }
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

  _updateMockTestData(mockTests: MockTestItem[]) {
    this.hasNewMockTest = mockTests.some(x => x.status == MockTestStatus.active);
    this.dataSource = new MatTableDataSource(mockTests.filter(x => x.status != MockTestStatus.active));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.lineChartData.datasets[0].data = mockTests.map(x => x.score ?? 0);
    this.lineChartData.labels = mockTests.map(x => ((x.index ?? 0) + 1).toString());
    const gradient = this.chartCanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 600);
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
  }

  _updateLessonsData() {
    const totalLessonBlockOf3OnMDScreen = Math.ceil((this.lessons.length + 1) / 3);
    this.lessonBlockOf3OnMDScreen = Array.from(Array(totalLessonBlockOf3OnMDScreen).keys());
    const totalLessonBlockOf2OnXSScreen = Math.ceil((this.lessons.length + 1) / 2);
    this.lessonBlockOf2OnXSScreen = Array.from(Array(totalLessonBlockOf2OnXSScreen).keys());
    setTimeout(() => {
      if (this.scrollBottomElm == undefined) return;
      this.scrollBottomElm.nativeElement.scrollTop = this.scrollBottomElm.nativeElement.scrollHeight;
      this.scrollBottomXSElm.nativeElement.scrollTop = this.scrollBottomXSElm.nativeElement.scrollHeight;
    }, 500);
  }

  _getLearningPathData() {
    this.lessonService.getLearningGoalMockTest(this.selectedStudentLearningGoal.id).subscribe({
      next: (mockTests: MockTestItem[]) => {
        this.mockTests = mockTests;
        this._updateMockTestData(mockTests);
        this.lessonService.getList(this.selectedStudentLearningGoal.id).subscribe({
          next: (learningGoalPath: LearningGoalPath) => {
            this.learningGoalPath = learningGoalPath;
            this.lessons = this.learningGoalPath.lessonCategories[0].lessons;
            this._updateLessonsData();
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
        console.log(err);
        this.learingPathError = true;
      },
    });
    this.testService.getProbabilityIndex({ learningGoalId: this.selectedStudentLearningGoal.id }).subscribe({
      next: result => {
        this.probabilityIndex = result;
      },
      error: err => {
        console.log(err);
        this.learingPathError = true;
      },
    });
  }

  activateLearningPath() {
    this.loading.show();
    this.http.get(`${serverApi()}/students/gifts/request_free_subscription`).subscribe({
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

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }

  goToMockTest(mockTest: MockTestItem) {
    if (mockTest.status == MockTestStatus.active) {
      this.router.navigate([this.paths.mockTestTest.path.replace(':id', mockTest.id)]);
    } else {
      this.router.navigate([this.paths.mockTestResult.path.replace(':id', mockTest.id)], {
        queryParams: { learning_goal_id: this.selectedStudentLearningGoal.id },
      });
    }
  }

  onLessonBlockClick(lesson: LessonItem) {
    if (lesson.isNew) {
      this.router.navigate([this.paths.lessonPage.path.replace(':id', lesson.id)]);
    } else {
      this.router.navigate([this.paths.lessonReviewPage.path.replace(':id', lesson.id)]);
    }
  }

  onLastLessonBlockClick() {
    if (this.learningGoalPath.isCompleted()) {
      this.router.navigate([this.paths.learningPathComplete.path]);
    }
  }

  filterCallback(mockTest: MockTestItem) {
    return mockTest.status == MockTestStatus.active;
  }

  skip() {
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }

  script1 = () => {
    this.router.navigate([this.paths.lessonPageTutorial.path]);
  };

  script2 = () => {
    this.showCompleteTutorial = true;
    this.showTutorial = false;
  };

  completeTutorial(willGoHome = true) {
    if (willGoHome) this.loading.show();
    this.tutorialService.completeTutorial().subscribe({
      next: () => {
        this.userService.setForceCompleteTutorial(false);
        this.loading.hide();
        if (willGoHome) this.router.navigate([this.paths.home.path], { replaceUrl: true });
        else {
          window.open(this.paths.home.path, '_blank');
        }
      },
      error: err => {
        console.log(err);
        this.loading.hide();
      },
    });
  }
}
