import { fromEvent, Subscription } from 'rxjs';
import { ISubmission, ITestContent } from './domain';

interface IProgress {
  value: number;
  label: string;
  total: number;
  next(): void;
}

function initTestKeyboardEvent({
  isActive,
  testContent,
  submission,
  progress,
  currentIndex,
  completeCallback,
}: {
  isActive: () => boolean;
  testContent: ITestContent;
  submission: ISubmission;
  progress: IProgress;
  currentIndex: { value: number };
  completeCallback: () => void;
}): Subscription {
  return fromEvent<KeyboardEvent>(document, 'keydown').subscribe({
    next: e => {
      console.log(e.key);
      if (!isActive()) return;

      const question = testContent.questions[currentIndex.value];
      const answers = question.answers;
      const currentSubmitDataLength = Object.keys(submission.submitData).length;
      if (['1', '2', '3', '4'].includes(e.key)) {
        submission.submitData[question.id] = answers[parseInt(e.key) - 1].id;

        if (currentSubmitDataLength != Object.keys(submission.submitData).length) {
          progress.next();
        }
      }
      if (e.key == ' ') {
        if (currentSubmitDataLength == testContent.questions.length) {
          completeCallback();
        } else {
          if (progress.value > currentIndex.value) {
            currentIndex.value++;
          }
        }
      }
    },
  });
}

export { initTestKeyboardEvent, IProgress };

