import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFillinComponent } from './exam-fillin.component';

describe('ExamFillinComponent', () => {
  let component: ExamFillinComponent;
  let fixture: ComponentFixture<ExamFillinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFillinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamFillinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
