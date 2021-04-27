import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-favoritethethres',
  templateUrl: './favoritethethres.component.html',
  styleUrls: ['./favoritethethres.component.css'],
})
export class FavoritethethresComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  favoriteTheathre = [];
  ngOnInit(): void {
    this.dashboardService.dataForLogedInHeader
      .pipe(take(1))
      .subscribe((data) => {
        this.dashboardService
          .getUuserDataForDashboard(data.userId)
          .subscribe((userData) => {
            for (let i = 0; i < userData['favoriteTickets'].length; i++) {
              if (userData['favoriteTickets'][i]['genre'] === 'Theathre') {
                this.favoriteTheathre.push(userData['favoriteTickets'][i]);
              }
            }
          });
      });
  }
}
