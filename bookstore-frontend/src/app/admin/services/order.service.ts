import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { FileUploadService } from './file-upload.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/user.interface';
import { Estado, Order } from '../interfaces/order.interface';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private fileService: FileUploadService ) { }

  getUsuario( id: string):Observable<Usuario> {
     return this.http.get<Usuario>(`${ this.baseUrl }/users/find/${ id }`);
  }

  getOrdenes():Observable<Order[]> {
    return this.http.get<Order[]>(`${ this.baseUrl }/pedidos/getPedidosByState/${ Estado.enProceso }`);
  }

  actualizarEstado( _id: string ):Observable<Order> {
    const estado: string = Estado.enviado;
    return this.http.put<Order>(`${ this.baseUrl }/pedidos/updatePedidoById/${ _id }`, { estado: estado });
  }

  getLibrosByID( id: string ): Observable<Libro> {
    return this.http.get<Libro>(`${ this.baseUrl }/books/${ id }`)
  }
}
