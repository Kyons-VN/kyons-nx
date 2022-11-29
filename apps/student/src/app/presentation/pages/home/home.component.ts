import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { Program } from '@infrastructure/knowledge/program';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPath } from '@presentation/routes';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paths: AppPath;
  constructor(
    navService: NavigationService,
    private knowledgeService: KnowledgeService,
    private router: Router
  ) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  programs!: Program[];
  isPromotionEnable: boolean = environment.isPromotionEnable;

  async ngOnInit(): Promise<void> {
    this.knowledgeService.getPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
      },
      error: (error) => {
        // TODO: Define error resposes
        console.log(error);
      },
    });
  }

  selectProgram(program: Program) {
    this.knowledgeService.selectProgram(program);
    this.router.navigate([this.paths.learningPath]);
  }
}
