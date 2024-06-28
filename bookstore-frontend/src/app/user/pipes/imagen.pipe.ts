import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';


@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform( libro: any  ): string {
    
    if ( libro.photo ) {

      return `https://demo-usac-upload-image.s3.amazonaws.com/${ libro.photo }`;
    }

    if(libro.imagen_url){
      return `https://demo-usac-upload-image.s3.amazonaws.com/${ libro.imagen_url }`;
    }

    return `assets/images/no-image.jpg`;
    }


}







