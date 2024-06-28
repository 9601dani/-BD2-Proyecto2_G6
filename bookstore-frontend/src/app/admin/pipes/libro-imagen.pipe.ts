import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from '../interfaces/libro.interface';

@Pipe({
  name: 'libroImagen',
  pure: false
})
export class LibroImagenPipe implements PipeTransform {

  transform( libro: Libro  ): string {
    if ( libro.imagen_url ) {

      return `https://demo-usac-upload-image.s3.amazonaws.com/${ libro.imagen_url }`;
    }

    return `assets/images/no-image.jpg`;
    }

}
