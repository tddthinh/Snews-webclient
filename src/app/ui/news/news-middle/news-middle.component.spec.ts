import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMiddleComponent } from './news-middle.component';

describe('NewsMiddleComponent', () => {
  let component: NewsMiddleComponent;
  let fixture: ComponentFixture<NewsMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
