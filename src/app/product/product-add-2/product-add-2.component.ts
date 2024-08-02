import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { Category } from '../../category/category';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { tap } from 'rxjs';
import { AlertifyService } from '../../services/alertify/alertify.service';

@Component({
  selector: 'app-product-add-2',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-add-2.component.html',
  styleUrl: './product-add-2.component.css',
  providers:[CategoryService, ProductService]
})
export class ProductAdd2Component implements OnInit {
  productAddForm! : FormGroup;
  product : Product = new Product();
  categories! : Category[];

  constructor(private formBuilder : FormBuilder,
              private categoryService : CategoryService, 
              private productService : ProductService, 
              private alertifyService : AlertifyService) { }

  ngOnInit(): void 
  {
    this.createProductAddForm();
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    );
  }

  createProductAddForm()
  {
    this.productAddForm = this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required],
      price:["",Validators.required],
      imageUrl:["",Validators.required],
      categoryId:["",Validators.required],
    });
  }

  add()
  {
    if(this.productAddForm.valid)
    {
      this.product = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(this.product).subscribe(
        data => {
          this.alertifyService.success(data.name+" ürünü başarıyla eklendi");
        }
      );
    }
  }
}
