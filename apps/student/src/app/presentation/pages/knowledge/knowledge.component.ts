import { Component, HostBinding } from '@angular/core';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';

@Component({
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent {
  @HostBinding('class') class = 'h-full';
  paths: AppPaths;
  constructor(navService: NavigationService) {
    this.paths = navService.paths;
  }
}
