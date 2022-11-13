import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from '../../../domain/subject/subject';
import { KnowledgeService } from '../../../infrastructure/knowledge/knowledge.service';
import { Program } from '../../../infrastructure/knowledge/program';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  selector: 'student-class-program',
  templateUrl: './class-program.component.html',
  styleUrls: ['./class-program.component.scss'],
})
export class ClassProgramComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';

  paths: AppPath;
  constructor(
    private router: Router,
    navService: NavigationService,
    private knowledgeService: KnowledgeService,
    private fb: FormBuilder
  ) {
    this.paths = navService.paths;
  }

  selectedSubject: null | Subject = null;
  selectedProgram: null | Program = null;
  selectedTarget: null | string = null;
  subjects!: Subject[];
  programs: Program[] = [];
  targets: string[] = ['mục tiêu 1', 'mục tiêu 2', 'mục tiêu 3', 'mục tiêu 4'];

  ngOnInit(): void {
    this.knowledgeService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
    });
  }
  changeSubject() {
    this.programs = this.selectedSubject?.programs ?? [];
    this.selectedProgram = null;
  }

  submit() {
    if (this.selectedProgram != null) {
      this.knowledgeService.selectProgram(this.selectedProgram);
      this.router.navigate([this.paths.diagnosticTest]);
    }
  }
}
