import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskProgressListComponent} from './task-progress-list/task-progress-list.component';
import {TreePageComponent} from './tree-page/tree-page.component';
import {GroupListComponent} from './group-list/group-list.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {AccountPageComponent} from './account-page/account-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/progress', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'progress', component: TaskProgressListComponent },
  { path: 'tree', component: TreePageComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'account', component: AccountPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
