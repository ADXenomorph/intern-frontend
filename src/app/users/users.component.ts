import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private userList: Observable<User[]>;

  constructor(private api: ApiService) { }

  loadUsers() {
    this.userList = this.api.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }
}
