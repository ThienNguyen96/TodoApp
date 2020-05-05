import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTaskTodoComponent } from './detail-task-todo.component';

describe('DetailTaskTodoComponent', () => {
  let component: DetailTaskTodoComponent;
  let fixture: ComponentFixture<DetailTaskTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTaskTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTaskTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
