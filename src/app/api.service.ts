import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from './models/task';
import {Response} from './models/response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskProgress} from './models/task-progress';
import {TreeNode} from './models/tree-node';
import {User} from './models/user';

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

  public upsertUser(id, firstName, lastName) {
    return this.http.post('/api/users', {user_id: id, first_name: firstName, last_name: lastName});
  }

  public deleteUser(id) {
    return this.http.delete('/api/users/' + id);
  }

  public loadUserById(userId: number): Observable<User|null> {
    return this.http.get<Response<User[]>>('/api/users/' + userId).pipe(
      map(res => res.payload.length ? res.payload[0] : null)
    );
  }

  public loadOrders() {
    return this.http.get('/api/orders');
  }

  public upsertOrder(id, userId, itemName) {
    return this.http.post('/api/orders', {order_id: id, user_id: userId, item_name: itemName});
  }

  public deleteOrder(id) {
    return this.http.delete('/api/orders/' + id);
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
    return this.http.post('/api/tasks', task);
  }

  public deleteTask(task: Task) {
    return this.http.delete('/api/tasks/' + task.task_id);
  }

  public upsertTaskProgress(progress: TaskProgress) {
    return this.http.post('/api/progress', progress);
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
}
