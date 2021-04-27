import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-theathre',
  templateUrl: './theathre.component.html',
  styleUrls: ['./theathre.component.css'],
})
export class TheathreComponent implements OnInit {
  theathre = {};
  thethreShows = [];
  showAddedToCart = false;
  showModal = true;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.dataService.getTheathre(data['theathrename']).subscribe((data) => {
        this.theathre['performer'] = data[0]['performer'];
        this.theathre['genre'] = data[0]['genre'];
        this.theathre['img'] = data[0]['img'];
      });
      this.dataService.getEvents('theathre').subscribe((theathres) => {
        theathres.forEach((theathre) => {
          if (theathre['performer'] === data['theathrename']) {
            this.thethreShows = theathre['theathreShows'];
          }
        });
      });
    });
  }
  addToFavorite(theathre) {
    this.showModal = this.dataService.addFavorites(theathre);
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
  newest(theathre) {
    this.dataService.sortByNewest(theathre);
  }
  oldest(theathre) {
    this.dataService.sortByOldest(theathre);
  }
  removeModal() {
    this.showModal = true;
  }
}
