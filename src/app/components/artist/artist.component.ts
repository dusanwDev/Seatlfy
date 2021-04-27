import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist = {};
  showAddedToCart = false;
  showModal = true;
  disableBtn = false;
  artistConcerts = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.dataService.getArtists(data.artistname).subscribe((artist) => {
        this.artist['id'] = artist[0]['id'];
        this.artist['performer'] = artist[0]['performer'];
        this.artist['genre'] = artist[0]['genre'];
        this.artist['img'] = artist[0]['img'];
        this.artistConcerts = artist[0]['concerts'];
      });
    });
  }
  newest(artist) {
    this.artistConcerts = this.dataService.sortByNewest(artist);
  }
  oldest(artist) {
    this.artistConcerts = this.dataService.sortByOldest(artist);
  }
  removeModal() {
    this.showModal = true;
  }
  addToFavorite() {
    this.showModal = this.dataService.addFavorites(this.artist);
    if (this.showModal) {
      this.disableBtn = !this.disableBtn;
    }
  }
  toCheckout(i: number) {
    this.showModal = this.dataService.toCheckout(this.artistConcerts[i]);
    if (this.showModal) {
      this.showAddedToCart = true;
      setTimeout(() => {
        this.showAddedToCart = false;
      }, 3000);
    }
  }
}
