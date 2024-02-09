import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAllComponent } from './learn-all.component';

describe('LearnAllComponent', () => {
  let component: LearnAllComponent;
  let fixture: ComponentFixture<LearnAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
