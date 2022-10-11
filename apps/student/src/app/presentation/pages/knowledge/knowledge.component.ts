import { Component, HostBinding } from '@angular/core';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { AppPath } from '../../routes';

@Component({
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  constructor(navService: NavigationService) {
    this.paths = navService.paths;
  }
}
