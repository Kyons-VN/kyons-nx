import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './resend-verified.component.html',
})
export class ResendVerifiedComponent {
  paths = inject(NavigationService).paths;
}
