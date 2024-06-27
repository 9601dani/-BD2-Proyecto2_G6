import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autor, FileUploadResponse } from '../interfaces/autor.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private baseUrl: string = environment.baseUrl;
  private _nombreArchivo!: string;

  get nombreArchivo(){
    return this._nombreArchivo;
  }

  constructor( private http: HttpClient ) { }

  guardarImagenAutor( archivo: File ): Observable<FileUploadResponse> {
    const url: string = `${ this.baseUrl }/upload/add`;
    const formData = new FormData();
    formData.append('file', archivo);
    return this.http.post<FileUploadResponse>( url, formData )
                    .pipe(
                      tap( res => {
                        this._nombreArchivo = `${ res.fileName! }`;
                      }),
                    );
  }

  actualizarImagenAutor( autor: Autor, archivo: File ) {
    const url: string = `${ this.baseUrl }/upload/update/${ autor.photo }`;
    const formData = new FormData();
    formData.append('file', archivo);

    return this.http.put<FileUploadResponse>( url, formData )
                    .pipe(
                      tap( res => {
                        this._nombreArchivo = `${ res.fileName! }`;
                      }),
                    );
  }
}
