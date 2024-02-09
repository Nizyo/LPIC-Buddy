import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAllComponent } from './exam-all.component';

describe('ExamAllComponent', () => {
  let component: ExamAllComponent;
  let fixture: ComponentFixture<ExamAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
