import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../data/product';
import { ProductFilterPipe } from "../../pipes/product-filter.pipe";
import { FormsModule } from '@angular/forms';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryComponent } from "../category/category.component";

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
    private activateRoute : ActivatedRoute
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

  addToCart(product: Product) {
    this.alertify.success(product.name + " sepete eklendi");
  }
}

