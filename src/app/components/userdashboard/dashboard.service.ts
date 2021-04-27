import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private afs: AngularFirestore) {}

  displayUserName = new Subject<boolean>();
  dataForLogedInHeader = new BehaviorSubject<{
    name: string;
    userId: string;
  }>(null);
  changeColor = new Subject<boolean>();
  removeHeader = new Subject<boolean>();
  getUuserDataForDashboard(userId) {
    return this.afs.collection('upcoming_event').doc(userId).valueChanges();
  }
}
