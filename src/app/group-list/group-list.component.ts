import {Component, OnInit} from '@angular/core';
import {PopulatedGroup} from '../models/populated-group';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: Observable<PopulatedGroup[]>;
  users: Observable<User[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadGroups();
    this.users = this.api.loadUsers();
  }

  loadGroups() {
    this.groups = this.api.loadPopulatedGroups().pipe(
      map(groups => groups.sort((g1, g2) => g1.group.group_id - g2.group.group_id))
    );
  }

  getUserNames(group: PopulatedGroup): string {
    return group.users.map(u => u.last_name + ' ' + u.first_name).join(', ');
  }
}
