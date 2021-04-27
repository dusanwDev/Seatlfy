import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  sports = [];
  showAddedToCart = false;
  showModal = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEvents('sports').subscribe((data) => {
      data.forEach((game) => {
        this.sports.push(...game['games']);
      });
    });
  }
  buyTicket(game) {
    this.showModal = this.dataService.toCheckout(game);
    if (this.showModal) {
      this.showAddedToCart = true;
      setTimeout(() => {
        this.showAddedToCart = false;
      }, 3000);
    }
  }
}
