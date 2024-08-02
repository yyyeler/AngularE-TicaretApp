import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdd1Component } from './product-add-1.component';

describe('ProductAdd1Component', () => {
  let component: ProductAdd1Component;
  let fixture: ComponentFixture<ProductAdd1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdd1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAdd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
