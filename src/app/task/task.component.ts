import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Task} from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;
  private isEditMode = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  delete() {
    this.showSpinner = true;
    this.api
      .deleteTask(this.task)
      .subscribe(() => {
        this.showSpinner = false;
        this.triggerEvent();
      });
  }

  triggerEvent() {
    this.afterRequest.emit();
  }

  edit() {
    this.isEditMode = true;
  }
}
