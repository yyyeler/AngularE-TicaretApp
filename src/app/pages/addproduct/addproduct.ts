import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../data/product';
import { CommonModule } from '@angular/common';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { AllcountService, Count } from '../../services/allcount/allcount.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
  providers:[CategoryService, ProductService]
})
export class AddProductComponent implements OnInit {
  protected productAddForm! : FormGroup;
  protected product : Product = new Product();
  protected categories! : Category[];
  protected count : Count = new Count();

  constructor(private formBuilder : FormBuilder,
              private categoryService : CategoryService, 
              private productService : ProductService, 
              private alertifyService : AlertifyService,
              private allcountService : AllcountService) { }

  ngOnInit(): void 
  {
    this.allcountService.getCount(1).subscribe(data => {
      this.count = data;
      this.product.id = this.count["count"]! + 1;
    });

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
      this.count["count"]!++;
  
      this.product = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(this.product).subscribe(
        data => {
          this.alertifyService.success(data.name+" ürünü başarıyla eklendi");
        }
      );
      
      this.allcountService.updateCount(this.count).subscribe();
    }
  }
}
