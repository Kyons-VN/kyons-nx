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
import { LessonItem } from '../../../infrastructure/knowledge/lesson';
import { LessonService } from '../../../infrastructure/knowledge/lesson.service';
import { Program } from '../../../infrastructure/knowledge/program';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { UserService } from '../../../infrastructure/user/user.service';
import { AppPath } from '../../routes';

@Component({
  selector: 'student-learning-path',
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
      next: (data: LessonItem[]) => {
        if (data.length > 0) {
          const length = data.length;
          if (
            this.lessons.length == length &&
            this.lessons[length - 1].isNew == data[length - 1].isNew
          ) {
            willUpdate = false;
            return;
          }
          this.lessons = data;
        }
      },
      complete: () => {
        if (!willUpdate) return;
        this.loading = false;
        setTimeout(() => {
          this.scrollDistance =
            this.lessons.length * (256 + 24) + 48 - window.innerWidth;

          if (
            this.lessons.length === 0 ||
            !this.lessons[this.lessons.length - 1].isNew
          ) {
            this.scrollDistance += 256 + 24;
          }
          this.widgetsWrapper.nativeElement.scrollTo({
            left: this.scrollDistance,
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
    if (event.deltaY > 0) this.scrollRight();
    else this.scrollLeft();
  }

  public scrollRight(): void {
    if (
      this.widgetsWrapper.nativeElement.scrollLeft >
      this.lessons.length * (256 + 24) - window.innerWidth
    )
      return;
    this.scrollDistance = this.widgetsWrapper.nativeElement.scrollLeft + 500;

    this.widgetsWrapper.nativeElement.scrollTo({
      left: this.widgetsWrapper.nativeElement.scrollLeft + 500,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.scrollDistance = this.widgetsWrapper.nativeElement.scrollLeft - 500;

    this.widgetsWrapper.nativeElement.scrollTo({
      left: this.widgetsWrapper.nativeElement.scrollLeft - 500,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }
}
