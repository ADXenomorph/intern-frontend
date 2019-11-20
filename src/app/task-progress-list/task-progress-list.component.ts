import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Task} from '../models/task';
import {LocalStorageService} from '../local-storage.service';

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
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['taskId', 'name', 'progress', 'goal', 'percent', 'actions'];
  dataSource: MatTableDataSource<Line> = new MatTableDataSource<Line>([]);

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    const userId = this.localStorage.getAuthUserId();
    this.api.loadUserTasks(userId).subscribe(
      tasks => tasks.forEach(task => this.reloadTaskProgress(task))
    );

    this.dataSource.sort = this.sort;
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
    const index = this.dataSource.data.map(ds => ds.taskId).indexOf(line.taskId);
    if (index === -1) {
      this.dataSource.data.push(line);
    } else {
      this.dataSource.data[index] = line;
    }

    this.sort.sort(this.sort.sortables.get(this.sort.active));
    this.sort.direction = 'desc';
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
