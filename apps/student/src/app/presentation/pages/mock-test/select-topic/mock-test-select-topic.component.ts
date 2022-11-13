import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingOverlayService } from '../../../../infrastructure/loading-overlay.service';
import { NavigationService } from '../../../../infrastructure/navigation/navigation.service';
import { UserService } from '../../../../infrastructure/user/user.service';
import { AppPath } from '../../../routes';

@Component({
  templateUrl: './mock-test-select-topic.component.html',
  styleUrls: ['./mock-test-select-topic.component.scss'],
})
export class MockTestSelectTopicComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  constructor(
    private route: ActivatedRoute,
    navService: NavigationService,
    userService: UserService,
    private loading: LoadingOverlayService,
  ) {
    this.paths = navService.paths;
  }

  ngOnInit(): void {
    console.log('init MockTestSelectTopicComponent');

  }

}
