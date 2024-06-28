import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Autor, ResponseAutor } from '../interfaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAutores():Observable<Autor[]> {
    return this.http.get<Autor[]>(`${ this.baseUrl }/authors/active`);
  }

  getImgById( id: string ): Observable<Blob|undefined> {
    return this.http.get(`${this.baseUrl}/upload/find/${id}`, { responseType: 'blob' })
    .pipe(
      catchError(error => of(undefined))
    );
  }

  addAutor( autor: Autor ): Observable<ResponseAutor> {
    const { _id, ...resto } = autor;

    return this.http.post<ResponseAutor>(`${ this.baseUrl }/authors/add/`, resto)
  }

  updateAutor( autor: Autor ): Observable<ResponseAutor> {
    if ( !autor._id ) throw Error('Autor id is required');
    return this.http.put<ResponseAutor>(`${ this.baseUrl }/authors/update/${ autor._id }`, autor );
  }

  deleteAutorById( id: string ): Observable<boolean> {
    if ( !id) throw Error('Autor id is required');
    return this.http.delete(`${ this.baseUrl }/authors/delete/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  getAutorByID( id: string ): Observable<Autor|undefined> {
    return this.http.get<Autor>(`${ this.baseUrl }/authors/find/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getAutorByName( name: string ): Observable<Autor[]|undefined> {
    return this.http.get<Autor[]>(`${ this.baseUrl }/authors/name/${ name }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }


}
