import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-users-column-row',
  templateUrl: './users-column-row.component.html',
  styleUrls: ['./users-column-row.component.scss']
})
export class UsersColumnRowComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
