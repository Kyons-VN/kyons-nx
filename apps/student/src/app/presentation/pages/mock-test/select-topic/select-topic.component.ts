import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
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
  program: Program;
  selectedTarget: LearningGoal;
  constructor(
    private route: ActivatedRoute,
    navService: NavigationService,
    private testService: TestService,
    private knowledgeService: KnowledgeService,
    private loading: LoadingOverlayService,
    private router: Router,
  ) {
    this.paths = navService.paths;
    this.program = knowledgeService.getSelectedProgram();
    this.learningGoalId = knowledgeService.getSelectedLearningGoal().id;
    this.selectedTarget = knowledgeService.getSelectedLearningGoal();
  }

  topics: Topic[] = [];
  checkedCount = 0;
  learningGoalId = '';

  ngOnInit(): void {
    this.learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    this.testService.getTopicsOfLearningGoal(this.learningGoalId).subscribe({
      next: (topics: Topic[]) => {
        this.topics = topics;
        this.checkedCount = topics.filter((topic) => topic.checked === true).length;
      },
    });
  }

  updateCount() {
    this.checkedCount = this.topics.filter((lG) => lG.checked === true).length;
  }

  // learningGoals.filter((lG)=>lG.checked===true).length===0
  submit() {
    if (this.topics.filter((lG) => lG.checked === true).length < (this.selectedTarget.minTopic ?? 3) || this.topics.filter((lG) => lG.checked === true).length > (this.selectedTarget.maxTopic ?? 4)) {
      return;
    }
    this.loading.show();
    this.testService.submitTopics(this.learningGoalId, this.topics.filter((lG) => lG.checked === true).map((topic) => topic.id)).subscribe({
      next: (learningGoal) => {
        this.loading.hide();
        this.knowledgeService.selectLearningGoad(learningGoal);
        this.router.navigate([this.paths.mockTestTest.path.replace(':id', learningGoal.id)]);
      },
    });
  }
}
