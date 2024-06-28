import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FileUploadService } from './file-upload.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Libro, ResponseLibro, TipoAutor } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient,
               private authSerive: AuthService,
               private fileService: FileUploadService ) { }


  getLibros():Observable<Libro[]> {
    return this.http.get<Libro[]>(`${ this.baseUrl }/books/all`);
  }


  getLibrosByID( id: string ): Observable<Libro|undefined> {
    return this.http.get<Libro>(`${ this.baseUrl }/books/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getAutores(): Observable<TipoAutor[]> {
    return this.http.get<TipoAutor[]>(`${ this.baseUrl }/authors/active`);
  }

  addLibro( libro: Libro ): Observable<ResponseLibro> {
    const { _id, ...resto } = libro;
    return this.http.post<ResponseLibro>(`${ this.baseUrl }/books/add`, resto )
  }

  updateLibro( libro: Libro ): Observable<Libro> {
    if ( !libro._id ) throw Error('Libro id is required');
    return this.http.put<Libro>(`${ this.baseUrl }/books/update/${ libro._id }`, libro,);
  }

  deleteProductoById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/books/delete/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}
