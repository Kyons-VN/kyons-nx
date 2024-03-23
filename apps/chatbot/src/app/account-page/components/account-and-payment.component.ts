import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'chatbot-account-and-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-and-payment.component.html',
})
export class AccountAndPaymentComponent {
  activeTab: number = 0;

  copy(string: string) {
    navigator.clipboard.writeText(string);
  }
}
