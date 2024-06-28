import { Component, OnInit } from '@angular/core';
import { Autor } from '../../interfaces/autor.interface';
import { AuthorsService } from '../../services/authors.service';


@Component({
  selector: 'app-list-autores-page',
  templateUrl: './list-autores-page.component.html',
  styleUrls: ['./listaAutores.css']
})
export class ListAutoresPageComponent implements OnInit {
  autores: Autor[] = [];
  autoresBusqueda: Autor[] = [];
  

  public ruta = "https://demo-usac-upload-image.s3.amazonaws.com/"
  nombreLibro = ''

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.getAutores();
  }

  getAutoresNombres(){
    this.authorsService.getAutorByName(this.nombreLibro).subscribe(
      (autor:any) => {
        
        this.autores = autor
        
      },
      error => {
        console.error('Error al recuperar los autores:', error);
      }
    );
  }

  getAutores() {
    this.authorsService.getAutores().subscribe(
      autores => {
        this.autores = autores;
      },
      error => {
        console.error('Error al recuperar los autores:', error);
      }
    );
  }
}
