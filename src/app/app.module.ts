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
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatProgressBarModule,
  MatRippleModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatExpansionModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TreeComponent } from './tree/tree.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskProgressListComponent } from './task-progress-list/task-progress-list.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreePageComponent } from './tree-page/tree-page.component';
import { AssigneesColumnComponent } from './assignees-column/assignees-column.component';
import { UsersColumnRowComponent } from './users-column-row/users-column-row.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LogoComponent } from './logo/logo.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group/group.component';
import { GroupColumnRowComponent } from './group-column-row/group-column-row.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';

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
    AssigneesColumnComponent,
    UsersColumnRowComponent,
    LogoComponent,
    GroupListComponent,
    GroupComponent,
    GroupColumnRowComponent,
    AuthPageComponent,
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
    MatRippleModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
