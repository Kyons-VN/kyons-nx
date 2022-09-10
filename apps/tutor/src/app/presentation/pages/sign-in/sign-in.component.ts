import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControlStatus } from '../../../../app/helper/form';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { AuthCredential } from '../../../infrastructure/auth/credential';

@Component({
  selector: 'tutor-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  @HostBinding('class') class = 'h-full';

  signInform: FormGroup = this.fb.group({});
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', Validators.required);
  errorMessage = false;
  loginPressed = false;

  ngOnInit(): void {
    this.signInform.addControl('email', this.email);
    this.signInform.addControl('password', this.password);
  }

  login() {
    if (this.signInform.untouched) {
      this.signInform.markAllAsTouched();
      return;
    }
    this.loginPressed = true;
    if (this.signInform.status == FormControlStatus.VALID)
      this.authService.signIn(new AuthCredential(this.signInform.value)).subscribe({
        next: (result: any) => {
          if (result.success) {
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 100);
          }
          else
            this.errorMessage = true;
        },
        complete: () => { this.loginPressed = false }
      });
  }
}
