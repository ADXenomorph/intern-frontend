import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() id = null;
  @Input() firstName;
  @Input() lastName;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;

  constructor(private api: ApiService) {}

  create() {
    this.showSpinner = true;
    this.api
      .upsertUser(this.id, this.firstName, this.lastName)
      .subscribe(() => {
        this.showSpinner = false;

        this.id = null;
        this.firstName = null;
        this.lastName = null;

        this.afterRequest.emit();
      });
  }
}
