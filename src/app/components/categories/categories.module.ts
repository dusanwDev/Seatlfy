import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { MusicComponent } from './music/music.component';
import { ConcertComponent } from './music/concert/concert.component';
import { ArtistComponent } from '../artist/artist.component';
import { ClubComponent } from './sport/club/club.component';
import { SportComponent } from './sport/sport.component';
import { TheathresComponent } from './theathre/theathres.component';
import { TheathreComponent } from './theathre/theathre/theathre.component';
import { TheathrescheduleComponent } from './theathre/theathreschedule/theathreschedule.component';
import { MoviesComponent } from './movies/movies.component';
import { GamesComponent } from './sport/games/games.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { CatRoutingModule } from './cat-routing.module';
@NgModule({
  declarations: [
    CategoriesComponent,
    MusicComponent,
    ConcertComponent,
    ArtistComponent,
    ClubComponent,
    SportComponent,
    TheathresComponent,
    TheathreComponent,
    TheathrescheduleComponent,
    MoviesComponent,
    GamesComponent,
  ],
  exports: [],

  imports: [CommonModule, CatRoutingModule, SharedmoduleModule],
})
export class CategoriesModule {}
