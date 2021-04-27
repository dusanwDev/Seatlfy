import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtticketsComponent } from './boughttickets.component';

describe('BoughtticketsComponent', () => {
  let component: BoughtticketsComponent;
  let fixture: ComponentFixture<BoughtticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
