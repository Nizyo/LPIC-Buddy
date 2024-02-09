import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAllComponent } from './check-all.component';

describe('CheckAllComponent', () => {
  let component: CheckAllComponent;
  let fixture: ComponentFixture<CheckAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
