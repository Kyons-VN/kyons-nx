import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LearningGoal } from '@data/knowledge/learning-goal';
import { Topic } from '@data/knowledge/topic';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  learningGoal!: LearningGoal;
  topics: Topic[] = [];
  checkedCount = 0;
  learningGoalId = '';
  isDoneEditing = false;
  hasError = '';

  ngOnInit(): void {
    this.learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    this.testService.getTopicsOfLearningGoal(this.learningGoalId).subscribe({
      next: ({ learningGoal, topics }) => {
        this.learningGoal = learningGoal;
        this.topics = topics;
        this.checkedCount = topics.filter(topic => topic.checked === true).length;
      },
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
}
