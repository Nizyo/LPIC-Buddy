import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFillinComponent } from './learn-fillin.component';

describe('LearnFillinComponent', () => {
  let component: LearnFillinComponent;
  let fixture: ComponentFixture<LearnFillinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnFillinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFillinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
