import {Component, OnInit} from '@angular/core';
import {Group} from '../models/group';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: Observable<Group[]>;
  users: Observable<User[]>;
  emptyGroup = new Group();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.groups = this.api.loadPopulatedGroups();
    this.users = this.api.loadUsers();
  }

  getUserNames(group: Group): string {
    return group.users.map(u => u.last_name + ' ' + u.first_name).join(', ');
  }
}
