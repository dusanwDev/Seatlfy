import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies = [];
  constructor(private dataService: DataService) {}
  showAddedToCart = false;
  showModal = true;

  ngOnInit(): void {
    this.movies = [
      {
        day: 'FRI',
        date: 'Feb, 22',
        time: '21:00 PM',
        performer: 'Casino',
        venue: 'Cinaplex, Belgrade',
        price: 200,
      },
      {
        day: 'SUN',
        date: 'Jan, 29',
        time: '19:00 PM',
        performer: 'Goodfelas',
        venue: 'Big, Belgrade',
        price: 200,
      },
      {
        day: 'WEN',
        date: 'Oct, 1',
        time: '21:00 PM',
        performer: 'The trek',
        venueperformer: 'Woods, Belgrade',
        price: 200,
      },
      {
        day: 'SUN',
        date: 'Dec, 2',
        time: '20:00 PM',
        performer: 'Star Wars',
        venue: 'Cinaplex, Belgrade',
        price: 200,
      },
      {
        day: 'SAT',
        date: 'Jun, 29',
        time: '21:00 PM',
        performer: 'The Godfather',
        venue: 'StarTheathre, Belgrade',
        price: 200,
      },
    ];
  }
  newest(movie) {
    this.movies = this.dataService.sortByNewest(movie);
  }
  oldest(movie) {
    this.movies = this.dataService.sortByOldest(movie);
  }
  buyTicket(movie) {
    this.showModal = this.dataService.toCheckout(movie);
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
