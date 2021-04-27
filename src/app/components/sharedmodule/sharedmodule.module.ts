import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddedToCartComponent } from '../alerts/added-to-cart/added-to-cart.component';
import { LoginAlertComponent } from '../alerts/login-alert/login-alert.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddedToCartComponent, LoginAlertComponent],
  imports: [CommonModule, RouterModule],
  exports: [AddedToCartComponent, LoginAlertComponent],
})
export class SharedmoduleModule {}
