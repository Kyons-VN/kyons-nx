import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '@data/order/order.service';
import { Task, TaskCategory, TaskDate, TaskType, WeekDay } from '@data/task/task-model';
import { TaskService } from '@data/task/task.service';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { interval, Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TopMenuComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, OnDestroy {
  //   return;
  // }
  // const minutes = Math.round(remainningSeconds / 60);
  // const seconds = remainningSeconds % 60;
  // this.orderCountdown = `${minutes} phút ${seconds} giây`;
  taskService = inject(TaskService);
  orderService = inject(OrderService);
  activeTab = 0;
  $interval!: Subscription;
  $tasks: Task[] = [];
  attendentTask: Task | null = null;
  systemTasks: Task[] = [];
  adminTasks: Task[] = [];
  coin$ = toSignal(this.orderService.getCoin(), {
    initialValue: -1,
  });
  redeeming = false;
  error: {
    message: string;
    error_code: number;
  } | null = null;
  week = [
    {
      name: 'Thứ Hai',
      task: TaskDate.fromHistory(WeekDay.Monday, null, 0),
    },
    {
      name: 'Thứ Ba',
      task: TaskDate.fromHistory(WeekDay.Tuesday, null, 0),
    },
    {
      name: 'Thứ Tư',
      task: TaskDate.fromHistory(WeekDay.Wednesday, null, 0),
    },
    {
      name: 'Thứ Năm',
      task: TaskDate.fromHistory(WeekDay.Thursday, null, 0),
    },
    {
      name: 'Thứ Sáu',
      task: TaskDate.fromHistory(WeekDay.Friday, null, 0),
    },
    {
      name: 'Thứ Bảy',
      task: TaskDate.fromHistory(WeekDay.Saturday, null, 0),
    },
    {
      name: 'Chủ Nhật',
      task: TaskDate.fromHistory(WeekDay.Sunday, null, 0),
    },
  ];
  tasksSubscription!: Subscription;
  redeemTaskSubscription!: Subscription;
  endDayCount = '';
  endWeekCount = '';
  TaskType = TaskType;

  @ViewChild('scrollPermanentDiv') scrollPermanentElm!: ElementRef;
  @ViewChild('scrollSeasonalDiv') scrollSeasonalElm!: ElementRef;

  ngOnInit(): void {
    this.updateTasks();
    const requestInterval = interval(1000);
    this.$interval = requestInterval.subscribe(() => {
      // Countdown to end of day
      const today = new Date();
      const hoursToEndDay = 24 - today.getHours();
      const minutesToEndDay = 60 - today.getMinutes();
      if (hoursToEndDay > 0) {
        this.endDayCount = `${hoursToEndDay} giờ ${minutesToEndDay} phút`;
      }
      else {
        this.endDayCount = `${minutesToEndDay} phút`;
      }

      // Countdown to end of week in days minutes and seconds
      const day = (today.getDay() + 6) % 7;
      const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - day));
      const remainningSeconds = (weekEnd.getTime() - today.getTime()) / 1000;
      const minutesToEndWeek = Math.round(remainningSeconds / 60);
      if (minutesToEndWeek > 24 * 60) {
        const remainningDays = Math.floor(minutesToEndWeek / (24 * 60));
        this.endWeekCount = ` ${remainningDays} ngày`;
      }
      else {
        const remainingHours = Math.floor(minutesToEndWeek / 60);
        this.endWeekCount = `${remainingHours} giờ: ${minutesToEndWeek} phú`;
      }
    });
  }

  private updateTasks() {
    this.tasksSubscription = this.taskService.getTaskList().subscribe({
      next: (res) => {
        this.attendentTask = res.filter(task => task.type === TaskType.DailyAttendanceCheck)[0];
        this.week = this.week.map(week => ({ ...week, task: TaskDate.fromHistory(week.task.day, null, this.attendentTask?.conditions.rewardAmount || 0) }));
        const history = this.attendentTask?.history;
        let historyGap = 0;
        if (history && history.length > 0) {
          history.map(task => {
            // Start from Monday
            const day = (task.createdAt.getDay() + 6) % 7;
            this.week[day].task = TaskDate.fromHistory(day, task, this.attendentTask?.conditions.rewardAmount || 0);
          });
          historyGap = history.length - 1;
        }
        const curr = new Date();
        // Start from Monday
        const today = (curr.getDay() + 6) % 7;
        // Shift week based on history length and today
        this.week = [...this.week.slice(today - historyGap), ...this.week.slice(0, today - historyGap)];
        this.systemTasks = res.filter(task => task.category === TaskCategory.System && task.type !== TaskType.DailyAttendanceCheck && !task.isRedeemed);
        this.adminTasks = res.filter(task => task.category === TaskCategory.Admin && !task.isRedeemed);
      }
    });
  }

  loadSeasonal() {
    console.log(this.activeTab);
  }
  loadPermanent() {
    console.log(this.activeTab);
  }

  ngOnDestroy(): void {
    if (this.$interval) this.$interval.unsubscribe();
    if (this.tasksSubscription) this.tasksSubscription.unsubscribe();
    if (this.redeemTaskSubscription) this.redeemTaskSubscription.unsubscribe();
  }

  previousPage(scrollElm: ElementRef) {
    scrollElm.nativeElement.scrollLeft -= 400;
  }
  nextPage(scrollElm: ElementRef) {
    scrollElm.nativeElement.scrollLeft += 400;
  }

  attend(task: TaskDate) {
    if (task.isRedeemed || !task.isCurrent || this.redeeming) return;
    this.redeeming = true;
    if (this.attendentTask) {
      this.redeemTaskSubscription = this.taskService.redeemTask(this.attendentTask).subscribe({
        next: (res) => {
          this.updateCoin();
          this.redeeming = false;
        },
        error: (error) => {
          this.error = error;
          // alert(`${error.message} Code: ${error.error_code}`);
          this.redeeming = false;
        }
      })
    }
  }

  private updateCoin() {
    this.coin$.call(this.orderService.getCoin());
  }

  redeem(task: Task) {

  }

  letgo(task: Task) {
    if (task.type === TaskType.DailyAttendanceCheck) { }
  }

}
