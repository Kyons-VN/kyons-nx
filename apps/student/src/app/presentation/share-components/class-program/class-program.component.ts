import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '@domain/subject/subject';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { Program } from '@infrastructure/knowledge/program';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import Inventory from '@infrastructure/order/inventory';
import { OrderService } from '@infrastructure/order/order.service';
import { TestService } from '@infrastructure/test/test.service';
import { AppPath } from '@presentation/routes';

enum SubmitType {
  mock_test
}

const emptyProgramObject = Program.empty();

@Component({
  selector: 'student-class-program',
  templateUrl: './class-program.component.html',
  styleUrls: ['./class-program.component.scss'],
})
export class ClassProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';
  @Input() type = SubmitType.mock_test;

  paths: AppPath;
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
  selectedTarget: null | string = null;
  subjects!: Subject[];
  programs: Program[] = [];
  targets: string[] = ['mục tiêu 1', 'mục tiêu 2', 'mục tiêu 3', 'mục tiêu 4'];
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

  submit() {
    if (this.selectedProgram != null) {
      this.knowledgeService.selectProgram(this.selectedProgram);
      if (this.type == SubmitType.mock_test) {
        this.orderService.getInventories().subscribe({
          next: (inventory: Inventory) => {
            if (inventory.mockTest > 0) {
              this.testService.getLearningGoal(this.selectedProgram).subscribe({
                next: (data) => {
                  this.router.navigate([this.paths.mockTestSelect.replace(':id', data[0].id)]);
                },
              });
            }
            else {
              this.hasError = 'LowBalance';
            }
          },
          error: (err) => {
            // TODO: Define error resposes
            this.hasError = 'Có lỗi, vui lòng thử lại';
          }
        });
      }
    }
  }
}
