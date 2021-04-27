import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritethethresComponent } from './favoritethethres/favoritethethres.component';
import { FavoriteartistsComponent } from './favoriteartists/favoriteartists.component';
import { FavoriteclubsComponent } from './favoriteclubs/favoriteclubs.component';
import { BoughtticketsComponent } from './boughttickets/boughttickets.component';
import { UserdashboardComponent } from './userdashboard.component';
import { UserdashboardRoutingModule } from './userdashboard-routing.module';

@NgModule({
  declarations: [
    UserdashboardComponent,
    BoughtticketsComponent,
    FavoriteclubsComponent,
    FavoritethethresComponent,
    FavoriteartistsComponent,
  ],
  imports: [CommonModule, UserdashboardRoutingModule],
})
export class UserdashboardModule {}
