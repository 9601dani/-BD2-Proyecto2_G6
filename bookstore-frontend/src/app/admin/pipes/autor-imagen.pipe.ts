import { Pipe, PipeTransform } from '@angular/core';
import { Autor } from '../interfaces/autor.interface';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'autorImagen',
  pure: false
})
export class AutorImagenPipe implements PipeTransform {

    transform( autor: Autor  ): string {
    if ( autor.photo ) {

      return `http://localhost:3200/images/${ autor.photo }`;
    }

    return `assets/images/no-image.jpg`;
    }

}
