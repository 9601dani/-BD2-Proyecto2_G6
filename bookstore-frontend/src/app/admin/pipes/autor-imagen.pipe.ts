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

      return `https://demo-usac-upload-image.s3.amazonaws.com/${ autor.photo }`;
    }

    return `assets/images/no-image.jpg`;
    }

}
