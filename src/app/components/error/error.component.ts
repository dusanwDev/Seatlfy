import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../userdashboard/dashboard.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  constructor(private dashBoardService: DashboardService) {}

  ngOnInit(): void {
    this.dashBoardService.changeColor.next(true);
  }
  ngOnDestroy(): void {
    this.dashBoardService.changeColor.next(false);
  }
}
