import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListLibrosPageComponent } from '../list-libros-page/list-libros-page.component';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrls: ['./modal-compras.component.css'],
})
export class ModalComprasComponent implements OnInit {
  precioTotal!: number;
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

    this.precioTotal = newValue * this.valores.precio;
  }

  //funcion que agrega al carrito
  agregarAlCarro() {
    this.carritoServicio;
  }
  ngOnInit(): void {}
}
