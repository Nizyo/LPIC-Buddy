import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMcComponent } from './exam-mc.component';

describe('ExamMcComponent', () => {
  let component: ExamMcComponent;
  let fixture: ComponentFixture<ExamMcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamMcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
