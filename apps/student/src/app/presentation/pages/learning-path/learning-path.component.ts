import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { KnowledgeService } from '../../../infrastructure/knowledge/knowledge.service';
import { LearningPath, LessonItem } from '../../../infrastructure/knowledge/lesson';
import { LessonService } from '../../../infrastructure/knowledge/lesson.service';
import { Program } from '../../../infrastructure/knowledge/program';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { UserService } from '../../../infrastructure/user/user.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss'],
})
export class LearningPathComponent implements OnInit, OnDestroy {
  paths: AppPath;
  userType: string;
  selectedProgram: Program;
  constructor(
    private lessonService: LessonService,
    navService: NavigationService,
    userService: UserService,
    knowledgeService: KnowledgeService,
    private router: Router
  ) {
    this.paths = navService.paths;
    this.userType = userService.getUserType();
    this.selectedProgram = knowledgeService.getSelectedProgram();
  }

  @HostBinding('class') class = 'h-full';

  scrollDistance = 0;
  lessons: LessonItem[] = [];
  dataSource: any[] = [];
  loading = true;
  interval!: Subscription;
  isCompleted = false;

  @ViewChild('widgetsWrapper', { read: ElementRef })
  public widgetsWrapper!: ElementRef<any>;

  ngOnInit(): void {
    if (this.selectedProgram.isEmpty()) {
      this.router.navigate([this.paths.home]);
      return;
    }
    const requestInterval = interval(5000);
    this.getList();
    this.interval = requestInterval.subscribe(() => this.getList());
  }

  getList() {
    let willUpdate = true;
    this.lessonService.getList(this.selectedProgram).subscribe({
      next: (learningPath: LearningPath) => {
        if (learningPath.lessonList.length > 0) {
          const length = learningPath.lessonList.length;
          if (
            this.lessons.length == length &&
            this.lessons[length - 1].isNew == learningPath.lessonList[length - 1].isNew
          ) {
            willUpdate = false;
            return;
          }
          this.lessons = learningPath.lessonList;
        }
        if (learningPath.isCompleted) {
          // willUpdate = false;
          // this.router.navigate([this.paths.finalExam, learningPath.program.id]);
          this.isCompleted = true;
          return;
        }
      },
      complete: () => {
        if (!willUpdate) return;
        this.loading = false;
        setTimeout(() => {
          this.widgetsWrapper.nativeElement.scrollTo({
            left: this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44,
          });
        }, 500);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.detectTouchPad(event)) {
      this.scrollDistance += event.deltaX;
      return;
    }
    if (event.deltaY > 0) this.scrollRight(event.deltaY);
    else this.scrollLeft(event.deltaY);
    console.log(this.scrollDistance);
  }

  public scrollRight(deltaY: number = window.innerWidth - 300): void {

    let newScroll = this.widgetsWrapper.nativeElement.scrollLeft + 300 + deltaY;
    if (newScroll > this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44) {
      newScroll = this.widgetsWrapper.nativeElement.scrollWidth - this.widgetsWrapper.nativeElement.clientWidth + 44;
    }

    this.widgetsWrapper.nativeElement.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });

  }

  public scrollLeft(deltaY: number = -window.innerWidth + 300): void {
    let newScroll = this.widgetsWrapper.nativeElement.scrollLeft - 300 + deltaY;
    if (newScroll < - 44) {
      newScroll = -44;
    }

    this.widgetsWrapper.nativeElement.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }

  detectTouchPad(e: any): boolean {
    let isTouchPad = false;
    if (e.wheelDeltaY) {
      if (Math.abs(e.wheelDeltaY) !== 120) {
        isTouchPad = true;
      }
    }
    else if (e.deltaMode === 0) {
      isTouchPad = true;
    }
    return isTouchPad;
  }
}

