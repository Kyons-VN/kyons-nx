import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '@data/admin/admin-service.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  adminService = inject(AdminService);
  users!: Observable<any[]>;
  ngOnInit(): void {
    this.users = this.adminService.getUsers();
  }
}
