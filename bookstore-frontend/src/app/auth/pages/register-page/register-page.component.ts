import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  miFormulario: FormGroup = this.fb.group({
    username:          [ '', [Validators.required] ],
    complete_name:     [ '', [Validators.required, Validators.minLength( 4 )] ],
    phone:             [ '', [Validators.required, Validators.min( 1 )]],
    email:             [ '', [Validators.required, Validators.email]],
    address:           [ '', [Validators.required, Validators.minLength( 6 )]],
    password:          [ '', [Validators.required, Validators.minLength( 6 )]]
  });

  constructor( private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar ) {}

    registro(){
      const { username, complete_name, phone, email, address, password } = this.miFormulario.value;

      this.authService.registro( username, password, complete_name, email, phone, address )
                          .subscribe( ok => {
                            this.showSnackbar(`${this.authService.usuario.username[0].toUpperCase()}${this.authService.usuario.username.substring(1)} se ha creado con éxito`);

                            this.router.navigateByUrl('/user');
                          })
    }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
