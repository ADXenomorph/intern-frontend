import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;
  private isEditMode = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  delete() {
    this.showSpinner = true;
    this.api
      .deleteUser(this.user.user_id)
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
