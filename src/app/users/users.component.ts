import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private userList;

  constructor(private api: ApiService) { }

  loadUsers() {
    this.userList = this.api.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }
}
