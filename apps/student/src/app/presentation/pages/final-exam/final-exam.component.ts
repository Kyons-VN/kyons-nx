import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { AppPaths } from '@presentation/routes';
import { UserService } from '@infrastructure/user/user.service';

@Component({
  selector: 'student-final-exam',
  templateUrl: './final-exam.component.html',
  styleUrls: ['./final-exam.component.scss'],
})
export class FinalExamComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  surveyLink: string;
  paths: AppPaths;
  constructor(private route: ActivatedRoute, userService: UserService, navService: NavigationService) {
    this.paths = navService.paths;
    const userType = userService.getUserType();
    switch (userType) {
      case 'ai':
        this.surveyLink = 'https://forms.gle/3PwpQYTY28FhrrPF8';
        break;
      case 'self_study':
        this.surveyLink = 'https://forms.gle/3updPGU45HN3sW277';
        break;
      default:
        this.surveyLink = '';
        break;
    }
  }

  finalExamLink!: string;

  ngOnInit(): void {
    console.log('init student-final-exam');
    const programId = this.route.snapshot.paramMap.get('programId') ?? '';
    // switch (programId) {
    //   case '2':
    //     this.finalExamLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdx80FtgKcitqBjPL4NQVK9HdaBVsx_iQCUEghQ1Lrlghy7OA/viewform';
    //     break;
    //   case '3':
    //     this.finalExamLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfUIkZeIRBMWduz5iVXlJk39M4GUUqsU2JqULjwyfWlG95Bjg/viewform';
    //     break;

    //   default:
    //     this.finalExamLink = '';
    //     break;
    // }
  }

}
