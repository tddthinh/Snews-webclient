import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTopicComponent } from './modal-topic.component';

describe('ModalTopicComponent', () => {
  let component: ModalTopicComponent;
  let fixture: ComponentFixture<ModalTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
