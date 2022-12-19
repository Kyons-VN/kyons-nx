import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import * as _ from 'lodash-es';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms-of-service.component.html',
})
export class TermsOfServiceComponent implements OnInit {
  paths: AppPaths;
  constructor(private router: Router, private route: ActivatedRoute, navService: NavigationService) {
    this.paths = navService.paths;
  }

  @HostBinding('class') class = 'h-full';

  backUrl = '';
  backPageName = '';
  paramBack = '';

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => params['backUrl'])
    ).subscribe({
      next: params => {
        this.paramBack = params['backUrl'];
        _.forOwn(this.paths, (value, key) => {
          if (value.path == '/') return;
          if (this.paramBack.includes(value.path)) {
            this.backUrl = this.paramBack;
            this.backPageName = value.name;
          }
        });
      },
      error: (e) => {
        console.log(e);

      },
      complete: () => {
        console.log('com');

        if (this.backUrl == '') {
          this.backUrl = this.paths.home.path;
          this.backPageName = this.paths.home.name;
        }
      }
    }).add(() => {
      console.log('end');

    });
  }

  return() {
    window.location.href = window.location.origin + this.paramBack;
  }
}
