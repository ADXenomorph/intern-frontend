import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {ApiService} from '../api.service';
import {PopulatedGroup} from '../models/populated-group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() group: PopulatedGroup;
  @Input() users: Observable<User[]>;
  @Output() afterRequest = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private api: ApiService) {
    this.setEmptyGroup();
  }

  private setEmptyGroup() {
    this.group = {group: {}, users: []} as PopulatedGroup;
  }

  ngOnInit(): void {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((name: string | User | null) => name ? this._filter(name) : this.users),
      map(users => users
        .filter(
          user => this.group.users.map(u => u.user_id).indexOf(user.user_id) === -1
        )
      )
    );
  }

  get isNew(): boolean {
    return !this.group.group.group_id;
  }

  save() {
    this.api.upsertGroup(this.group).subscribe(() => {
      this.afterRequest.emit();
      if (!this.group.group.group_id) {
        this.setEmptyGroup();
      }
    });
  }

  delete() {
    this.api.deleteGroup(this.group.group).subscribe(() => {
      this.afterRequest.emit();
    });
  }

  removeUser(user: User): void {
    const index = this.group.users.indexOf(user);

    if (index >= 0) {
      this.group.users.splice(index, 1);
    }

    this.userCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.group.users.push(event.option.value);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(name: string | User): Observable<User[]> {
    let filterValue = (name as string);
    if ((name as User).last_name) {
      const user = (name as User);
      filterValue = user.last_name + ' ' + user.first_name;
    }

    filterValue = filterValue.toLowerCase();

    return this.users.pipe(
      map(users => users
        .filter(
          user => (user.last_name + ' ' + user.first_name).toLowerCase().indexOf(filterValue) === 0
        )
      )
    );
  }

}
