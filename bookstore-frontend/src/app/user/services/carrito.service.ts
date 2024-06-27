import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { books } from '../interfaces/books';
import { detalle, ventas } from '../interfaces/ventas';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly baseUrl: string = environment.baseUrl;
  //funcion para tener siempre el carrito
  private carrito: detalle[] = [];

  constructor(private http: HttpClient) {}
}
