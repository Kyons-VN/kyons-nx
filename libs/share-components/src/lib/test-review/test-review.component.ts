import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { answerPrefixes, QuestionReview } from '@share-utils/data';
import { InputRadioComponent, LatexComponent } from '../..';

interface Review {
  topic: string;
  isOpen: boolean;
}

@Component({
  standalone: true,
  selector: 'kyonsvn-test-review',
  imports: [CommonModule, LatexComponent, InputRadioComponent],
  templateUrl: './test-review.component.html',
  styleUrls: ['./test-review.component.scss'],
})
export class TestReviewComponent {

  @Input() reviewRenderObject!: Review[];
  @Input() questions!: QuestionReview[];
  @Input() currentQuestionIndex!: number;

  answerPrefixes = answerPrefixes;

  // ngOnInit(): void {
  //   this.reviewRenderObject = this.reviewRenderObject.map(review => {
  //     review.isOpen = false;
  //     return review;
  //   });
  // }
}
