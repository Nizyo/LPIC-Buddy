import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamScComponent } from './exam-sc.component';

describe('ExamScComponent', () => {
  let component: ExamScComponent;
  let fixture: ComponentFixture<ExamScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
