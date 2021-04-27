import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from '../artist/artist.component';
import { ArtistGuard } from 'src/app/services/artist.guard';
import { MusicComponent } from './music/music.component';
import { ConcertComponent } from './music/concert/concert.component';
import { SportComponent } from './sport/sport.component';
import { GamesComponent } from './sport/games/games.component';
import { ClubComponent } from './sport/club/club.component';
import { ClubGuard } from 'src/app/services/club.guard';
import { TheathresComponent } from './theathre/theathres.component';
import { TheathrescheduleComponent } from './theathre/theathreschedule/theathreschedule.component';
import { TheathreComponent } from './theathre/theathre/theathre.component';
import { TheathreGuard } from 'src/app/services/theathre.guard';
import { MoviesComponent } from './movies/movies.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: 'music',
        redirectTo: 'music/concert',
        pathMatch: 'full',
      },
      {
        path: 'music',
        component: MusicComponent,
        children: [{ path: 'concert', component: ConcertComponent }],
      },
      {
        path: 'sport',
        redirectTo: 'sport/games',
        pathMatch: 'full',
      },
      {
        path: 'sport',
        component: SportComponent,
        children: [
          { path: 'games', component: GamesComponent },
          {
            path: 'club/:clubname',
            component: ClubComponent,
            canActivate: [ClubGuard],
          },
        ],
      },
      {
        path: 'theathres',
        redirectTo: 'categories/theathres/schedule',
        pathMatch: 'full',
      },
      {
        path: 'theathres',
        component: TheathresComponent,
        children: [
          {
            path: 'schedule',
            component: TheathrescheduleComponent,
          },
          {
            path: 'theathre/:theathrename',
            component: TheathreComponent,
            canActivate: [TheathreGuard],
          },
        ],
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'artist/:artistname',
        component: ArtistComponent,
        canActivate: [ArtistGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatRoutingModule {}
