import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListLibrosPageComponent } from '../list-libros-page/list-libros-page.component';
import { CarritoService } from '../../services/carrito.service';
import { libros } from 'src/app/models/libros';
import { books } from '../../interfaces/books';

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrls: ['./modal-compras.component.css'],
})
export class ModalComprasComponent implements OnInit {
  precioFinal!: number;
  cantidadTotal!: number;
  constructor(
    private referencia: MatDialogRef<ListLibrosPageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public valores: any,
    private carritoServicio: CarritoService
  ) {}
  //funcion para cerrar modal
  cerrar() {
    this.referencia.close();
  }

  // funcion que cuenta la cantidad de dinero
  cuentaDinero(event: any) {
    const newValue = event.target.value;

    this.precioFinal = newValue * this.valores.precio;
  }

  //funcion que agrega al carrito
  agregarAlCarro(libros: books, cantidad: number, precio: number) {
    this.carritoServicio.agregarCarrito(libros, precio, cantidad);
  }
  ngOnInit(): void {
    console.log(this.valores);
  }
}
