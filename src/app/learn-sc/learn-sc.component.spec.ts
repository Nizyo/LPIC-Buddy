import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnScComponent } from './learn-sc.component';

describe('LearnScComponent', () => {
  let component: LearnScComponent;
  let fixture: ComponentFixture<LearnScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
