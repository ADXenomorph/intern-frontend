import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Task} from '../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: Task = new Task();

  @Output() afterRequest = new EventEmitter();

  private showSpinner = false;

  constructor(private api: ApiService) {}

  create() {
    this.showSpinner = true;
    this.api
      .upsertTask(this.task)
      .subscribe(() => {
        this.showSpinner = false;

        this.task = new Task();

        this.afterRequest.emit();
      });
  }
}
