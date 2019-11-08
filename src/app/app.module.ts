import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule, MatTableModule, MatSortModule, MatProgressBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule} from '@angular/forms';
import { TreeComponent } from './tree/tree.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskProgressListComponent } from './task-progress-list/task-progress-list.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreePageComponent } from './tree-page/tree-page.component';
import { UsersColumnComponent } from './users-column/users-column.component';
import { UsersColumnRowComponent } from './users-column-row/users-column-row.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LogoComponent } from './logo/logo.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavigationComponent,
    UserComponent,
    UserFormComponent,
    TreeComponent,
    TasksComponent,
    TaskComponent,
    TaskFormComponent,
    TaskProgressListComponent,
    TreeNodeComponent,
    TreePageComponent,
    UsersColumnComponent,
    UsersColumnRowComponent,
    LogoComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    DragDropModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
