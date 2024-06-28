import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { books } from '../interfaces/books';
import { detalle, ventas } from '../interfaces/ventas';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly baseUrl: string = environment.baseUrl;
  //funcion para tener siempre el carrito
  private _carrito: detalle[] = [];
  private carritoSubject: BehaviorSubject<detalle[]> = new BehaviorSubject<
    detalle[]
  >([]);

  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient, private usuarioServicio: AuthService) {
    //carga todo en local
    this.cargarDetalleVentaLocal();
  }

  //guarda en local
  private guardarDetalleVentaLocal() {
    localStorage.setItem('detalleVenta', JSON.stringify(this._carrito));
    this.carritoSubject.next(this._carrito);
  }

  // Método para cargar
  private cargarDetalleVentaLocal() {
    const detalleVentaString = localStorage.getItem('detalleVenta');
    if (detalleVentaString) {
      this._carrito = JSON.parse(detalleVentaString);
      this.carritoSubject.next(this._carrito);
    }
  }

  // Método para vaciar el carrito y eliminar datos de localStorage
  agregarCarrito(libro: books, total: number, cantidad: number) {
    //en caso ya este ese elemento

    if (cantidad > 0) {
      const encontrado = this._carrito.find(
        (item) => item.libro._id === libro._id
      );
      if (!encontrado) {
        const detalleVentaAsignado: detalle = {
          libro: libro,
          sub_total: total,
          cantidad: cantidad,
        };
        this._carrito.push(detalleVentaAsignado);
      } else {
        encontrado.sub_total += total;
        encontrado.cantidad += cantidad;
      }
      this.guardarDetalleVentaLocal();
    }
  }

  //mostar en el carro
  mostrarCarrito() {
    return this._carrito;
  }

  //eliminar un objeto determinado
  eliminarLibro(id: detalle) {
    this._carrito = this._carrito.filter((item) => item !== id);
    this.guardarDetalleVentaLocal();
  }

  // limpiar carrito
  limpiarTodo() {
    this._carrito = [];
    localStorage.removeItem('detalleVenta');
    this.carritoSubject.next(this._carrito);
  }

  // pagar todo el carritotoday = new Date();

  public pagar(
    precioTotal: number,
    direccion_envio: string,
    metodo_pago: string
  ): Observable<ventas> {
    const fechaActual = new Date();
    const generarVenta: ventas = {
      fecha_pedido: fechaActual,
      estado: 'en proceso',
      precio_total: precioTotal,
      // aca falta el id del usuario logeado
      id_usuario: '667d978aa237593ddd53bf8e',
      direccion_envio: direccion_envio,
      metodo_pago: metodo_pago,
      libros: this._carrito,
    };
    return this.http.post<ventas>(
      `${this.baseUrl}/pedidos/venta`,
      generarVenta
    );
  }
}
