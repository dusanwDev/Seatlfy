import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-favoriteclubs',
  templateUrl: './favoriteclubs.component.html',
  styleUrls: ['./favoriteclubs.component.css'],
})
export class FavoriteclubsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  favoriteClubs = [];
  ngOnInit(): void {
    this.dashboardService.dataForLogedInHeader
      .pipe(take(1))
      .subscribe((data) => {
        this.dashboardService
          .getUuserDataForDashboard(data.userId)
          .subscribe((userData) => {
            for (let i = 0; i < userData['favoriteTickets'].length; i++) {
              if (userData['favoriteTickets'][i]['genre'] === 'Sport') {
                this.favoriteClubs.push(userData['favoriteTickets'][i]);
              }
            }
          });
      });
  }
}
