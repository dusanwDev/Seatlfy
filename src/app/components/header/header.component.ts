import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from '../userdashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dashService: DashboardService,
    private authService: AuthService
  ) {}
  manipulateLinks = false;
  userData = {};
  firtLetterOfUserName: string;
  isLoaded = false;
  changeColors: boolean;
  showModal = true;

  ngOnInit(): void {
    this.manipulateLinks = this.displayUserDataHeader();
    this.dashService.changeColor.subscribe((data) => {
      setTimeout(() => {
        this.changeColors = data;
      }, 10);
    });
    this.dashService.dataForLogedInHeader.subscribe((data) => {
      console.log('HEADER', data);
      if (data) {
        this.firtLetterOfUserName = data['name'].charAt(0).toUpperCase();
        this.userData['name'] = data['name'];
        this.userData['userId'] = data['userId'];
      }
    });
  }

  displayUserDataHeader() {
    const user: {
      email: string;
      expdate: string;
      refreshToken: string;
      _token: string;
      _userId: string;
    } = JSON.parse(localStorage.getItem('userreg'));
    if (!user) {
      return false;
    } else {
      return true;
    }
  }
  displayModal() {
    const user: {
      email: string;
      expdate: string;
      refreshToken: string;
      _token: string;
      _userId: string;
    } = JSON.parse(localStorage.getItem('userreg'));
    if (!user) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }
  }
  removeModal() {
    this.showModal = true;
  }
  showMenu() {
    let menu: HTMLElement = document.querySelector('.menu');
    if (menu.style.width === '100%') {
      menu.style.width = '0%';
    } else {
      menu.style.width = '100%';
    }
  }
  logOut() {
    this.authService.logOut();
    let menu: HTMLElement = document.querySelector('.menu');
    menu.style.width = '0%';
    this.manipulateLinks = false;
  }
}
