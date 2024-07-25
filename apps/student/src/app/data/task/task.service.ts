import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import ITaskService from '@domain/task/i-task.service';
import { map, Observable } from 'rxjs';
import { Task, TaskHistoryItem } from './task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements ITaskService {
  http = inject(HttpClient);

  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(`${serverApi()}/api/v2/users/tasks`).pipe(
      // catchError(DBHelper.handleError('GET getTaskList', [])),
      map((res: any) => {
        if (res.data === undefined) return [];
        // res = {
        //   "data": [
        //     {
        //       "id": 1,
        //       "category": "system",
        //       "task_type": "daily_attendance_check",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": true,
        //       "progress": 0,
        //       "history": [
        //         {
        //           "id": 1,
        //           "task_id": 1,
        //           "condition_type": "weekday",
        //           "amount": 5,
        //           "created_at": "2024-07-21T14:55:16.495+07:00"
        //         },
        //         {
        //           "id": 2,
        //           "task_id": 1,
        //           "condition_type": "weekday",
        //           "amount": 5,
        //           "created_at": "2024-07-22T14:55:16.495+07:00"
        //         },
        //         {
        //           "id": 3,
        //           "task_id": 1,
        //           "condition_type": "weekday",
        //           "amount": 5,
        //           "created_at": "2024-07-23T14:55:16.495+07:00"
        //         },
        //         {
        //           "id": 4,
        //           "task_id": 1,
        //           "condition_type": "weekday",
        //           "amount": 5,
        //           "created_at": "2024-07-24T14:55:16.495+07:00"
        //         }
        //       ]
        //     },
        //     {
        //       "id": 2,
        //       "category": "system",
        //       "task_type": "daily_minimum_learning_time",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 3,
        //       "category": "system",
        //       "task_type": "weekly_complete_mock_test",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 4,
        //       "category": "system",
        //       "task_type": "daily_view_lesson_content",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 5,
        //       "category": "system",
        //       "task_type": "daily_complete_lesson",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 6,
        //       "category": "system",
        //       "task_type": "daily_correct_answer",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 7,
        //       "category": "system",
        //       "task_type": "daily_complete_question",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     },
        //     {
        //       "id": 8,
        //       "category": "system",
        //       "task_type": "daily_chat",
        //       "conditions": {
        //         "reward_amount": 5,
        //         "eligible_amount": 10
        //       },
        //       "redeem": false,
        //       "progress": 0
        //     }
        //   ]
        // }
        return res.data.map((item: any) => Task.fromJson(item));
      })
    );
  }
  redeemTask(task: Task): Observable<TaskHistoryItem> {
    return this.http.post(`${serverApi()}/api/v2/users/tasks/${task.id}/redeem`, {}).pipe(
      map((res: any) => TaskHistoryItem.fromJson(res.data))
    )
  }

}
