import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DashboardService } from '../components/userdashboard/dashboard.service';
import { User } from '../modeli/user.model';
import { DataService } from './data.service';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  //for logIn
  registered?: boolean;
}
type typeOfAuth = 'logIn' | 'register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private afs: AngularFirestore,
    private router: Router,
    private userDashboard: DashboardService,
    private dataService: DataService
  ) {}
  private tokenExpTimer: any;

  user = new BehaviorSubject<User>(null);
  signup(
    email: string,
    password: string,
    name: string,
    lastname: string,
    city: string
  ) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyJA1fT5zaSdDJXn107YnTGLmQnWeW27E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthRegistration(
            data.idToken,
            data.email,
            data.refreshToken,
            +data.expiresIn,
            data.localId,
            'register',
            name,
            lastname,
            city
          );
        })
      );
  }
  logIn(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyJA1fT5zaSdDJXn107YnTGLmQnWeW27E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleAuthRegistration(
            data.idToken,
            data.email,
            data.refreshToken,
            +data.expiresIn,
            data.localId,
            'logIn'
          );
        })
      );
  }

  handleAuthRegistration(
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: number,
    localId: string,
    typeOfAuth: typeOfAuth,
    name?: string,
    lastname?: string,
    city?: string
  ) {
    console.log('HANDLE');
    const expDate = new Date(new Date(new Date().getTime() + expiresIn * 1000));
    const user = new User(localId, idToken, expDate, refreshToken, email);
    localStorage.setItem('userreg', JSON.stringify(user));
    this.user.next(user);
    this.router.navigate(['/userdashboard', user.userId]);
    this.autoLogOut(expiresIn * 1000);

    if (typeOfAuth === 'register') {
      this.afs.collection('upcoming_event').doc(localId).set({
        name: name,
        lastname: lastname,
        city: city,
        userId: localId,
      });
    }
  }
  autoLogin() {
    const user: {
      email: string;
      expdate: string;
      refreshToken: string;
      _token: string;
      _userId: string;
    } = JSON.parse(localStorage.getItem('userreg'));
    if (!user) {
      return;
    }

    const logedIng = new User(
      user._userId,
      user._token,
      new Date(user.expdate),
      user.refreshToken,
      user.email
    );
    const expDuration = new Date(user.expdate).getTime() - new Date().getTime();
    this.autoLogOut(expDuration);

    if (logedIng.token) {
      this.user.next(logedIng);
      this.userDashboard.displayUserName.next(true);
      this.dataService.userData(logedIng.userId).subscribe((data) => {
        this.userDashboard.dataForLogedInHeader.next({
          name: data['name'],
          userId: user._userId,
        });
      });
    }
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = 'An Error Has Occured';
    //ako nema error i ako nema error poruke ondabaci default
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We detected some unusual activity';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid';
        break;
    }

    return throwError(errorMessage);
  }
  logOut() {
    localStorage.removeItem('userreg');
    this.router.navigate(['/home']);
    //ako ga ima resetuj timer
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
  autoLogOut(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logOut();
    }, expDuration);
  }
}
