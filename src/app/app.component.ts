import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from './components/userdashboard/dashboard.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ticket';
  header = true;
  constructor(
    private dashBoardService: DashboardService,
    private authService: AuthService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.checkIfFavoriteExists();

    this.dashBoardService.removeHeader.subscribe((data) => {
      setTimeout(() => {
        this.header = data;
      }, 10);
    });
    this.authService.autoLogin();
  }
}
