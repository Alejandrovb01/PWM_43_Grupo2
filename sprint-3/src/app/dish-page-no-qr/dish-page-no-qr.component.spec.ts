import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishPageNoQrComponent } from './dish-page-no-qr.component';

describe('DishPageNoQrComponent', () => {
  let component: DishPageNoQrComponent;
  let fixture: ComponentFixture<DishPageNoQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishPageNoQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishPageNoQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
