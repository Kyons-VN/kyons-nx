import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { requestStatusDisplay } from '../../../helper/display';
import { StudentRequest } from '@infrastructure/models/student';
import { StudentService } from '@infrastructure/student.service';

export interface HelpTable {
  name: string;
  reason: string;
  index: number;
}

@Component({
  selector: 'tutor-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private studentService: StudentService) { }

  @HostBinding('class') role = 'h-full';

  studentRequests: StudentRequest[] = [];
  displayedColumns: string[] = ['index', 'name', 'reason', 'status', 'action'];
  dataSource: any[] = [];
  subscription!: Subscription;
  interval!: Subscription;

  async ngOnInit(): Promise<void> {
    this.getStudentRequests();
    const requestInterval = interval(5000);
    this.interval = requestInterval.subscribe(n => this.getStudentRequests());
  }

  getStudentRequests() {
    this.subscription = this.studentService.getRequests().subscribe({
      next: (data: StudentRequest[]) => {
        this.studentRequests = data;
      },
      complete: () => {
        this.dataSource = this.studentRequests.map((request, index) => {
          return {
            id: request.id,
            studentId: request.student.id,
            index: index,
            name: `${request.student.lastName} ${request.student.firstName}`,
            reason: request.learningPointName,
            statusDisplay: requestStatusDisplay(request.status),
            status: request.status,
            url: request.url,
            link: request.student.link,
          }
        })
      },
      error: (_) => this.interval.unsubscribe()
    });
  }

  startSession(requestId: string) {
    this.studentService.startSession(requestId).subscribe({
      next: (sessionId) => {
        return '';
      },
      complete: () => this.getStudentRequests()
    });
  }

  endSession(requestId: string, studentId: string) {
    this.studentService.endSession(requestId, studentId).subscribe({
      next: (sessionId) => {
        return '';
      },
      complete: () => this.getStudentRequests()
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.interval.unsubscribe();
  }
}
