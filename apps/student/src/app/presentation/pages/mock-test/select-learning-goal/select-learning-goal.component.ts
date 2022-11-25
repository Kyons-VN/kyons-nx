import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import LearningGoal from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
import { TestService } from '@infrastructure/test/test.service';
import { LoadingOverlayService } from '../../../../infrastructure/loading-overlay.service';
import { NavigationService } from '../../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../../routes';

@Component({
  templateUrl: './select-learning-goal.component.html',
  styleUrls: ['./select-learning-goal.component.scss'],
})
export class SelectLearningGoalComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  program: Program;
  constructor(
    private route: ActivatedRoute,
    navService: NavigationService,
    private testService: TestService,
    knowledgeService: KnowledgeService,
    private loading: LoadingOverlayService,
  ) {
    this.paths = navService.paths;
    this.program = knowledgeService.getSelectedProgram();
  }

  learningGoals: LearningGoal[] = [];

  ngOnInit(): void {
    console.log('init MockTestSelectTopicComponent');
    // this.testService.getTopicsFromLearningGoal(this.program).subscribe({
    //   next: (learningGoals: LearningGoal[]) => {
    //     this.learningGoals = learningGoals.map((lg) => { lg.checked = true; return lg; });
    //   },
    // });
  }
  submit() {
    // this.testService.submitLearningGoals(this.program, this.learningGoals).subscribe({
    //   next: () => {
    //     this.learningGoals = learningGoals.map((lg) => { lg.checked = true; return lg; });
    //   },
    // });
  }
}
