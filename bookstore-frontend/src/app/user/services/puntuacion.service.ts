import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { reviews } from '../interfaces/reviews';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PuntuacionService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private authSerive: AuthService) {}

  //funcion para obtener todas las puntuaciones en base a un libro
  obtenerTodasPuntuacionLibro(id: string): Observable<reviews> {
    console.log(`${this.baseUrl}/reviews/${id}`);

    return this.http.get<reviews>(`${this.baseUrl}/reviews/${id}`);
  }
}
