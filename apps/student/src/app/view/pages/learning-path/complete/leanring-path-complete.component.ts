import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LessonService } from '@data/knowledge/lesson.service';
import { NavigationService } from '@data/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view.html',
  styleUrls: ['./style.scss'],
})
export class LearningPathCompleteComponent {
  learningGoal = inject(LessonService).getStudentLearningGoal();
  paths = inject(NavigationService).paths;
}
