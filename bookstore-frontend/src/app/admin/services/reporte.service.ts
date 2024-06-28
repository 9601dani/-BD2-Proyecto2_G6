import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteExit } from '../interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient ) { }

  getTopBooks():Observable<ReporteExit[]> {
    return this.http.get<ReporteExit[]>(`${ this.baseUrl }/users/top`);
  }
}
