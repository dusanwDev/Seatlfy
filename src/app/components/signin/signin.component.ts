import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  signIn: FormGroup;
  errorMessage: string;
  ngOnInit(): void {
    this.signIn = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(signInForm: FormGroup) {
    this.authService
      .logIn(signInForm.get('email').value, signInForm.get('password').value)
      .subscribe(
        (data) => {},
        (error) => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }
}
