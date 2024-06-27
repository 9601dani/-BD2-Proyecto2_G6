import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { books } from '../interfaces/books';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private authSerive: AuthService) {}

  // funcion para obtener los libros

  obtenerTodosLibros(): Observable<books> {
    return this.http.get<books>(`${this.baseUrl}/books/all`);
  }
}
