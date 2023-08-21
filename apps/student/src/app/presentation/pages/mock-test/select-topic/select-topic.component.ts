import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Topic } from '@infrastructure/knowledge/topic';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { AppPaths } from '@presentation/routes';

@Component({
  templateUrl: './select-topic.component.html',
  styleUrls: ['./select-topic.component.scss'],
})
export class SelectTopicComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPaths;
  // program: Program;
  selectedLearningGoal: LearningGoal;
  constructor(
    private route: ActivatedRoute,
    navService: NavigationService,
    private testService: TestService,
    private knowledgeService: KnowledgeService,
    private loading: LoadingOverlayService,
    private router: Router
  ) {
    this.paths = navService.paths;
    // this.program = knowledgeService.getSelectedProgram();
    this.learningGoalId = knowledgeService.getSelectedLearningGoal().id;
    this.selectedLearningGoal = knowledgeService.getSelectedLearningGoal();
  }

  topics: Topic[] = [];
  checkedCount = 0;
  learningGoalId = '';
  isDoneEditing = false;

  ngOnInit(): void {
    this.learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    this.testService.getTopicsOfLearningGoal(this.learningGoalId).subscribe({
      next: (topics: Topic[]) => {
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
      this.topics.filter(lG => lG.checked === true).length < (this.selectedLearningGoal.minTopic ?? 3) ||
      this.topics.filter(lG => lG.checked === true).length > (this.selectedLearningGoal.maxTopic ?? 4)
    ) {
      return;
    }
    this.loading.show();
    this.testService
      .submitTopics(
        this.learningGoalId,
        this.topics.filter(lG => lG.checked === true).map(topic => topic.id),
        // TODO: Fix hardcode
        ''
      )
      .subscribe({
        next: testId => {
          this.router.navigate([this.paths.mockTestTest.path.replace(':id', testId)]);
        },
      });
  }
}
