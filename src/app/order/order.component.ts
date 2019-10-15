import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() id;
  @Input() userId;
  @Input() itemName;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;
  private isEditMode = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  delete() {
    this.showSpinner = true;
    this.api
      .deleteOrder(this.id)
      .subscribe(() => {
        this.showSpinner = false;
        this.triggerEvent();
      });
  }

  triggerEvent() {
    this.afterRequest.emit();
  }

  edit() {
    this.isEditMode = true;
  }
}
