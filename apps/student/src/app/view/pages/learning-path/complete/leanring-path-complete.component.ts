import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { NavigationService } from '@data/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view.html',
  styleUrls: ['./style.scss'],
})
export class LearningPathCompleteComponent {
  learningGoal = inject(KnowledgeService).getStudentLearningGoal();
  paths = inject(NavigationService).paths;
}
