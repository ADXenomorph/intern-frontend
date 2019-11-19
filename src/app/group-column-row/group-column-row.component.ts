import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../models/group';

@Component({
  selector: 'app-group-column-row',
  templateUrl: './group-column-row.component.html',
  styleUrls: ['./group-column-row.component.scss']
})
export class GroupColumnRowComponent implements OnInit {
  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
