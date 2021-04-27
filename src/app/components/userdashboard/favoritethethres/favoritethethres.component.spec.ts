import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritethethresComponent } from './favoritethethres.component';

describe('FavoritethethresComponent', () => {
  let component: FavoritethethresComponent;
  let fixture: ComponentFixture<FavoritethethresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritethethresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritethethresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
