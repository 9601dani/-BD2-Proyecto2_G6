import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { usuarios } from 'src/app/models/usuarios';
import { books } from '../../interfaces/books';
import { PuntuacionService } from '../../services/puntuacion.service';
import { reviews } from '../../interfaces/reviews';

@Component({
  selector: 'app-libro-page',
  templateUrl: './libro-page.component.html',
  styleUrls: ['./libros.css'],
})
export class LibroPageComponent implements OnInit {
  libro!: books;
  puntuaciones!: reviews[];
  cantidadPuntuacion!: Number;
  ArrayPuntuacion: number[] = [];
  ArregloEspecificoPuntuaciones: Number[][] = [];
  panelAbierto: boolean = false;

  constructor(private puntuacionServicio: PuntuacionService) {}
  // para la puntuacion
  verEstrellas() {
    if (this.libro.puntuacion_promedio !== undefined) {
      const valorCantidad = Math.round(
        this.libro.puntuacion_promedio.valueOf()
      );
      for (let index = 1; index <= valorCantidad; index++) {
        this.ArrayPuntuacion.push(index);
      }
    }
  }

  //funcion para el filtrado de los libros
  buscarLibto() {}
  // funcuin para las puntuacions

  obtenerPuntuaciones(id: string) {
    this.puntuacionServicio
      .obtenerTodasPuntuacionLibro(id)
      .subscribe((elementos: reviews[]) => {
        console.log(elementos);
        this.puntuaciones = elementos;
      });
  }

  // funcuin para las puntuacions

  verEstrellasEspecificas(puntuaciom: Number, indice: number) {
    if (puntuaciom !== undefined) {
      const valorCantidad = Math.round(puntuaciom.valueOf());
      this.ArregloEspecificoPuntuaciones[indice] = Array.from(
        { length: valorCantidad },
        (_, index) => index + 1
      );
    } else {
      this.ArregloEspecificoPuntuaciones[indice] = [];
    }
  }

  ngOnInit(): void {
    this.libro = history.state.item;
    this.obtenerPuntuaciones(this.libro._id);
    console.log(this.puntuaciones);

    this.verEstrellas();
  }
}
