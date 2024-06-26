import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ListLibrosPageComponent } from '../list-libros-page/list-libros-page.component';

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrls: ['./modal-compras.component.css'],
})
export class ModalComprasComponent implements OnInit {
  precioFinal!: number;
  constructor(
    private referencia: MatDialogRef<ListLibrosPageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public valores: any
  ) {}
  //funcion para cerrar modal
  cerrar() {
    this.referencia.close();
  }

  cuentaDinero(event: any) {
    const newValue = event.target.value;

    this.precioFinal = newValue * this.valores.dinero;
  }
  ngOnInit(): void {}
}
