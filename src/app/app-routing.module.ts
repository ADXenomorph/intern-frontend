import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskProgressListComponent} from './task-progress-list/task-progress-list.component';
import {TreePageComponent} from './tree-page/tree-page.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'progress', component: TaskProgressListComponent },
  { path: 'tree', component: TreePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
