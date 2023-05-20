import { Location } from '@angular/common';
import { Component, HostBinding, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '@domain/subject/subject';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';

enum SubmitType {
  mock_test,
}

const emptyProgramObject = Program.empty();
const emptyLearningGoalObject = LearningGoal.empty();

@Component({
  selector: 'student-class-program',
  templateUrl: './class-program.component.html',
  styleUrls: ['./class-program.component.scss'],
})
export class ClassProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';
  @Input() type = SubmitType.mock_test;
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  router = inject(Router);
  knowledgeService = inject(KnowledgeService);
  location = inject(Location);
  loading = inject(LoadingOverlayService);

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

  ngOnInit(): void {
    this.knowledgeService.getSubjects().subscribe({
      next: data => {
        this.subjects = data;
      },
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
}
