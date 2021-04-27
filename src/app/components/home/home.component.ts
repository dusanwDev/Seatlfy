import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IntersectionObserverService,
  INTERSECTION_THRESHOLD,
} from '@ng-web-apis/intersection-observer';
import { User } from 'src/app/modeli/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  user: User;
  allEvents = [];
  userInput: string = '';
  showModal = true;
  showAddedToCart = false;
  loading = true;
  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.user = data;
    });

    this.dataService.getFiltered().subscribe((data) => {
      this.allEvents = data;
      this.loading = false;
    });
    this.Intersection();
  }
  addFavorites(event) {
    this.showModal = this.dataService.addFavorites(event);
  }
  addToCart(event) {
    this.showModal = this.dataService.toCheckout(event);
    if (this.showModal) {
      this.showAddedToCart = true;
      setTimeout(() => {
        this.showAddedToCart = false;
      }, 3000);
    }
  }
  removeModal() {
    this.showModal = true;
  }

  Intersection() {
    const options = { threshold: 0.1 };
    let main: HTMLElement = document.querySelector('.main');
    if (typeof main === 'undefined') {
      return;
    }
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelector('.to-header').classList.add('vissible');
        } else {
          document.querySelector('.to-header').classList.remove('vissible');
        }
      });
    }, options);
    observer.observe(main);
  }
  onEdit() {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
  toCheckout() {
    this.router.navigate(['/checkout', this.user.userId]);
  }
}
