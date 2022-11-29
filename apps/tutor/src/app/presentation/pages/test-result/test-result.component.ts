import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, TestContent } from '@infrastructure/models/test-content';
import { StudentService } from '@infrastructure/student.service';

@Component({
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  testId!: string;
  testContent: Question[] = [];
  selectedAnswers: string[] = ['1', '3'];
  rightAnswers: string[] = ['1', '4'];

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id') || '';
    this.studentService.getTest(this.testId).subscribe({
      next: (testContent: TestContent) => {
        this.selectedAnswers = testContent.selectedAnswers;
        this.rightAnswers = testContent.rightAnswers;
        this.testContent = testContent.content;
      }
    });
  }

  getResultColor(answerId: string): string {
    if (this.selectedAnswers.includes(answerId) && this.rightAnswers.includes(answerId)) return 'green';
    if (this.selectedAnswers.includes(answerId) && !this.rightAnswers.includes(answerId)) return 'red';
    if (!this.selectedAnswers.includes(answerId) && this.rightAnswers.includes(answerId)) return 'blue';
    return '';
  }
}
