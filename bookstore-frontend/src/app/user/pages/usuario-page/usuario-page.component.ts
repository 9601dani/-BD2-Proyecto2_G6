import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrls: ['./user-page.css'],
})
export class UsuarioPageComponent implements OnInit {
  public usuario!:Usuario;


  
  constructor(public dialog: MatDialog ,
    private usuarioService: UsersService
    ) {
      //Inyeccion de dependencia
      this.getUser();
      //console.log("llega aqui??>")
    }

    public getUser(){
      this.usuarioService.getUserByID('667d0f588e637d0bf5ab7736').subscribe (usuario=>{
        if(!usuario){
          return 
        }
        this.usuario = usuario;
        console.log(usuario);

      })
    }
  


  // para el editar
  editarInformacion() {
    this.dialog.open(ModalEdicionUsuarioComponent, {
      width: '40%',
      height: '450px',
    });
  }

  ngOnInit(): void {}
}
