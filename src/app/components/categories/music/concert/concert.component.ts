import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css'],
})
export class ConcertComponent implements OnInit {
  concerts = [];
  constructor(private dataService: DataService) {}
  showAddedToCart = false;
  showModal = true;

  ngOnInit(): void {
    this.dataService.getEvents('popular').subscribe((data) => {
      data.forEach((concert) => {
        this.concerts.push(...concert['concerts']);
      });
    });
  }
  newest(concerts) {
    this.concerts = this.dataService.sortByNewest(concerts);
  }
  oldest(concerts) {
    this.concerts = this.dataService.sortByOldest(concerts);
  }
  buyTicket(concert) {
    this.showModal = this.dataService.toCheckout(concert);
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
}
