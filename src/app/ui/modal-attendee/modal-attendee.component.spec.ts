import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAttendeeComponent } from './modal-attendee.component';

describe('ModalAttendeeComponent', () => {
  let component: ModalAttendeeComponent;
  let fixture: ComponentFixture<ModalAttendeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAttendeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
