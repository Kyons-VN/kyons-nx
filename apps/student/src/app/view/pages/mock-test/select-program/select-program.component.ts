import { CommonModule, Location } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { LearningGoal } from '@data/knowledge/learning-goal';
import { Program } from '@data/knowledge/program';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { Subject } from '@domain/knowledge/subject/subject';
import { TutorialComponent } from '@share-components';

// enum SubmitType {
//   mock_test,
// }

const emptyProgramObject = Program.empty();
const emptyLearningGoalObject = LearningGoal.empty();
// const emptyMockTestTemplateObject = MockTestTemplate.empty();

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TutorialComponent],
  templateUrl: './select-program.component.html',
})
export class MockTestSelectProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';
  testService = inject(TestService);
  paths = inject(NavigationService).paths;
  router = inject(Router);
  knowledgeService = inject(KnowledgeService);
  location = inject(Location);
  route = inject(ActivatedRoute);
  tutorialService = inject(TutorialService);

  selectedSubject: null | Subject = null;
  emptyProgram = emptyProgramObject;
  selectedProgram = emptyProgramObject;
  emptyLearningGoal = emptyLearningGoalObject;
  selectedLearningGoal = emptyLearningGoalObject;
  subjects!: Subject[];
  programs: Program[] = [];
  learningGoals: LearningGoal[] = [];
  // mockTestTemplates: MockTestTemplate[] = [];
  hasError = '';
  isLoading = false;
  item: any;
  showTutorial = false;
  showMockTestTemplate = false;

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
          error: () => {
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
    this.selectedLearningGoal = emptyLearningGoalObject;
    this.testService.getLearningGoal(this.selectedProgram).subscribe({
      next: data => {
        this.learningGoals = data;
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
  }

  start() {
    if (this.selectedLearningGoal != emptyLearningGoalObject) {
      this.knowledgeService.selectLearningGoal(this.selectedLearningGoal);
      this.router.navigate([this.paths.mockTestSelect.path.replace(':id', this.selectedLearningGoal.id)]);
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
    this.selectedLearningGoal = emptyLearningGoalObject;
    this.learningGoals = this.tutorialService.getLearningGoals();
  };

  script3 = () => {
    this.selectedLearningGoal = this.learningGoals[0];
    this.showMockTestTemplate = false;
  };

  script4 = () => {
    // this.showMockTestTemplate = true;
    // this.mockTestTemplates = this.selectedLearningGoal.mockTestTemplates;
  };

  script5 = () => {
    // this.selectedMockTestTemplate = this.selectedLearningGoal.mockTestTemplates[0];
  };

  script6 = () => {
    this.router.navigate([this.paths.mockTestTestTutorial.path]);
  };
}
