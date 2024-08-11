import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../data/product';
import { ProductFilterPipe } from "../../pipes/product-filter.pipe";
import { FormsModule } from '@angular/forms';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryComponent } from "../category/category.component";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductFilterPipe, FormsModule, CategoryComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers : [ProductService]
})
export class ProductComponent implements OnInit{

  protected title: string = "Ürün Listesi";
  protected filterText: string = "";
  protected products: Product[] = [];
  protected urlExtension = "";

  constructor(
    private alertify: AlertifyService, 
    private api : ProductService,
    private activateRoute : ActivatedRoute,
    private userService : UserService
  ) { }

  ngOnInit(): void 
  {
    this.activateRoute.params.subscribe(params => 
    {
      this.urlExtension = params["categoryId"] ?"?categoryId="+params["categoryId"]:"";
      this.api.getProducts(this.urlExtension).subscribe(
        (data) => {
          this.products = data;
        });
    });    
  }

  addProductToCart(product: Product) {
    let id = localStorage.getItem("userId");

    this.userService.getUser(id!).subscribe( data => {
      let cartProduct : Product[] = data.cart?.filter(x => x.id === product.id)!;
      
      if(cartProduct.length == 0) 
      {
        product.cartCount = 1;
        data.cart!.push(product);
      }
      else cartProduct[0].cartCount! += 1;
      
      this.userService.updateUsersCart(data).subscribe( x =>  
        this.alertify.success(product.name + " sepete eklendi")
      );
      
    });
  }
}

