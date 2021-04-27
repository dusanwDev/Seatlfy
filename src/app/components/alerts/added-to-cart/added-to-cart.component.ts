import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/modeli/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-added-to-cart',
  templateUrl: './added-to-cart.component.html',
  styleUrls: ['./added-to-cart.component.css'],
})
export class AddedToCartComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: {
    email: string;
    expdate: string;
    refreshToken: string;
    _token: string;
    _userId: string;
  };
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userreg'));
    console.log(this.user);
  }
}
