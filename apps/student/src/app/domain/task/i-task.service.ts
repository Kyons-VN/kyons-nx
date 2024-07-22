
import { Task, TaskHistoryItem } from '@data/task/task-model';
import { Observable } from 'rxjs';

export default interface ITaskService {
  getTaskList(): Observable<Task[]>;
  redeemTask(task: Task): Observable<TaskHistoryItem>;
}
