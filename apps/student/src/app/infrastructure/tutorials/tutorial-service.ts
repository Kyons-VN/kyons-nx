import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@domain/subject/subject';
import { serverApi } from '@infrastructure/auth/interceptor';
import { DBHelper } from '@infrastructure/helper/helper';
import { LearningGoal, StudentLearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LearningGoalPath } from '@infrastructure/knowledge/learning-goal-path';
import { Exercise, MockTestResult, TestContent, TestReviewHtml } from '@share-utils/data';
import { catchError } from 'rxjs';
import { LessonGroup } from '../knowledge/lesson';
import { MockTestItem } from '../test/test-content';
import learningGoalPath from './data/12_response_get_lesson.json';
import learningGoalPath2 from './data/12_response_get_lesson_2.json';
import mickTestItems from './data/13_response_get_mock_test.json';
import lessonDetail from './data/14_response_get_lesson_details.json';
import exercises from './data/15_response_get_practice_test_question.json';
import resultHtml from './data/17_response_submit_incorrect_practice_test.json';
import studentLearningGoals from './data/1_response_get_subject.json';
import mockTest from './data/4_response_get_mock_test_question.json';
import mockTestResult from './data/7_response_get_mock_test_details.json';
import probabilitiIndex from './data/8_response_get_probability_index.json';
import probabilitiIndex2 from './data/8_response_get_probability_index_2.json';
import mockTestReview from './data/9_response_review_mock_test.json';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  completeTutorial() {
    return this.http
      .put(`${serverApi()}/users/update_info`, { app_tour_completed: true })
      .pipe(catchError(DBHelper.handleError('GET update_info', [])));
  }
  getLearningGoalLessons2(): LearningGoalPath {
    return LearningGoalPath.fromJson(learningGoalPath2);
  }
  getProbabilityIndex2(): number {
    return probabilitiIndex2.data;
  }
  submitExercise() {
    return resultHtml.data;
  }
  getExercise(): Exercise {
    return Exercise.fromJson(exercises);
  }
  getDetail(): LessonGroup {
    return LessonGroup.fromJson('tutorial', lessonDetail);
  }
  getLearningGoalLessons(): LearningGoalPath {
    return LearningGoalPath.fromJson(learningGoalPath);
  }
  getLearningGoalMockTest(): import('../test/test-content').MockTestItem[] {
    return mickTestItems['data'].map((item: any, i: number) => MockTestItem.fromJson(item, i));
  }
  getStudentLearningGoal(): StudentLearningGoal {
    return StudentLearningGoal.fromJson(studentLearningGoals[0]);
  }
  getMockTestReview() {
    return TestReviewHtml.fromJson(mockTestReview);
  }
  getMockTestResult(): import('@share-utils/data').MockTestResult {
    return MockTestResult.fromJson(mockTestResult);
  }
  getSelectedLearningGoal(): LearningGoal {
    return LearningGoal.fromJson(studentLearningGoals[0]);
  }
  getMockTest(): import('@share-utils/data').TestContent {
    return TestContent.fromJson(mockTest);
  }
  getStudentLearningGoals() {
    return studentLearningGoals.map((json: any) => StudentLearningGoal.fromJson(json));
  }
  getSubjects() {
    return studentLearningGoals.map((json: any) => Subject.fromJson(json));
  }
  getLearningGoals() {
    return studentLearningGoals.map((json: any) => LearningGoal.fromJson(json));
  }
  getProbabilityIndex() {
    return probabilitiIndex.data;
  }
}
