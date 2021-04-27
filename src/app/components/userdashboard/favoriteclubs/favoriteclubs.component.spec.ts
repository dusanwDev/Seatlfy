import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteclubsComponent } from './favoriteclubs.component';

describe('FavoriteclubsComponent', () => {
  let component: FavoriteclubsComponent;
  let fixture: ComponentFixture<FavoriteclubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteclubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
