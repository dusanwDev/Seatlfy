import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/modeli/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUp: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}
  errorMessage: string;

  ngOnInit(): void {
    this.signUp = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.checkIfNumber.bind(this),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        this.checkIfNumber.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        this.checkPassword.bind(this),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        this.confirmPassword.bind(this),
      ]),
      city: new FormControl(null, [
        Validators.required,
        this.checkIfNumber.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  checkIfNumber(nameValue: FormControl): { [key: string]: boolean } {
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/.test(
      nameValue.value
    );

    if (format) {
      return { character: true };
    }
    return null;
  }
  checkPassword(passwordValue: FormControl): { [key: string]: boolean } {

    let hasNumber = /\d/.test(passwordValue.value);
    let hasLower = /[a-z]/.test(passwordValue.value);
    let valid = hasLower && hasNumber;
    if (valid) {
      return null;
    }
    return { passwordError: true };
  }
  confirmPassword(passwordValue: FormControl): { [key: string]: boolean } {
    let password;
    if (this.signUp) {
      password = this.signUp.get('password').value;
    }
    if (passwordValue.value === password) {
      return null;
    } else {
      return { passwodIsNotMatching: true };
    }
  }
  onSubmit(signUpForm: FormGroup) {
    this.authService
      .signup(
        signUpForm.get('email').value,
        signUpForm.get('password').value,
        signUpForm.get('name').value,
        signUpForm.get('lastname').value,
        signUpForm.get('city').value
      )
      .subscribe(
        (data) => {
        },
        (err) => {
          this.errorMessage = err;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }
}
