import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order } from '../interfaces/order.interface';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/pedidos/getTodosPedidos`)
      .pipe(
        catchError(error => of([]))
      )
  }

  getOrdersByUser(id_usuario: string): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/pedidos/getPedidosUsuario/${id_usuario}`)
      .pipe(
        catchError(error => of([]))
      )
  }

  getOrderByStatus(estado: string): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/pedidos/getPedidosByState/${estado}`)
      .pipe(
        catchError(error => of([]))
      )
  }



}
