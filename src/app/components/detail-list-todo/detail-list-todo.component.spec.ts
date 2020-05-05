import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListTodoComponent } from './detail-list-todo.component';

describe('DetailListTodoComponent', () => {
  let component: DetailListTodoComponent;
  let fixture: ComponentFixture<DetailListTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailListTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
