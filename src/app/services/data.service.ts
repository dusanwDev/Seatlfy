import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore, private router: Router) {}
  private favoriteArr = [];
  checkoutTickets = new Subject<any[]>();
  private toCheckOutTicketArr = [];
  user: {
    email: string;
    expdate: string;
    refreshToken: string;
    _token: string;
    _userId: string;
  };
  getTheathre(paramater: string) {
    return this.afs
      .collection('upcoming_event', (ref) =>
        ref.where('performer', '==', paramater)
      )
      .valueChanges();
  }
  getMusicConcerts() {
    return this.afs
      .collection('upcoming_event', (ref) => ref.where('id', '==', 'concert'))
      .valueChanges();
  }
  getFiltered() {
    return this.afs.collection('upcoming_event').valueChanges();
  }
  getArtists(parameter: string) {
    return this.afs
      .collection('upcoming_event', (ref) =>
        ref.where('performer', '==', parameter)
      )
      .valueChanges();
  }
  getClub(parameter: string) {
    return this.afs
      .collection('upcoming_event', (ref) =>
        ref.where('performer', '==', parameter)
      )
      .valueChanges();
  }
  getEvents(paramater: string) {
    return this.afs
      .collection('upcoming_event', (ref) => ref.where('id', '==', paramater))
      .valueChanges();
  }
  sortByNewest(date: [{ date: string }]) {
    return (date = date.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      return dateB.getMonth() - dateA.getMonth();
    }));
  }
  sortByOldest(date: [{ date: string }]) {
    return (date = date.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      return dateA.getMonth() - dateB.getMonth();
    }));
  }
  userData(userId: string) {
    return this.afs.collection('upcoming_event').doc(userId).valueChanges();
  }

  addBoughtTickets(boughtTickets: any[]) {
    // const user: {
    //   _token: string;
    //   email: string;
    //   expdate: string;
    //   _userId: string;
    //   refreshToken: string;
    // } = JSON.parse(localStorage.getItem('userreg'));
    this.user = JSON.parse(localStorage.getItem('userreg'));

    if (!this.user) {
      boughtTickets = [];
      return false;
    }
    this.afs.collection('upcoming_event').doc(this.user._userId).update({
      boughtTickets: boughtTickets,
    });
    return true;
  }

  toCheckout(event) {
    // const user: {
    //   email: string;
    //   expdate: string;
    //   refreshToken: string;
    //   _token: string;
    //   _userId: string;
    // } = JSON.parse(localStorage.getItem('userreg'));
    this.user = JSON.parse(localStorage.getItem('userreg'));

    if (!this.user) {
      return false;
    }
    this.toCheckOutTicketArr.push(event);
    return true;
  }
  returnTicketArray() {
    return this.toCheckOutTicketArr;
  }
  checkIfFavoriteExists() {
    this.user = JSON.parse(localStorage.getItem('userreg'));
    if (!this.user) {
      this.favoriteArr = [];
      return;
    }
    this.afs
      .collection('upcoming_event')
      .doc(this.user._userId)
      .valueChanges()
      .subscribe((data) => {
        if (!data['favoriteTickets']) {
          return;
        }
        this.favoriteArr = data['favoriteTickets'];
        console.log('LOADED', this.favoriteArr);
      });
  }

  addFavorites(favoriteItem) {
    // const user: {
    //   email: string;
    //   expdate: string;
    //   refreshToken: string;
    //   _token: string;
    //   _userId: string;
    // } = JSON.parse(localStorage.getItem('userreg'));
    this.user = JSON.parse(localStorage.getItem('userreg'));
    console.log(this.user);

    if (!this.user) {
      return false;
    }

    let bool = true;

    for (let i = 0; i < this.favoriteArr.length; i++) {
      if (this.favoriteArr[i]['performer'] === favoriteItem['performer']) {
        bool = false;
        break;
      } else {
        bool = true;
      }
    }

    if (!bool) {
      return true;
    }
    this.favoriteArr.push(favoriteItem);
    console.log(this.user._userId);
    console.log('ADDED', this.favoriteArr);
    this.afs.collection('upcoming_event').doc(this.user._userId).update({
      favoriteTickets: this.favoriteArr,
    });

    return true;
  }
}
