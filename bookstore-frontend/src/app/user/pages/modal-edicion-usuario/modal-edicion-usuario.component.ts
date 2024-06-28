import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-modal-edicion-usuario',
  templateUrl: './modal-edicion-usuario.component.html',
  styleUrls: ['./modal-edicion-usuario.component.css'],
})
export class ModalEdicionUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: Usuario | undefined;
  @Output() usuarioActualizado = new EventEmitter<void>(); // Evento para emitir cuando se actualice el usuario

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEdicionUsuarioComponent>,
    private usuarioService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }
  ) {
    this.usuario = data.usuario;

    this.usuarioForm = this.fb.group({
      complete_name: [this.usuario?.complete_name, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
      phone: [this.usuario?.phone, Validators.required],
      address: [this.usuario?.address, Validators.required],
    });
  }

  ngOnInit(): void {}

  actualizarUsuario() {
    if (this.usuarioForm.valid) {
      const updatedUser: Usuario = { ...this.usuarioForm.value, _id: this.usuario?._id };
      this.usuarioService.updateUser(updatedUser).subscribe(
        () => {
          this.dialogRef.close(true); // Cierra el modal indicando éxito
          this.usuarioActualizado.emit(); // Emitir evento de actualización
        },
        error => {
          console.error('Error actualizando usuario:', error);
          // Aquí puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje de error)
        }
      );
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
