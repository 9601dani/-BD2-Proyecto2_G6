import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./user-page.css'],
})
export class UsuarioPageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  // para el editar
  editarInformacion() {
    this.dialog.open(ModalEdicionUsuarioComponent, {
      width: '40%',
      height: '450px',
    });
  }

  ngOnInit(): void {}
}
