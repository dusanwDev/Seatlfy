import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  club = {};
  games = [];
  boughtickets = [];
  showAddedToCart = false;
  showModal = true;
  disableBtn = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.dataService.getClub(data.clubname).subscribe((club) => {
        this.club['performer'] = club[0]['performer'];
        this.club['genre'] = club[0]['genre'];
        this.club['img'] = club[0]['img'];
        this.games = club[0]['games'];
      });
    });
  }
  newest(games) {
    this.games = this.dataService.sortByNewest(games);
  }
  oldest(games) {
    this.games = this.dataService.sortByOldest(games);
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
  removeModal() {
    this.showModal = true;
  }
  addToFavorite() {
    this.showModal = this.dataService.addFavorites(this.club);
    console.log(this.dataService.addFavorites(this.club));
    this.disableBtn = !this.disableBtn;
  }
}
