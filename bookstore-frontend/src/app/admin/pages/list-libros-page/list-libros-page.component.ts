import { Component, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';


@Component({
  selector: 'app-list-libros-page',
  templateUrl: './list-libros-page.component.html',
  styles: [
  ]
})
export class ListLibrosPageComponent implements OnInit {

  public libros: Libro[] = [];

  constructor( private librosService: LibroService ) {}

  ngOnInit(): void {
    this.librosService.getLibros()
      .subscribe( libros =>{
        this.libros = libros
      } );
  }
}
