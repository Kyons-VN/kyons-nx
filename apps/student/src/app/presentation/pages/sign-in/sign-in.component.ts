import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthService } from '@infrastructure/auth/auth.service';
import { AuthCredential } from '@infrastructure/auth/credential';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { FormControlStatus } from '@utils/form';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit, OnDestroy {
  location = inject(Location);
  navService = inject(NavigationService);
  paths = this.navService.paths;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loading = inject(LoadingOverlayService);
  // knowledgeService = inject(KnowledgeService);

  @HostBinding('class') class = 'h-full';

  signInForm: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);
  errorMessage = false;
  processing = false;
  isDebug = false;
  showPassword = false;
  isEdited = false;

  isPromotionEnable = environment.isPromotionEnable;

  @ViewChild('emailElm') emailElm!: ElementRef;

  ngOnInit(): void {
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.errorMessage = false;
    });
  }

  ngOnDestroy(): void {
    this.loading.hide();
  }

  ngAfterViewInit(): void {
    this.emailElm.nativeElement.focus();
  }

  login() {
    if (this.isDebug) {
      this.email.setValue('binhhm2009+0311@gmail.com');
      this.password.setValue('Zaq1@wsx');
    }
    if (!this.isEdited) this.isEdited = true;
    if (!(this.signInForm.get('email')?.dirty && this.signInForm.get('password')?.dirty)) {
      this.signInForm.get('email')?.markAsDirty();
      this.signInForm.get('password')?.markAsDirty();
      return;
    }
    if (this.signInForm.status === FormControlStatus.VALID) {
      this.processing = true;
      this.authService.signIn(new AuthCredential(this.signInForm.value)).subscribe({
        next: (result: any) => {
          if (result.success) {
            this.location.replaceState('/');
            const redirectPath = this.navService.getRouteAfterLogin(result.redirect_after_auth);
            // const selectedProgram = result.program ? Program.fromJson(result.program) : null;
            // if (selectedProgram) {
            //   if (result.learning_goal) {
            //     selectedProgram.learningGoal = LearningGoal.fromJson(result.learning_goal);
            //   }
            //   this.knowledgeService.selectProgram(selectedProgram);
            // }
            // const learningGoal = selectedProgram ? selectedProgram.learningGoal : null;

            this.loading.show();
            setTimeout(() => {
              this.router.navigate([redirectPath]);
            }, 600);
          } else {
            this.processing = false;
            this.errorMessage = true;
            this.loading.hide();
          }
        },
        error: () => {
          // TODO: Define error resposes
          this.errorMessage = true;
          this.processing = false;
          this.loading.hide();
        },
      });
    }
  }

  debug() {
    if (!environment.production) this.isDebug = true;
  }
}
