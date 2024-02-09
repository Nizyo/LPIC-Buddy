import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFillinComponent } from './check-fillin.component';

describe('CheckFillinComponent', () => {
  let component: CheckFillinComponent;
  let fixture: ComponentFixture<CheckFillinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckFillinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckFillinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
