import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneesColumnComponent } from './assignees-column.component';

describe('AssigneesColumnComponent', () => {
  let component: AssigneesColumnComponent;
  let fixture: ComponentFixture<AssigneesColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneesColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneesColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
