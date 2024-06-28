import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor.interface';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autor-card',
  templateUrl: './autor-card.component.html',
  styles: [
  ]
})
export class AutorCardComponent {

  @Input() autor!: Autor;
  imagenObservable!: Observable<Blob|undefined>;

  imagenUrl: string = '';
  constructor( private snackbar: MatSnackBar,
               private autorService: AutorService ){}

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

  ngOnInit(): void {
    if ( !this.autor ) throw Error('Autor property is required');

    this.imagenUrl = `https://demo-usac-upload-image.s3.amazonaws.com/${ this.autor.photo }`

  }
}
