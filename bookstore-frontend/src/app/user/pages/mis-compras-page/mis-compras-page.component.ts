// src/app/pages/mis-compras-page/mis-compras-page.component.ts
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { books } from '../../interfaces/books';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-mis-compras-page',
  templateUrl: './mis-compras-page.component.html',
  styleUrls: ['./pedidos.css'],
})
export class MisComprasPageComponent implements OnInit {
  orders: Order[] = [];
  books: books[] = [];

  books2: Array<Array<any>> = [];

  constructor(
    private ordersService: OrdersService,
    private librosService: LibrosService,
    private usuarioServicio: AuthService

  ) {
    this.getOrdersByUserId();
  }

  public getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      if (!orders) {
        return;
      }
      this.orders = orders;
      console.log('Ordenes de todos los usuarios: ', orders);
    });
  }

  public getOrdersByUserId() {
    this.ordersService
      .getOrdersByUser(this.usuarioServicio.usuario._id)
      .subscribe((orders: any) => {
        if (!orders) {
          return;
        }
        this.orders = orders;

        console.log('Ordenes: ', orders);
        console.log('libros: ', orders.libros);

        this.getBooksDetails();
      });
  }

  public getBooksDetails(): void {
    this.books2 = [];
    this.orders.forEach((order) => {
      let orderBooks: any[] = [];
      order.libros.forEach((libro) => {
        this.librosService.obtenerLibroId(libro._id).subscribe((valor) => {
          orderBooks.push(valor);
        });
      });

      this.books2.push(orderBooks);
    });

    // console.log(this.books2);
    // console.log(this.books2[42]);
    // console.log(this.books2[42].length);
    // this.books2[42][0] = 'hola';
    this.books2.forEach((element: any) => {
      element.array.forEach((element2: any) => {
        console.log(element2);
      });
    });
  }

  ngOnInit(): void {
    this.getOrdersByUserId();
  }
}
