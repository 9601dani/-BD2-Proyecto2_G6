import { Component, OnInit } from '@angular/core';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edicion-usuario',
  templateUrl: './modal-edicion-usuario.component.html',
  styleUrls: ['./modal-edicion-usuario.component.css'],
})
export class ModalEdicionUsuarioComponent implements OnInit {
  constructor(private referencia: MatDialogRef<UserPageComponent>) {}

  //funcion para cerrar modal
  cerrar() {
    this.referencia.close();
  }

  ngOnInit(): void {}
}
