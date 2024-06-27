// src/app/pages/mis-compras-page/mis-compras-page.component.ts
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service'; 
import { Order } from '../../interfaces/order.interface'; 

@Component({
  selector: 'app-mis-compras-page',
  templateUrl: './mis-compras-page.component.html',
  styleUrls: ['./pedidos.css'],
})
export class MisComprasPageComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {
    this.getOrdersByUserId();
    //this.getOrders();
  }


  public getOrders(){
    this.ordersService.getOrders().subscribe(orders => {
      if(!orders){
        return;
      }
      this.orders = orders;
      console.log('Ordenes de todos los usuarios: ', orders)
    })
  }

  public getOrdersByUserId(){
    this.ordersService.getOrdersByUser('667d0f588e637d0bf5ab7736').subscribe(orders => {
      if(!orders){
        return;
      }
      this.orders = orders;
      console.log('Ordenes: ', orders)
    })
  }

  ngOnInit():void  {
    
  }

}
