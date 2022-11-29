import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StudentTest } from '@infrastructure/models/student';
import { StudentService } from '@infrastructure/student.service';

export interface LearningPathTable {
  name: string;
  point: string;
  learningLevel: string;
  index: number;
}

@Component({
  selector: 'tutor-latest-tests',
  templateUrl: './latest-tests.component.html',
  styleUrls: ['./latest-tests.component.scss']
})
export class LatestTestsComponent implements OnInit, OnDestroy {
  constructor(private studentService: StudentService) { }

  displayedColumns: string[] = ['index', 'name', 'score', 'learningLevel', 'action'];
  dataSource: Array<any> = [];
  studentTests: StudentTest[] = [];
  subscription!: Subscription;
  interval!: Subscription;

  ngOnInit(): void {
    this.getLatestTests();
    const requestInterval = interval(5000);
    this.interval = requestInterval.subscribe(n => this.getLatestTests());
  }

  getLatestTests() {
    this.subscription = this.studentService.getLatestTests().subscribe({
      next: (data) => {
        this.studentTests = data;
      },
      complete: () => {
        this.dataSource = this.studentTests.map((test, index) => {
          return {
            id: test.id,
            student_id: test.student.id,
            index: index,
            name: `${test.student.lastName} ${test.student.firstName}`,
            score: test.score,
          }
        })
      },
      error: () => this.interval.unsubscribe()
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.interval.unsubscribe();
  }
}
