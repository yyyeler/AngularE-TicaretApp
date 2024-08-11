import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../data/order';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../services/alertify/alertify.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  providers: [OrderService]
})
export class OrderComponent implements OnInit{
  protected title = "Siparişlerim";  
  protected emptyMessage = "Siparişiniz bulunmamaktadır.";
  protected userId! : string;
  protected orders : Order[] = [];
  protected orderKeys : boolean[] = [];

  constructor(private orderService : OrderService, private alertifyService : AlertifyService){}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")!;
    let urlExtension = "?userId="+this.userId;
    this.orderService.getOrders(urlExtension).subscribe(data => {
      this.orders = data;
      this.orders.forEach( i => {
        this.orderKeys[i.id!] = false;
      });
    });
  }

  deleteOrder(order:Order)
  {
    this.orderService.deleteOrder(order.id!).subscribe(data => {
      this.alertifyService.success("Siparişiniz başarıyla silindi");
    });
  }

  openOrder(id :number)
  {
    this.orderKeys[id] = !this.orderKeys[id];
  }
}
