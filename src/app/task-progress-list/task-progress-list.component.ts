import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {MatTable} from '@angular/material';
import {Task} from '../models/task';

interface Line {
  taskId: number;
  name: string;
  progress: number;
  goal: number;
  percent: number;
  sendProgress?: number;
}

@Component({
  selector: 'app-task-progress-list',
  templateUrl: './task-progress-list.component.html',
  styleUrls: ['./task-progress-list.component.scss']
})
export class TaskProgressListComponent implements OnInit {
  @ViewChild(MatTable) matTable: MatTable<any>;

  displayedColumns: string[] = ['taskId', 'name', 'progress', 'goal', 'percent', 'actions'];
  dataSource: Line[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.loadTasks().subscribe(
      tasks => tasks.forEach(task => this.reloadTaskProgress(task))
    );
  }

  reloadTaskProgress(task: Task) {
    this.api.loadProgressByTask(task.task_id).subscribe(
      progresses => {
        const progress = progresses
          .map(p => p.progress)
          .reduce((acc, cur) => acc + cur, 0);

        const line: Line = {
          taskId: task.task_id,
          name: task.name,
          progress,
          goal: task.goal,
          percent: progress / task.goal
        };

        this.upsertLineByTaskId(line);
      }
    );
  }

  upsertLineByTaskId(line: Line) {
    const index = this.dataSource.map(ds => ds.taskId).indexOf(line.taskId);
    if (index === -1) {
      this.dataSource.push(line);
    } else {
      this.dataSource[index] = line;
    }

    this.matTable.renderRows();
  }

  sendProgress(line: Line) {
    this.api.addProgressByTask(line.taskId, line.sendProgress).subscribe(() => {
      this.api.loadTaskById(line.taskId).subscribe(task => this.reloadTaskProgress(task));
    });
  }

  taskIsComplete(line: Line): boolean {
    return line.progress >= line.goal;
  }
}
