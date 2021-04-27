import { Component, OnDestroy, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';
import { DashboardService } from '../userdashboard/dashboard.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private dashBoardService: DashboardService
  ) {}

  checkoutTickets = [];
  total = 0;
  ngOnInit(): void {
    this.checkoutTickets = this.dataService.returnTicketArray();
    for (let ticket of this.checkoutTickets) {
      this.total += ticket['price'];
    }
    this.dashBoardService.changeColor.next(true);
  }
  ngOnDestroy(): void {
    this.dashBoardService.changeColor.next(false);
  }
  Remove(i: number) {
    this.total -= this.checkoutTickets[i]['price'];
    this.checkoutTickets.splice(i, 1);
  }
  onConfirm() {
    this.dataService.addBoughtTickets(this.checkoutTickets);
    this.checkoutTickets = [];
  }
}
