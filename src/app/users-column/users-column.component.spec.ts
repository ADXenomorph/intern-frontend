import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersColumnComponent } from './users-column.component';

describe('UsersColumnComponent', () => {
  let component: UsersColumnComponent;
  let fixture: ComponentFixture<UsersColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
