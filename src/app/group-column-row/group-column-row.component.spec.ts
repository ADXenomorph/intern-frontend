import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupColumnRowComponent } from './group-column-row.component';

describe('GroupColumnRowComponent', () => {
  let component: GroupColumnRowComponent;
  let fixture: ComponentFixture<GroupColumnRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupColumnRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupColumnRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
