import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { reviews } from '../interfaces/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private readonly baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  // servicio de enviar resenias
  public enviarResenias(resenia: reviews): Observable<reviews> {
    return this.http.post<reviews>(`${this.baseUrl}/reviews/add`, resenia);
  }
}
