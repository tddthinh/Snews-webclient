import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecruitmentComponent } from './table-recruitment.component';

describe('TableRecruitmentComponent', () => {
  let component: TableRecruitmentComponent;
  let fixture: ComponentFixture<TableRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
