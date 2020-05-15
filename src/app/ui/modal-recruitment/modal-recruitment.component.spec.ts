import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecruitmentComponent } from './modal-recruitment.component';

describe('ModalRecruitmentComponent', () => {
  let component: ModalRecruitmentComponent;
  let fixture: ComponentFixture<ModalRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
