import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheathreComponent } from './theathre.component';

describe('TheathreComponent', () => {
  let component: TheathreComponent;
  let fixture: ComponentFixture<TheathreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheathreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheathreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
