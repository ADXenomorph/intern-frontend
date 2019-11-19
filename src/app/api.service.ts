import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from './models/task';
import {Response} from './models/response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskProgress} from './models/task-progress';
import {TreeNode} from './models/tree-node';
import {User} from './models/user';
import {Group} from './models/group';
import {PopulatedGroupResponse} from './models/populated-group-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public loadUsers(): Observable<User[]> {
    return this.http.get<Response<User[]>>('/api/users').pipe(
      map(res => res.payload)
    );
  }

  public upsertUser(user: User) {
    return user.user_id
      ? this.http.post('/api/users/' + user.user_id, user)
      : this.http.put('/api/users', user);
  }

  public deleteUser(id) {
    return this.http.delete('/api/users/' + id);
  }

  public loadUserById(userId: number): Observable<User|null> {
    return this.http.get<Response<User[]>>('/api/users/' + userId).pipe(
      map(res => res.payload.length ? res.payload[0] : null)
    );
  }

  public loadTasks(): Observable<Task[]> {
    return this.http.get<Response<Task[]>>('/api/tasks').pipe(
      map(response => response.payload)
    );
  }

  public loadTaskById(taskId: number): Observable<Task|null> {
    return this.http.get<Response<Task[]>>('/api/tasks/' + taskId).pipe(
      map(response => response.payload.length ? response.payload[0] : null)
    );
  }

  public upsertTask(task: Task) {
    return task.task_id
      ? this.http.post('/api/tasks/' + task.task_id, task)
      : this.http.put('/api/tasks', task);
  }

  public deleteTask(task: Task) {
    return this.http.delete('/api/tasks/' + task.task_id);
  }

  public upsertTaskProgress(progress: TaskProgress) {
    return progress.task_progress_id
      ? this.http.post('/api/progress/' + progress.task_progress_id, progress)
      : this.http.put('/api/progress', progress);
  }

  public loadProgressByTask(taskId: number): Observable<TaskProgress[]> {
    return this.http.get<Response<TaskProgress[]>>('/api/tasks/' + taskId + '/progress').pipe(
      map(res => res.payload)
    );
  }

  public addProgressByTask(taskId: number, progress: number) {
    return this.http.post('/api/tasks/' + taskId + '/progress', {progress});
  }

  public loadTree(): Observable<TreeNode[]> {
    return this.http.get<Response<TreeNode[]>>('/api/tree').pipe(
      map(res => res.payload)
    );
  }

  public loadGroups(): Observable<Group[]> {
    return this.http.get<Response<Group[]>>('/api/groups').pipe(
      map(res => res.payload)
    );
  }

  public loadPopulatedGroups(): Observable<Group[]> {
    return this.http.get<Response<PopulatedGroupResponse[]>>('/api/populated-groups').pipe(
      map(res => res.payload.map(populatedGroup => {
        const group = populatedGroup.group;
        group.users = populatedGroup.users;
        return group;
      }))
    );
  }
}
