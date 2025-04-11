import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuQrComponent } from './menu-qr.component';

describe('MenuQrComponent', () => {
  let component: MenuQrComponent;
  let fixture: ComponentFixture<MenuQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
