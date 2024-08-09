import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { Product } from '../../data/product';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { UserService } from '../../services/user/user.service';
import { Cart } from '../../data/user';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers:[CategoryService, ProductService]
})
export class CartComponent {
  protected cartForm! : FormGroup;
  protected products : Product[] = [];
  protected cart : Cart[] = [];
  protected urlExtension = "?";

  constructor(private formBuilder : FormBuilder,
              private productService : ProductService, 
              private userService : UserService,
              private alertifyService : AlertifyService) { }

  ngOnInit(): void 
  {
    this.userService.getUser(localStorage.getItem("userId")!).subscribe(
      data => {
        this.cart = data.cart!;
        console.log(this.cart);

        this.cart.forEach( prod => {
          this.urlExtension += "id="+prod.productId+"&";
        });

        this.urlExtension.substring(0,-1);

        console.log(this.urlExtension);
        this.productService.getProducts(this.urlExtension).subscribe(
          data => console.log(data)
        );
      });

    
    
    
  }

  getOrder()
  {
    console.log("getOrder");
  }
}
