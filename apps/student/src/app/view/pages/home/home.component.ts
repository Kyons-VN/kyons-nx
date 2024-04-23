import { CommonModule } from '@angular/common';
import { Component, HostBinding, Injector, OnDestroy, OnInit, effect, inject, runInInjectionContext } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { StudentLearningGoal } from '@data/knowledge/learning-goal';
import { NavigationService } from '@data/navigation/navigation.service';
import { ThemeService } from '@data/theme/theme.service';
import { TutorialService } from '@data/tutorials/tutorial-service';
import { TutorialComponent } from '@share-components';
import { AppPaths } from '@view/routes';
import { LoadingComponent } from '@view/share-components/loading/loading.component';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Subscription } from 'rxjs';
import { RightMenuComponent } from './right-menu/right-menu.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, NgCircleProgressModule, TutorialComponent, TopMenuComponent, RightMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  paths: AppPaths = inject(NavigationService).paths;
  knowledgeService: KnowledgeService = inject(KnowledgeService);
  router: Router = inject(Router);
  route = inject(ActivatedRoute);
  tutorialService = inject(TutorialService);
  injector = inject(Injector);
  themeService = inject(ThemeService);

  @HostBinding('class') class = 'h-full';

  learnings: StudentLearningGoal[] = [];
  stats = ['Speed', 'Accuracy', 'Deligence', 'Quantity', 'Combo'];
  statsBW = this.stats.map(stat => stat + ' BW');
  over = new Array(this.stats.length).fill(false);
  activeStat = 0;
  isLoading = false;
  showWhatIsStats = false;
  showSubmenu = false;
  showTutorial = false;
  interval!: Subscription;
  theme = this.themeService.getTheme();
  showAll = false;

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.route.queryParamMap.subscribe(params => {
      if (params.get('tutorial') === 'true') {
        this.learnings = this.tutorialService.getStudentLearningGoals();
        this.showTutorial = true;
        this.isLoading = false;
      } else {
        // const requestInterval = interval(5000);
        // this.interval = requestInterval.subscribe(() => this._getStudentLearningGoalsData());
        this._getStudentLearningGoalsData();
      }
    });

    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
      });
    });
  }

  _getStudentLearningGoalsData() {
    this.knowledgeService.getStudentLearningGoals().subscribe({
      next: learningGoals => {
        if (
          learningGoals.length > 0 &&
          (this.learnings.length != learningGoals.length ||
            this.learnings[this.learnings.length - 1].progress !=
            learningGoals[learningGoals.length - 1].progress)
        ) {
          this.learnings = learningGoals;
        }
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

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }

  selectLearningGoal(learningGoal: StudentLearningGoal) {
    this.knowledgeService.selectStudentLearningGoal(learningGoal);
    this.router.navigate([this.paths.learningPath.path]);
  }

  goToLastestLearningGoal() {
    this.knowledgeService.selectStudentLearningGoal(this.learnings[0]);
    this.router.navigate([this.paths.learningPath.path]);
  }

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path]).then(() => {
      window.location.reload();
    });
  }

  script = () => {
    this.showTutorial = false;
    this.router.navigate([this.paths.mockTest.path], { queryParams: { tutorial: true } });
  };
}
