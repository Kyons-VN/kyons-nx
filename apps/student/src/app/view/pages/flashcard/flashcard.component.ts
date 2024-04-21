import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlashcardService } from '@data/flashcard/flashcard.service';
import { QuestionsProgressComponent, TestContentComponent } from '@share-components';
import { Progress, Submission, TestContent } from '@share-utils/data';

@Component({
  standalone: true,
  imports: [CommonModule, TestContentComponent, QuestionsProgressComponent, MatTooltipModule, RouterModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  route = inject(ActivatedRoute);
  service = inject(FlashcardService);
  testContent!: TestContent;

  flashcardId!: string;
  testSubmission = new Submission();
  testProgress = new Progress();
  currentTestIndex = 0;
  showResult = false;
  title!: string;
  showWaitlistPopup = false;

  ngOnInit(): void {
    this.flashcardId = this.route.snapshot.paramMap.get('id') ?? '';
    this.testContent = this.service.getFlashcard(this.flashcardId);
    console.log(this.testContent);
    this.title = this.testContent.topicName;
    this.testProgress = Progress.from(0, this.testContent.questions.length);
  }

  updateProgress(nextProgress: Progress) {
    this.testProgress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }

  testComplete() {
    this.showWaitlistPopup = true;
  }

  handleNextQuestion() {
    if (this.showResult) { this.currentTestIndex++; this.showResult = false; } else { this.showResult = true; }
  }
}
