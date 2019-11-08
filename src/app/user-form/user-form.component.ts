import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user: User = new User();

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;

  constructor(private api: ApiService) {}

  create() {
    this.showSpinner = true;
    this.api
      .upsertUser(this.user)
      .subscribe(() => {
        this.showSpinner = false;

        this.user = new User();

        this.afterRequest.emit();
      });
  }
}
