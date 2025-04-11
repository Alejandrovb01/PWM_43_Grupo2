import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMenuComponent } from './dish-menu.component';

describe('DishMenuComponent', () => {
  let component: DishMenuComponent;
  let fixture: ComponentFixture<DishMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
