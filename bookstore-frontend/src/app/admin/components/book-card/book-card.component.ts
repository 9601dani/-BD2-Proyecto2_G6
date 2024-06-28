import { Component, Input } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autor.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styles: [
  ]
})
export class BookCardComponent {
  @Input() libro!: Libro;
  imagenObservable!: Observable<Blob|undefined>;
  nombreAutor!: string;
  imagenUrl: string = '';
  autor!: Autor;
  constructor( private snackbar: MatSnackBar,
               private autorService: AutorService ){}

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

  ngOnInit(): void {

    this.imagenUrl = `https://demo-usac-upload-image.s3.amazonaws.com/${ this.libro.imagen_url }`

  }
}
