import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import { DBHelper } from '@data/helper/helper';
import { LearningGoal, StudentLearningGoal } from '@data/knowledge/learning-goal';
import { Subject } from '@domain/knowledge/subject/subject';
import { Exercise, MockTest, QuestionReview, TestContent, TestReviewHtml, Topic } from '@share-utils/data';
import { catchError } from 'rxjs';
import { LearningPath, LessonGroup } from '../knowledge/lesson';
import { MockTestItem } from '../test/test-content';
import learningPath from './data/12_response_get_lesson.json';
import learningPath2 from './data/12_response_get_lesson_2.json';
import mickTestItems from './data/13_response_get_mock_test.json';
import lessonDetail from './data/14_response_get_lesson_details.json';
import exercises from './data/15_response_get_practice_test_question.json';
import resultHtml from './data/17_response_submit_incorrect_practice_test.json';
import studentLearningGoals from './data/1_response_get_learning_goal.json';
import subjects from './data/1_response_get_subjects.json';
import learningGoal from './data/3_response_get_topics.json';
import mockTest from './data/4_response_get_mock_test_question.json';
import mockTestResult from './data/7_response_get_mock_test_details.json';
import probabilitiIndex from './data/8_response_get_probability_index.json';
import probabilitiIndex2 from './data/8_response_get_probability_index_2.json';
import mockTestReview from './data/9_response_review_mock_test.json';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) { }

  completeTutorial() {
    return this.http
      .put(`${serverApi()}/users/update_info`, { app_tour_completed: true })
      .pipe(catchError(DBHelper.handleError('GET update_info', [])));
  }
  getLearningGoalLessons2(): LearningPath {
    return LearningPath.fromJson(learningPath2);
  }
  getProbabilityIndex2(): number {
    return probabilitiIndex2.data;
  }
  submitExercise() {
    const data = (resultHtml['data'] as any[]).map((questionObject: any) => {
      return QuestionReview.fromJson(questionObject);
    });
    return data[0];
  }
  getExercise(): Exercise {
    return Exercise.fromJson(exercises);
  }
  getDetail(): LessonGroup {
    return LessonGroup.fromJson('tutorial', lessonDetail);
  }
  getLearningGoalLessons(): LearningPath {
    return LearningPath.fromJson(learningPath);
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
  getMockTestResult(): MockTest {
    return MockTest.fromJson(mockTestResult);
  }
  getSelectedLearningGoal(): LearningGoal {
    return LearningGoal.fromJson(studentLearningGoals[0]);
  }
  getMockTest(): TestContent {
    return TestContent.fromJson(mockTest['data']);
  }
  getStudentLearningGoals() {
    return studentLearningGoals.map((json: any) => StudentLearningGoal.fromJson(json));
  }
  getSubjects() {
    return subjects.map((json: any) => Subject.fromJson(json));
  }
  getLearningGoals() {
    return studentLearningGoals.map((json: any) => LearningGoal.fromJson(json));
  }
  getLearningGoal(): { learningGoal: LearningGoal, topics: Topic[] } {
    return { learningGoal: LearningGoal.fromJson(learningGoal), topics: learningGoal['topics'].map((json: any) => Topic.fromJson(json)) };
  }
  getProbabilityIndex() {
    return probabilitiIndex.data;
  }
}
