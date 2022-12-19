import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '@domain/subject/subject';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Program } from '@infrastructure/knowledge/program';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { OrderService } from '@infrastructure/order/order.service';
import { TestService } from '@infrastructure/test/test.service';
import { AppPaths } from '@presentation/routes';

enum SubmitType {
  mock_test
}

const emptyProgramObject = Program.empty();
const emptyLearningGoalObject = LearningGoal.empty();

@Component({
  selector: 'student-class-program',
  templateUrl: './class-program.component.html',
  styleUrls: ['./class-program.component.scss'],
})
export class ClassProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';
  @Input() type = SubmitType.mock_test;

  paths: AppPaths;
  constructor(
    private router: Router,
    navService: NavigationService,
    private knowledgeService: KnowledgeService,
    private orderService: OrderService,
    private testService: TestService
  ) {
    this.paths = navService.paths;
  }

  selectedSubject: null | Subject = null;
  emptyProgram = emptyProgramObject;
  selectedProgram = emptyProgramObject;
  emptyLearningGoal = emptyLearningGoalObject;
  selectedTarget = emptyLearningGoalObject;
  subjects!: Subject[];
  programs: Program[] = [];
  targets: LearningGoal[] = [];
  hasError = '';

  ngOnInit(): void {
    this.knowledgeService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
    });
  }
  changeSubject() {
    this.programs = this.selectedSubject?.programs ?? [];
    this.selectedProgram = emptyProgramObject;
  }

  changeProgram() {
    this.selectedTarget = emptyLearningGoalObject;
    this.testService.getLearningGoal(this.selectedProgram).subscribe({
      next: (data) => {
        this.targets = data;
        // 
      },
      error: (err) => {
        if (err.error_code == 'RanOutMockTest') {
          this.hasError = 'RanOutMockTest';
        }
        else {

          this.hasError = 'Có lỗi, vui lòng thử lại';
        }
      }
    });
    // this.orderService.getInventories().subscribe({
    //   next: (inventory: Inventory) => {
    //     if (inventory.mockTest > 0) {
    //     }
    //     else {
    //       this.hasError = 'LowBalance';
    //     }
    //   },
    //   error: (err) => {
    //     // TODO: Define error resposes
    //     this.hasError = 'Có lỗi, vui lòng thử lại';
    //   }
    // });
  }

  submit() {
    if (this.selectedProgram != null) {
      this.knowledgeService.selectProgram(this.selectedProgram);
      this.knowledgeService.selectLearningGoad(this.selectedTarget);
      if (this.type == SubmitType.mock_test) {
        this.router.navigate([this.paths.mockTestSelect.path.replace(':id', this.selectedTarget.id)]);
        // this.orderService.getInventories().subscribe({
        //   next: (inventory: Inventory) => {
        //     if (inventory.mockTest > 0) {
        //       this.testService.getLearningGoal(this.selectedProgram).subscribe({
        //         next: (data) => {
        //           this.targets = data;
        //           // 
        //         },
        //       });
        //     }
        //     else {
        //       this.hasError = 'LowBalance';
        //     }
        //   },
        //   error: (err) => {
        //     // TODO: Define error resposes
        //     this.hasError = 'Có lỗi, vui lòng thử lại';
        //   }
        // });
      }
    }
  }
}
