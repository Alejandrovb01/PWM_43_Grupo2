import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMenuItemComponent } from './dish-menu-item.component';

describe('DishMenuItemComponent', () => {
  let component: DishMenuItemComponent;
  let fixture: ComponentFixture<DishMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
