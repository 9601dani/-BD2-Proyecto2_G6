import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-list-pedidos-page',
  templateUrl: './list-pedidos-page.component.html',
  styles: [
  ]
})
export class ListPedidosPageComponent implements OnInit {

  public ordenes: Order[] = [];
  nombreAutor!: string;
  arreglobook: string[] = [];
  libroActual!: Libro;

  constructor( private orderService: OrderService,
               private bookService : LibroService
   ) {}

  ngOnInit(): void {
    this.orderService.getOrdenes()
      .subscribe( (ordenes:any) =>{
        this.ordenes = ordenes.orders
        console.log(ordenes)
      } );
  }

}
