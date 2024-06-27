import { Component, OnInit } from '@angular/core';
import { Autor } from '../../interfaces/autor.interface';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-list-autores-page',
  templateUrl: './list-autores-page.component.html',
  styles: [
  ]
})
export class ListAutoresPageComponent implements OnInit {

  public autores: Autor[] = [];

  constructor( private autoresService: AutorService ) {}

  ngOnInit(): void {
    this.autoresService.getAutores()
      .subscribe( autores =>{
        this.autores = autores
      } );
  }
}
