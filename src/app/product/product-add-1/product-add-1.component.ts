import { Component } from '@angular/core';
import { Product } from '../product';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../category/category';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { AlertifyService } from '../../services/alertify/alertify.service';

@Component({
  selector: 'app-product-add-1',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './product-add-1.component.html',
  styleUrl: './product-add-1.component.css',
  providers: [CategoryService,ProductService]
})
export class ProductAdd1Component {
  protected model: Product = new Product();
  protected categories : Category[] = [];

  constructor(private categoryService : CategoryService, private productService : ProductService, private alertifyService : AlertifyService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe( data => {
      this.categories = data;
    });

    console.log(this.categories);
  }

  protected add(form : NgForm)
  {
    this.productService.addProduct(this.model).subscribe(data => {
      this.alertifyService.success(data.name+" ürünü başarıyla eklendi");
    });
  }

}
