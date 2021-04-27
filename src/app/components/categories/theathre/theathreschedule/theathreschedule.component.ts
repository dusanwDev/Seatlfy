import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-theathreschedule',
  templateUrl: './theathreschedule.component.html',
  styleUrls: ['./theathreschedule.component.css'],
})
export class TheathrescheduleComponent implements OnInit {
  shows = [];
  constructor(private dataService: DataService) {}
  showAddedToCart = false;
  showModal = true;

  ngOnInit(): void {
    this.dataService.getEvents('theathre').subscribe((theathres) => {
      theathres.forEach((theathre) => {
        this.shows.push(...theathre['theathreShows']);
      });
    });
  }
  buyTicket(theathre) {
    this.showModal = this.dataService.toCheckout(theathre);
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
  newest(shows) {
    this.dataService.sortByNewest(shows);
  }
  oldest(shows) {
    this.dataService.sortByOldest(shows);
  }
}
