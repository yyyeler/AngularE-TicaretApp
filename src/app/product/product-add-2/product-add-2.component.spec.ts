import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdd2Component } from './product-add-2.component';

describe('ProductAdd2Component', () => {
  let component: ProductAdd2Component;
  let fixture: ComponentFixture<ProductAdd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdd2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAdd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
