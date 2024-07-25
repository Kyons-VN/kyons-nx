import { pick } from "lodash-es";

class KTask {
  id: string;
  category: TaskCategory;
  type: KTaskType;
  conditions: TaskCondition;
  isRedeemed: boolean;
  progress: number;
  history?: TaskHistoryItem[];
  isDaily!: boolean;
  isWeekly!: boolean;

  constructor({ id, category, type, conditions, isRedeemed, progress, history }: {
    id: string;
    category: TaskCategory;
    type: KTaskType;
    conditions: TaskCondition;
    isRedeemed: boolean;
    progress: number;
    history?: TaskHistoryItem[]
  }) {
    this.id = id;
    this.category = category;
    this.type = type;
    this.conditions = conditions;
    this.isRedeemed = isRedeemed;
    this.progress = progress;
    this.history = history;

    if (type === KTaskType.WeeklyCompleteMockTest) {
      this.isWeekly = true;
      this.isDaily = false;
    } else if (type !== KTaskType.DailyAttendanceCheck) {
      this.isDaily = true;
      this.isWeekly = false;
    }
    else {
      this.isDaily = false;
      this.isWeekly = false;
    }
  }

  static fromJson(dataObject: any): KTask {
    const _ = pick(dataObject, ['id', 'category', 'type', 'conditions', 'isRedeemed', 'progress', 'history']);
    _.isRedeemed = dataObject['redeem'] ?? false;
    _.type = dataObject['task_type'] ?? KTaskType.DailyChat;
    if (dataObject['history']) {
      _.history = (dataObject['history'] as any[]).map((data) => TaskHistoryItem.fromJson(data)) ?? [];
    }
    if (dataObject['conditions']) {
      _.conditions = TaskCondition.fromJson(dataObject['conditions']);
    }

    return new KTask(_);
  }
}

enum TaskCategory {
  Admin = 'admin',
  System = 'system'
}

// "daily_attendance_check", "daily_minimum_learning_time", "weekly_complete_mock_test", "daily_view_lesson_content", "daily_complete_lesson", "daily_correct_answer", "daily_complete_question", "daily_chat"
enum KTaskType {
  DailyAttendanceCheck = 'daily_attendance_check',
  DailyMinimumLearningTime = 'daily_minimum_learning_time',
  WeeklyCompleteMockTest = 'weekly_complete_mock_test',
  DailyViewLessonContent = 'daily_view_lesson_content',
  DailyCompleteLesson = 'daily_complete_lesson',
  DailyCorrectAnswer = 'daily_correct_answer',
  DailyCompleteQuestion = 'daily_complete_question',
  DailyChat = 'daily_chat',
}

class TaskCondition {
  rewardAmount: number;
  eligibleAmount: number;

  constructor({ rewardAmount, eligibleAmount }: { rewardAmount: number, eligibleAmount: number }) {
    this.rewardAmount = rewardAmount;
    this.eligibleAmount = eligibleAmount;
  }

  static fromJson(dataObject: any): TaskCondition {
    const _ = pick(dataObject, ['rewardAmount', 'eligibleAmount']);
    _.eligibleAmount = dataObject['eligible_amount'] ?? 0;
    _.rewardAmount = dataObject['reward_amount'] ?? 0;
    return new TaskCondition(_);
  }
}

// "id": 1,
// "task_id": 1,
// "condition_type": "weekday",
// "amount": 5,
// "created_at": "2024-07-09T11:49:54.914+07:00"
class TaskHistoryItem {
  id: string;
  taskId: string;
  conditionType: string;
  amount: number;
  createdAt: Date;
  isMonday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  isThursday: boolean;
  isFriday: boolean;
  isSaturday: boolean;
  isSunday: boolean;

  constructor({ id, taskId, conditionType, amount, createdAt }: { id: string, taskId: string, conditionType: string, amount: number, createdAt: Date }) {
    this.id = id;
    this.taskId = taskId;
    this.conditionType = conditionType;
    this.amount = amount;
    this.createdAt = createdAt;

    this.isMonday = createdAt.getDay() === 1;
    this.isTuesday = createdAt.getDay() === 2;
    this.isWednesday = createdAt.getDay() === 3;
    this.isThursday = createdAt.getDay() === 4;
    this.isFriday = createdAt.getDay() === 5;
    this.isSaturday = createdAt.getDay() === 6;
    this.isSunday = createdAt.getDay() === 0;
  }

  static fromJson(dataObject: any): TaskHistoryItem {
    const _ = pick(dataObject, ['id', 'taskId', 'conditionType', 'amount', 'createdAt']);
    _.taskId = dataObject['task_id'];
    _.conditionType = dataObject['condition_type'];
    _.createdAt = new Date(dataObject['created_at']);

    return new TaskHistoryItem(_);

  }
}

class TaskDate {
  day: WeekDay;
  isRedeemed: boolean;
  isCurrent: boolean;
  rewardAmount: number;
  isWeekend: boolean;

  constructor({ day, isRedeemed, isCurrent, rewardAmount, isWeekend }: { day: WeekDay, isRedeemed: boolean, isCurrent: boolean, rewardAmount: number, isWeekend: boolean }) {
    this.day = day;
    this.isRedeemed = isRedeemed;
    this.isCurrent = isCurrent;
    this.rewardAmount = rewardAmount;
    this.isWeekend = isWeekend;
  }

  static fromHistory(day: WeekDay, history: TaskHistoryItem | null, baseReward: number): TaskDate {
    const curr = new Date();
    // Start from Monday
    const today = (curr.getDay() + 6) % 7;
    if (history == null) {
      return new TaskDate({
        day: day,
        isRedeemed: false,
        isCurrent: day === today,
        rewardAmount: day === WeekDay.Saturday || day === WeekDay.Sunday ? baseReward * 2 : baseReward,
        isWeekend: day === WeekDay.Saturday || day === WeekDay.Sunday
      })
    }
    const createdDay = (history.createdAt.getDay() + 6) % 7;
    return new TaskDate({
      day: day,
      isRedeemed: createdDay === day,
      isCurrent: day === today,
      rewardAmount: day === WeekDay.Saturday || day === WeekDay.Sunday ? baseReward * 2 : baseReward,
      isWeekend: day === WeekDay.Saturday || day === WeekDay.Sunday
    });
  }
}

enum WeekDay {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export { KTask as Task, TaskCategory, TaskCondition, TaskDate, TaskHistoryItem, KTaskType as TaskType, WeekDay };

