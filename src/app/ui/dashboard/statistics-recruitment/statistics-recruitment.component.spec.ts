import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsRecruitmentComponent } from './statistics-recruitment.component';

describe('StatisticsRecruitmentComponent', () => {
  let component: StatisticsRecruitmentComponent;
  let fixture: ComponentFixture<StatisticsRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
