import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { StudentLearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import { LoadingComponent } from '@presentation/share-components/loading/loading.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, NgCircleProgressModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paths: AppPaths = inject(NavigationService).paths;
  knowledgeService: KnowledgeService = inject(KnowledgeService);
  router: Router = inject(Router);
  route = inject(ActivatedRoute);

  @HostBinding('class') class = 'h-full';

  learnings: StudentLearningGoal[] = [];
  stats = ['Speed', 'Accuracy', 'Deligence', 'Quantity', 'Combo'];
  statsBW = this.stats.map(stat => stat + ' BW');
  over = new Array(this.stats.length).fill(false);
  activeStat = 0;
  isLoading = false;
  showWhatIsStats = false;
  showSubmenu = false;

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.knowledgeService.getStudentLearningGoals().subscribe({
      next: learningGoals => {
        this.learnings = learningGoals;
        this.isLoading = false;
        if (this.route.snapshot.queryParams['learning_goal_id'] !== undefined) {
          console.log('goto');

          const selectedLearningGoal = this.learnings.filter(
            learning => learning.id === this.route.snapshot.queryParams['learning_goal_id']
          )[0];
          if (selectedLearningGoal) {
            this.knowledgeService.selectStudentLearningGoal(selectedLearningGoal);
            this.router.navigate([this.paths.learningPath.path]);
          }
        }
      },
      error: error => {
        // TODO: Define error resposes
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  selectProgram(program: Program) {
    this.knowledgeService.selectProgram(program);
    this.router.navigate([this.paths.learningPath.path]);
  }

  selectLearningGoal(learningGoal: StudentLearningGoal) {
    this.knowledgeService.selectStudentLearningGoal(learningGoal);
    this.router.navigate([this.paths.learningPath.path]);
  }
  goToLastestLearningGoal() {
    this.knowledgeService.selectStudentLearningGoal(this.learnings[0]);
    this.router.navigate([this.paths.learningPath.path]);
  }
}
