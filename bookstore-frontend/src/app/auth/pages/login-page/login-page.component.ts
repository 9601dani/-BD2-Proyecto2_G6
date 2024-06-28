import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  miFormulario: FormGroup = this.fb.group({
    email:   [ '', [Validators.required] ],
    password: [ '', [Validators.required, Validators.minLength( 6 )]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService :AuthService,
               private snackbar: MatSnackBar ) {}

  login(){
    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password )
                        .subscribe( ok => {
                          if( ok === true ){
                            this.showSnackbar(`${this.authService.usuario.username[0].toUpperCase()}${this.authService.usuario.username.substring(1)} se ha iniciado tu sesión correctamente`)

                            switch ( this.authService.usuario.rol ) {

                              case 'COMMON_ROLE':
                                this.router.navigateByUrl('/user');
                              break;
                              case 'ADMIN_ROLE':
                                this.router.navigateByUrl('/admin')
                              break;
                              default:
                                break;
                            }
                          }else{
                            Swal.fire( 'Error', ok, 'error')
                          }
                        })
  }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
