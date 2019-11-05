import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProgressListComponent } from './task-progress-list.component';

describe('TaskProgressListComponent', () => {
  let component: TaskProgressListComponent;
  let fixture: ComponentFixture<TaskProgressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskProgressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
