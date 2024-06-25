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
    nombre:     [ '', [Validators.required] ],
    email:      [ '', [Validators.required, Validators.email]],
    direccion:  [ '', [Validators.required, Validators.minLength( 6 )]],
    telefono:   [ '', [Validators.required, Validators.min( 1 )]],
    password:   [ '', [Validators.required, Validators.minLength( 6 )]]
  });

  constructor( private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar ) {}

  registro(){}

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
