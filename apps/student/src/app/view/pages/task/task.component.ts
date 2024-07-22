import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Task } from '@data/task/task-model';
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
  service = inject(TaskService);
  activeTab = 0;
  timeCountdown = '';
  $interval!: Subscription;
  $tasks: Task[] = [];

  ngOnInit(): void {
    // this.service.getTaskList().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   }
    // });
    const requestInterval = interval(1000);
    this.$interval = requestInterval.subscribe(() => {

      // const remainningSeconds = Math.round((order.createdAt.getTime() + 10 * 60 * 1000 - (new Date()).getTime()) / 1000);
      // if (remainningSeconds < -3) {
      //   this.backToHistory();
      //   return;
      // }
      // const minutes = Math.round(remainningSeconds / 60);
      // const seconds = remainningSeconds % 60;
      // this.orderCountdown = `${minutes} phút ${seconds} giây`;
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
  }

}
