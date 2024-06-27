import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient){ }

  getUser():Observable<Usuario[]>{
    
    return this.http.get<Usuario[]>(`${ this.baseUrl }/users`);

  }

  getUserByID(id: string): Observable<Usuario|undefined>{
    return this.http.get<Usuario>(`${ this.baseUrl }/users/${id}`)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  updateUser(usuario: Usuario): Observable<Usuario>{
    if( !usuario._id) throw Error('User id is required');
    return this.http.put<Usuario>(`${ this.baseUrl }/users/${usuario._id}`, usuario);
  }
}
