import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
})
export class UserdashboardComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private userDashboardService: DashboardService,
    private authService: AuthService
  ) {}
  userData = {};
  isLoaded = false;
  // isLoadedHeaderComponent :boolean
  subject = new Subject<boolean>();
  bougthTitcket = [];
  ngOnInit(): void {
    this.dataService
      .userData(this.activatedRoute.snapshot.params['userid'])
      .subscribe((data) => {
        this.isLoaded = true;
        this.userData = data;
        this.userDashboardService.dataForLogedInHeader.next({
          name: this.userData['name'],
          userId: this.activatedRoute.snapshot.params['userid'],
        });
      });
    this.userDashboardService.displayUserName.next(true);
    this.userDashboardService.removeHeader.next(false);
    this.dataService.checkIfFavoriteExists();
  }
  ngOnDestroy(): void {
    this.userDashboardService.displayUserName.next(true);

    this.userDashboardService.removeHeader.next(true);
  }
  logOut() {
    this.authService.logOut();
  }
  showMenu() {
    let menu = <HTMLElement>document.querySelector('.menu');
    if (menu.style.width === '100%') {
      menu.style.width = '0%';
    } else {
      menu.style.width = '100%';
    }
  }
}
