import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chat, Content, Mana, TextPart } from '@data/chat/chat-model';
import { ChatService } from '@data/chat/chat.service';
import { KnowledgeService } from '@data/knowledge/knowledge.service';
import { StudentLearningGoal } from '@data/knowledge/learning-goal';
import { Lesson } from '@data/knowledge/lesson';
import { LessonService } from '@data/knowledge/lesson.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { TestService } from '@data/test/test.service';
import { ThemeService } from '@data/theme/theme.service';
import { UserService } from '@data/user/user.service';
import { maxManaWidth, Role } from '@domain/chat/i-content';
import { ExerciseContentComponent, LatexComponent, QuestionsProgressComponent } from '@share-components';
import { SafeHtmlPipe, SafeResourceUrlSAPipe } from '@share-pipes';
import { Exercise, Progress, Question, QuestionReview, Submission } from '@share-utils/data';
import { isCommand } from '@utils/chat';
import { ChatboxComponent } from '@view/share-components/chat/chatbox.component';
import { MessagesComponent } from '@view/share-components/chat/messages.component';
import { TrackingLessonComponent } from '@view/share-components/tracking/tracking-lesson.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExerciseContentComponent,
    QuestionsProgressComponent,
    MatTooltipModule,
    SafeHtmlPipe,
    TrackingLessonComponent,
    LatexComponent,
    ChatboxComponent,
    MessagesComponent,
    SafeResourceUrlSAPipe,
  ],
  templateUrl: './lesson-page.component.html',
})
export class LessonPageComponent implements OnInit {
  paths = inject(NavigationService).paths;
  knowledgeService = inject(KnowledgeService);
  lessonService = inject(LessonService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  themeService = inject(ThemeService);
  chatService = inject(ChatService);
  userId = inject(UserService).getUserId();
  sanitizer = inject(DomSanitizer);

  learningGoal!: StudentLearningGoal;
  exercise = Exercise.empty();
  submission = new Submission();
  showIncomplete = false;
  ignoreIncomplete = false;
  lessonId = '';
  question = Question.empty();
  questionReview: QuestionReview | null = null;
  progress = Progress.from(0, 100);
  progressStr = '';
  showLesson = false;
  showChatbot = false;
  lesson: Lesson = Lesson.empty();
  showComplete = false;
  isSubmitting = false;
  // currentForm!: HTMLFormElement;
  isCompleted = false;
  isOutOfSubscription = false;
  currentTestIndex = 0;
  stars = [0];
  emptyStars = [0, 0, 0];
  manaWidth = maxManaWidth;
  batteryLife = 100;
  currentChat: Chat | null = null;
  messages: Content[] = [];
  isThinking = false;
  content!: string;
  shouldViewLesson = false;
  shouldChat = false;

  @ViewChild('exerciseElm') exerciseElm!: ElementRef;
  @ViewChild('scrollTopElm') scrollTopElm!: ElementRef;
  @ViewChild('contentElm') contentElm!: ElementRef;

  ngOnInit(): void {
    this.content = this.lessonService.getContent();
    // this.content = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/11uI4QQW2pDwAJXOjFALjC-5xaIojGGxq/preview');
    // this.content = 'https://drive.google.com/file/d/11uI4QQW2pDwAJXOjFALjC-5xaIojGGxq/preview';
    this.loading.show();
    this.learningGoal = this.knowledgeService.getStudentLearningGoal();
    this.lessonId = this.route.snapshot.params['id'];
    // this.lessonService.getDetail(this.lessonId).subscribe({
    //   next: result => {
    //     this.lesson = result;
    //   },
    // });
    this._getQuestion();
  }

  _getQuestion() {
    this.isSubmitting = true;
    this.testService.getExercise(this.learningGoal.id, this.route.snapshot.params['id']).subscribe({
      next: (exercise: Exercise) => {
        this.exercise = exercise;
        this.question = exercise.questions[0];
        this.stars = Array.from(Array(this.question.level ?? 0).keys());
        this.emptyStars = Array.from(Array(3 - (this.question.level ?? 0)).keys());
        // this.progress.value = exercise.progress ?? 0;
        // this.progressStr = (exercise.progress ?? 0).toFixed(2);
        this.submission.testId = this.exercise.id;
        this.loading.hide();
        setTimeout(() => {
          this.scrollTopElm.nativeElement.scrollTop = 0;
          this.scrollTopElm.nativeElement.scrollLeft = 0;
          this.isSubmitting = false;
        }, 2000);
      },
      error: e => {
        console.log(e);
        this.loading.hide();
        if (e.error_code == 'CompletedLesson') {
          // this.progress.value = 100;
          // this.progressStr = '100.00';
          this.showComplete = true;
        } else if (e.error_code == 'OutOfSubscription') {
          this.isOutOfSubscription = true;
        }
        this.isSubmitting = false;
      },
    });
  }

  // updateProgress(nextProgress: Progress) {
  //   this.progress = nextProgress;
  // }

  updateSubmission(nextSubmission: Submission) {
    this.submission.submitData = nextSubmission.submitData;
  }

  testComplete() {
    if (this.isSubmitting) return;
    const records: HTMLFormElement[] = this.exerciseElm.nativeElement.querySelectorAll('form');
    const data = new FormData(records[0]);
    const result = data.get('objective_type_select');
    console.log(result);
    if (!this.submission.hasAnswer(this.exercise.questions[0].id)) {
      this.showIncomplete = true;
      return;
    } else {
      this.isSubmitting = true;
      console.log('testComplete');
      // this.currentForm.querySelectorAll('input[type="radio"]').forEach((input, index) => {
      //   input.setAttribute('disabled', 'disabled');
      // });
      this.lessonService.submitExercise(this.learningGoal.id, this.lessonId, this.submission).subscribe({
        next: (res: any) => {
          console.log(res);
          // this.progress.value = result['lesson_percentage'];
          // this.progressStr = (result['lesson_percentage'] as number).toFixed(2);
          this.questionReview = QuestionReview.fromJson(res['data'][0]);
          if (res['status'] == 'normal') {
            // this.isCompleted = true;
          }
          else if (res['status'] == 'lesson') {
            this.shouldViewLesson = true;
          }
          else if (res['status'] == 'chatbot') {
            this.shouldChat = true;
          }


          this.isSubmitting = false;
          this.scrollTopElm.nativeElement.scrollTop = 0;
          this.scrollTopElm.nativeElement.scrollLeft = 0;
        },
        error: () => {
          this.isSubmitting = false;
        },
      });
    }
  }

  nextQuestion() {
    if (this.isCompleted) {
      this.showComplete = true;
      return;
    }
    // this.currentForm.querySelectorAll('input[type="radio"]').forEach(input => {
    //   input.removeAttribute('disabled');
    // });
    // this.currentForm.reset();
    this.submission = new Submission();
    this.questionReview = null;
    this._getQuestion();
    this.chatService.resetLessonChat(this.userId, this.lessonId).subscribe({
      next: () => {
        this.messages = [];
      }
    });
  }

  submitIncomplete() {
    this.testComplete();
    this.showIncomplete = false;
  }

  updateMana() {
    this.chatService.getMana(this.userId).subscribe({
      next: (mana: Mana) => {
        this.manaWidth = Math.floor(maxManaWidth * mana.value / mana.max);
        this.batteryLife = Math.floor(mana.value / mana.max * 100);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  sendMessage(message: string) {
    this.isThinking = true;
    let context = '';
    context = this.question.toString() + (this.questionReview?.explanation ? '\nLời giải: ' + this.questionReview?.explanation : '');
    if (!isCommand(context)) this.messages = [...this.messages, new Content(Role.user, [new TextPart(message)], new Date())];
    this.chatService.sendMessage(this.userId, this.lessonId, message, context).subscribe({
      next: () => {
        // if (errorMessage.length > 0) {
        //   this.messages = errorMessage;
        // }
        // else {
        this.updateMessages();
        this.updateMana();
        this.isThinking = false;
        // }
        // this.messages = messages;

      },
      error: (err) => {
        console.error(err);
        if (err.error === 'Not enough mana') {
          this.messages = [...this.messages, Content.outOfMana()]
        }
        this.isThinking = false;
      },
    });
    // }
    // else {
    //   this.chatService.startChat(this.userId, context + message).subscribe({
    //     next: () => {
    //       this.isThinking = false;
    //       this.updateMessages();
    //       this.updateMana();
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       if (err.error === 'Not enough mana') {
    //         this.messages = [...this.messages, Content.outOfMana()]
    //       }
    //       this.isThinking = false;
    //     },
    //   });
    // }
  }

  updateMessages() {
    this.chatService.getMessages(this.userId, this.lessonId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isThinking = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateThinking(isThinking: boolean) {
    this.isThinking = isThinking;
  }

  openChat() {
    this.showChatbot = true; this.updateMessages(); this.updateMana();
  }

  option1() {
    this.sendMessage('Phân tích chi tiết câu hỏi thuộc thể loại toán nào, cần thông tin gì để giải quyết câu hỏi này?');
  }
  option2() {
    const rightAnswer = this.questionReview?.answers.find((answer) => answer.id == this.questionReview?.correctAnswer);
    this.sendMessage('Giải thích ' + (this.questionReview != null ? 'vì sao đáp án ' + rightAnswer?.content + ' là đáp án đúng?' : ''));
  }
}
