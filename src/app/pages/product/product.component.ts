import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../data/product';
import { ProductFilterPipe } from "../../pipes/product-filter.pipe";
import { FormsModule } from '@angular/forms';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryComponent } from "../category/category.component";
import { UserService } from '../../services/user/user.service';
import { Cart, User } from '../../data/user';

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
      this.api.getProducts(params["categoryId"]).subscribe(
        (data) => {
          this.products = data;
        });
    });    
  }

  addProductToCart(product: Product) {
    let id = localStorage.getItem("userId");

    this.userService.getUser(id!).subscribe( data => {
      let cartProduct : Cart[] = data.cart?.filter(x => x.productId === product.id)!;
      console.log(cartProduct);
      
      if(cartProduct.length == 0) 
        data.cart!.push({ "productId" : product.id, "count" : 1 } as Cart);
      else cartProduct[0].count! += 1;
      
      console.log(data);
      this.userService.updateUsersCart(data, product).subscribe( x =>  
        this.alertify.success(x.name + " sepete eklendi")
      );
      
    });
  }
}

