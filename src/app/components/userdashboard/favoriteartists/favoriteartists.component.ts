import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, take } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-favoriteartists',
  templateUrl: './favoriteartists.component.html',
  styleUrls: ['./favoriteartists.component.css'],
})
export class FavoriteartistsComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private activatRouter: ActivatedRoute
  ) {}
  favoriteArtists = [];
  ngOnInit(): void {
    this.dashboardService.dataForLogedInHeader
      .pipe(take(1))
      .subscribe((data) => {
        this.dashboardService
          .getUuserDataForDashboard(data.userId)
          .subscribe((userData) => {
            for (let i = 0; i < userData['favoriteTickets'].length; i++) {
              if (userData['favoriteTickets'][i]['genre'] === 'Music') {
                this.favoriteArtists.push(userData['favoriteTickets'][i]);
              }
            }
          });
      });
  }
}
