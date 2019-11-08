import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersColumnRowComponent } from './users-column-row.component';

describe('UsersColumnRowComponent', () => {
  let component: UsersColumnRowComponent;
  let fixture: ComponentFixture<UsersColumnRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersColumnRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersColumnRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
