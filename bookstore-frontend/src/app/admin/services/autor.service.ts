import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Autor, ResponseAutor } from '../interfaces/autor.interface';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private fileService: FileUploadService ) { }

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

  updateAutor( autor: Autor ): Observable<Autor> {
    if ( !autor._id ) throw Error('Autor id is required');
    return this.http.put<Autor>(`${ this.baseUrl }/authors/update/${ autor._id }`, autor );
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
}
