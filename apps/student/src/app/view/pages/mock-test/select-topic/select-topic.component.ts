import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LearningGoal } from '@data/knowledge/learning-goal';
import { Topic } from '@data/knowledge/topic';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { TutorialComponent } from '@share-components';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TutorialComponent],
  templateUrl: './select-topic.component.html',
  styleUrls: ['./select-topic.component.scss'],
})
export class SelectTopicComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths = inject(NavigationService).paths;
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  route = inject(ActivatedRoute);
  tutorialService = inject(TutorialService);

  learningGoal!: LearningGoal;
  topics: Topic[] = [];
  checkedCount = 0;
  learningGoalId = '';
  isDoneEditing = false;
  hasError = '';
  isLoading = false;
  showTutorial = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    this.route.queryParamMap.subscribe(params => {
      if (params.get('tutorial') === 'true') {
        this.showTutorial = true;
        const { learningGoal, topics } = this.tutorialService.getLearningGoal();
        this.learningGoal = learningGoal;
        this.topics = topics;
        this.isLoading = false;
      }
      else {
        this.testService.getTopicsOfLearningGoal(this.learningGoalId).subscribe({
          next: ({ learningGoal, topics }) => {
            this.learningGoal = learningGoal;
            this.topics = topics;
            this.checkedCount = topics.filter(topic => topic.checked === true).length;
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          }
        });
      }
    });
  }

  updateCount() {
    this.checkedCount = this.topics.filter(lG => lG.checked === true).length;
  }

  // learningGoals.filter((lG)=>lG.checked===true).length===0
  submit() {
    this.isDoneEditing = true;
    if (
      this.topics.filter(lG => lG.checked === true).length < (this.learningGoal.minTopic ?? 3) ||
      this.topics.filter(lG => lG.checked === true).length > (this.learningGoal.maxTopic ?? 4)
    ) {
      return;
    }
    this.loading.show();
    this.testService
      .submitTopics(
        this.learningGoalId,
        this.topics.filter(lG => lG.checked === true).map(topic => topic.id),
      )
      .subscribe({
        next: testId => {
          this.router.navigate([this.paths.mockTestTest.path.replace(':id', testId)]);
        },
      });
  }

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }

  script1 = () => {
    this.topics[0].checked = true;
    this.topics[1].checked = true;
  };

  script2 = () => {
    this.router.navigate([this.paths.mockTestTestTutorial.path]);
  };
}
