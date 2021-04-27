import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-boughttickets',
  templateUrl: './boughttickets.component.html',
  styleUrls: ['./boughttickets.component.css'],
})
export class BoughtticketsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  boughtTickets = [];

  ngOnInit(): void {
    const user: {
      email: string;
      expdate: string;
      refreshToken: string;
      _token: string;
      _userId: string;
    } = JSON.parse(localStorage.getItem('userreg'));
    this.dashboardService
      .getUuserDataForDashboard(user._userId)
      .subscribe((data) => {
        this.boughtTickets = data['boughtTickets'];
      });
  }
}
