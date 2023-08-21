import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderBySAPipe, SafeHtmlPipe } from '@share-pipes';
import { Question, Submission, answerPrefixes } from '@share-utils/data';
import { InputRadioComponent } from '../input-radio/input-radio.component';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'kyonsvn-question',
  standalone: true,
  imports: [CommonModule, InputRadioComponent, OrderBySAPipe, SafeHtmlPipe, TutorialComponent, FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() showResult = false;
  @Input() onChange!: void;
  answerPrefixes = answerPrefixes;
  conponentId = '';
  @Input() submission!: Submission;

  ngOnInit(): void {
    this.conponentId = new Date().getTime().toString();
  }
}
