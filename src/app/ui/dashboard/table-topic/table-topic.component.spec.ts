import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTopicComponent } from './table-topic.component';

describe('TableTopicComponent', () => {
  let component: TableTopicComponent;
  let fixture: ComponentFixture<TableTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
