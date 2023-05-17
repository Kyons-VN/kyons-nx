import { TestResult } from '@share-utils/data';
import { Observable } from 'rxjs';

export interface ITestService {
  getMockTestResult(mockTestId: string, learningGoalId: string): Observable<TestResult>;
}
