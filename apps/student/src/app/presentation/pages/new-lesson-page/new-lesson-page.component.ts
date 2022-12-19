import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningPoint } from '@infrastructure/knowledge/lesson';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { Program } from '@infrastructure/knowledge/program';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import { uniq } from 'lodash-es';

@Component({
  selector: 'student-new-lesson-page',
  templateUrl: './new-lesson-page.component.html',
  styleUrls: ['./new-lesson-page.component.scss'],
})
export class NewLessonPageComponent implements OnInit {
  learningPoints!: LearningPoint[];
  selectedLearningPointIds: string[] = [];
  paths: AppPaths;
  selectedProgram: Program;
  constructor(
    private router: Router,
    private lessonService: LessonService,
    navService: NavigationService,
    knowledgeService: KnowledgeService
  ) {
    this.paths = navService.paths;
    this.selectedProgram = knowledgeService.getSelectedProgram();
  }
  ngOnInit(): void {
    this.lessonService.getLearningPoint(this.selectedProgram).subscribe({
      next: (learningPoints: LearningPoint[]) => {
        this.learningPoints = learningPoints;
      },
    });
  }

  select(id: string) {
    this.selectedLearningPointIds.push(id);
    this.selectedLearningPointIds = uniq(this.selectedLearningPointIds);
  }

  deselect(id: string) {
    this.selectedLearningPointIds.splice(
      this.selectedLearningPointIds.indexOf(id),
      1
    );
  }

  submit() {
    this.lessonService
      .createLesson(
        this.selectedProgram,
        this.selectedLearningPointIds.map((id) => Number(id))
      )
      .subscribe({
        complete: () => {
          this.router.navigate([this.paths.learningPath.path]);
        },
      });
  }
}
