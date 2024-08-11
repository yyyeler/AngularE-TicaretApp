import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Product } from '../../data/product';
import { User } from '../../data/user';
import { Order } from '../../data/order';
import { AllcountService, Count } from '../../services/allcount/allcount.service';
import { OrderService } from '../../services/order.service';
import { AlertifyService } from '../../services/alertify/alertify.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers:[OrderService]
})
export class CartComponent {
  protected cartForm! : FormGroup;
  protected user! : User;
  protected urlExtension = "?";
  protected totalCost = 0;
  protected title = "Sepetim";
  protected emptyMessage = "Sepetinizde ürün bulunmamaktadır!";
  protected order : Order = new Order();
  protected count : Count = new Count();

  constructor(private userService : UserService, 
              private allcountService : AllcountService, 
              private orderService : OrderService,
              private alertifyService : AlertifyService) { }

  ngOnInit(): void 
  {
    this.userService.getUser(localStorage.getItem("userId")!).subscribe(
      data => {
        this.user = data!;
        this.user.cart!.forEach(data => this.totalCost += (data.price!*data.cartCount!));
        this.order!.userId = this.user.id;
    });

    this.allcountService.getCount(4).subscribe(data => {
      this.count = data;
      this.order!.id = this.count["count"]! + 1;
    });
  }

  getOrder()
  {
    this.order!.userId = this.user.id;
    this.order!.products = this.user.cart!;
    this.order!.orderTime = new Date();
    this.order!.totalCost = this.totalCost;
    this.order!.address = "address 1";
    
    this.count["count"]!++;    

    this.orderService.addOrder(this.order!).subscribe(
      data => {
        this.alertifyService.success("Siparişiniz başarıyla verildi.")
      }
    );

    this.allcountService.updateCount(this.count).subscribe();
    this.user.cart = [];
    this.userService.updateUser(this.user).subscribe();

    this.totalCost = 0;
  }

  minusProduct(product : Product)
  {
    if( product.cartCount != 0) product.cartCount!--;
    this.recalculateTotalCost();
  }
  plusProduct(product : Product)
  {
    product.cartCount!++;    
    this.recalculateTotalCost();
  }
  deleteProduct(product : Product)
  {
    this.user.cart = this.user.cart?.filter( x => x.id != product.id );
    this.recalculateTotalCost();
  }

  recalculateTotalCost()
  {
    this.totalCost = 0;
    this.user.cart?.forEach ( x => this.totalCost += (x.price! * x.cartCount! ) ); 
  }
}
