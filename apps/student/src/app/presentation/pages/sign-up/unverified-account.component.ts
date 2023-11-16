import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './unverified-account.component.html',
})
export class UnverifiedAccountComponent {
  paths = inject(NavigationService).paths;
}
