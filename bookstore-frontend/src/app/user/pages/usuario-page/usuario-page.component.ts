import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./user-page.css'],
})
export class UsuarioPageComponent implements OnInit {
  public usuario: Usuario | undefined;

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsersService
  ) {
    this.getUser();
  }

  getUser() {
    this.usuarioService.getUserByID('667d0f588e637d0bf5ab7736').subscribe(usuario => {
      if (usuario) {
        this.usuario = usuario;
      }
    });
  }

  editarInformacion() {
    const dialogRef = this.dialog.open(ModalEdicionUsuarioComponent, {
      width: '40%',
      height: '450px',
      data: { usuario: this.usuario }
    });

    dialogRef.componentInstance.usuarioActualizado.subscribe(() => {
      this.getUser();
    });
  }

  ngOnInit(): void {}
}
