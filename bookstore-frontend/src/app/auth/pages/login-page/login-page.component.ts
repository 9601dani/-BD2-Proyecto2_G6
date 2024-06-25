import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre:   [ '', [Validators.required] ],
    password: [ '', [Validators.required, Validators.minLength( 6 )]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService :AuthService,
               private snackbar: MatSnackBar ) {}

  login(){

  }

  showSnackbar( message: string ): void{
    this.snackbar.open( message, 'ok', {
      duration: 3500
    })
  }
}
