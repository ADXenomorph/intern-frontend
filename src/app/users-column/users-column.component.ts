import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-users-column',
  templateUrl: './users-column.component.html',
  styleUrls: ['./users-column.component.scss']
})
export class UsersColumnComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.users = this.api.loadUsers();
  }
}
