import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private orderList;

  constructor(private api: ApiService) { }

  loadOrders() {
    this.orderList = this.api.loadOrders();
  }

  ngOnInit() {
    this.loadOrders();
  }
}
