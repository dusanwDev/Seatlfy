import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheathrescheduleComponent } from './theathreschedule.component';

describe('TheathrescheduleComponent', () => {
  let component: TheathrescheduleComponent;
  let fixture: ComponentFixture<TheathrescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheathrescheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheathrescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
