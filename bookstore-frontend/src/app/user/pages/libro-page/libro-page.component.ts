import { Component } from '@angular/core';

@Component({
  selector: 'app-libro-page',
  templateUrl: './libro-page.component.html',
  styleUrls: ['./libros.css'],
})
export class LibroPageComponent {
  listadoAutores: any[] = [
    { id: 1, valor: 'hola' },
    { id: 2, valor: 'adios' },
    { id: 3, valor: 'simon' },
    { id: 4, valor: 'prueba' },
    { id: 5, valor: 'aaa' },
    { id: 6, valor: 'hola' },
    { id: 7, valor: 'adios' },
    { id: 8, valor: 'simon' },
    { id: 9, valor: 'prueba' },
    { id: 10, valor: 'aaa' },
    { id: 11, valor: 'hola' },
    { id: 12, valor: 'adios' },
    { id: 13, valor: 'simon' },
    { id: 14, valor: 'prueba' },
    { id: 15, valor: 'aaa' },
    { id: 16, valor: 'final' },
  ];
  panelAbierto: boolean = false;
}
