import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Group } from '../models/group';

@Component({
  selector: 'app-assignees-column',
  templateUrl: './assignees-column.component.html',
  styleUrls: ['./assignees-column.component.scss']
})
export class AssigneesColumnComponent implements OnInit {
  users: Observable<User[]>;
  groups: Observable<Group[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.users = this.api.loadUsers();
    this.groups = this.api.loadGroups();
  }
}
