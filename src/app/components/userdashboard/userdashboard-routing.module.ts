import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserdashboardComponent } from './userdashboard.component';
import { BoughtticketsComponent } from './boughttickets/boughttickets.component';
import { FavoriteartistsComponent } from './favoriteartists/favoriteartists.component';
import { FavoriteclubsComponent } from './favoriteclubs/favoriteclubs.component';
import { FavoritethethresComponent } from './favoritethethres/favoritethethres.component';

const routes: Routes = [
  {
    path: '',
    component: UserdashboardComponent,
    children: [
      { path: 'boughttickets', component: BoughtticketsComponent },
      { path: 'favoriteartists', component: FavoriteartistsComponent },
      { path: 'favoriteclubs', component: FavoriteclubsComponent },
      {
        path: 'favoritetheathres',
        component: FavoritethethresComponent,
      },
    ],
  },

  // {
  //   path: 'categories',
  //   component: UserdashboardComponent,
  //   canActivate: [UserdashboardGuard],
  //   children: [
  //     { path: 'boughttickets', component: BoughtticketsComponent },
  //     { path: 'favoriteartists', component: FavoriteartistsComponent },
  //     { path: 'favoriteclubs', component: FavoriteclubsComponent },
  //     {
  //       path: 'favoritetheathres',
  //       component: FavoritethethresComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdashboardRoutingModule {}
