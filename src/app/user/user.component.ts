import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() id;
  @Input() firstName;
  @Input() lastName;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;
  private isEditMode = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  delete() {
    this.showSpinner = true;
    this.api
      .deleteUser(this.id)
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
