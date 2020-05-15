import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAttendeeComponent } from './table-attendee.component';

describe('TableAttendeeComponent', () => {
  let component: TableAttendeeComponent;
  let fixture: ComponentFixture<TableAttendeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAttendeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
