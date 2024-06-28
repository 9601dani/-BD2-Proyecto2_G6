import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./user-page.css'],
})
export class UsuarioPageComponent implements OnInit {
  public usuario: Usuario | undefined;

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsersService,
    private usuarioServicio: AuthService
  ) {
    this.getUser();
  }

  getUser() {
    
    this.usuarioService.getUserByID(this.usuarioServicio.usuario._id).subscribe(usuario => {
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
