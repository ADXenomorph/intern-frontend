import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  @Input() id = null;
  @Input() userId;
  @Input() itemName;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;

  constructor(private api: ApiService) {}

  create() {
    this.showSpinner = true;
    this.api
      .upsertOrder(this.id, this.userId, this.itemName)
      .subscribe(() => {
        this.showSpinner = false;

        this.id = null;
        this.userId = null;
        this.itemName = null;

        this.afterRequest.emit();
      });
  }
}
