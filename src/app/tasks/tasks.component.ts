import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Task} from '../models/task';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private list: Observable<Task[]>;

  constructor(private api: ApiService) { }

  loadTasks() {
    this.list = this.api.loadTasks();
  }

  ngOnInit() {
    this.loadTasks();
  }
}
