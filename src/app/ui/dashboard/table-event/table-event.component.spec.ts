import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEventComponent } from './table-event.component';

describe('TableEventComponent', () => {
  let component: TableEventComponent;
  let fixture: ComponentFixture<TableEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
