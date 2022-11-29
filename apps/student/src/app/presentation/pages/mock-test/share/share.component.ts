import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';

@Component({
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class MockTestShareComponent implements OnInit {
  constructor(private route: ActivatedRoute, navService: NavigationService, private testService: TestService,
    private loading: LoadingOverlayService,) { }

  ngOnInit(): void {
    console.log('init MockTestShareComponent');
    const learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(learningGoalId);

  }
}
