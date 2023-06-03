import { CommonModule, Location } from '@angular/common';
import { Component, HostBinding, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from '@domain/subject/subject';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { TutorialService } from '@infrastructure/tutorials/tutorial-service';
import { TutorialComponent } from '@share-components';

enum SubmitType {
  mock_test,
}

const emptyProgramObject = Program.empty();
const emptyLearningGoalObject = LearningGoal.empty();

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TutorialComponent],
  templateUrl: './select-program.component.html',
})
export class MockTestSelectProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';
  @Input() type = SubmitType.mock_test;
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  router = inject(Router);
  knowledgeService = inject(KnowledgeService);
  location = inject(Location);
  loading = inject(LoadingOverlayService);
  route = inject(ActivatedRoute);
  tutorialService = inject(TutorialService);

  selectedSubject: null | Subject = null;
  emptyProgram = emptyProgramObject;
  selectedProgram = emptyProgramObject;
  emptyLearningGoal = emptyLearningGoalObject;
  selectedTarget = emptyLearningGoalObject;
  subjects!: Subject[];
  programs: Program[] = [];
  targets: LearningGoal[] = [];
  hasError = '';
  isLoading = false;
  item: any;
  showTutorial = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParamMap.subscribe(params => {
      if (params.get('tutorial') === 'true') {
        this.showTutorial = true;
        this.subjects = this.tutorialService.getSubjects();
        this.isLoading = false;
      } else {
        this.knowledgeService.getSubjects().subscribe({
          next: data => {
            this.subjects = data;
            this.isLoading = false;
          },
          error: err => {
            this.hasError = 'Có lỗi, vui lòng thử lại';
            this.isLoading = false;
          },
        });
      }
    });
  }

  back() {
    this.location.back();
  }

  changeSubject() {
    this.programs = this.selectedSubject?.programs ?? [];
    this.selectedProgram = emptyProgramObject;
  }

  changeProgram() {
    this.selectedTarget = emptyLearningGoalObject;
    this.testService.getLearningGoal(this.selectedProgram).subscribe({
      next: data => {
        this.targets = data;
        //
      },
      error: err => {
        if (err.error_code == 'RanOutMockTest') {
          this.hasError = 'RanOutMockTest';
        } else {
          this.hasError = 'Có lỗi, vui lòng thử lại';
        }
      },
    });
    // this.orderService.getInventories().subscribe({
    //   next: (inventory: Inventory) => {
    //     if (inventory.mockTest > 0) {
    //     }
    //     else {
    //       this.hasError = 'LowBalance';
    //     }
    //   },
    //   error: (err) => {
    //     // TODO: Define error resposes
    //     this.hasError = 'Có lỗi, vui lòng thử lại';
    //   }
    // });
  }

  submit() {
    if (this.selectedProgram != null) {
      this.isLoading = true;
      this.loading.show();
      this.knowledgeService.selectProgram(this.selectedProgram);
      this.knowledgeService.selectLearningGoal(this.selectedTarget);
      if (this.type == SubmitType.mock_test) {
        if (this.selectedTarget.canSelectTopic) {
          this.router.navigate([this.paths.mockTestSelect.path.replace(':id', this.selectedTarget.id)]);
        } else {
          this.testService.submitTopics(this.selectedTarget.id, []).subscribe({
            next: testId => {
              this.isLoading = false;
              this.router.navigate([this.paths.mockTestTest.path.replace(':id', testId)]);
            },
            error: err => {
              this.isLoading = false;
              this.loading.hide();
              this.hasError = err.error_code;
            },
          });
        }
      }
    }
  }

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }

  script1 = () => {
    this.selectedSubject = this.subjects[0];
    this.changeSubject();
  };

  script2 = () => {
    this.selectedProgram = this.programs[0];
    this.selectedTarget = emptyLearningGoalObject;
    this.targets = this.tutorialService.getLearningGoals();
  };

  script3 = () => {
    this.selectedTarget = this.targets[0];
  };

  script4 = () => {
    this.router.navigate([this.paths.mockTestTestTutorial.path]);
  };
}
