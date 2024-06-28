import { libros } from 'src/app/models/libros';
import { autores } from '../../models/autores';
export interface Libro {
  _id                 : string;
  titulo              : string;
  autor               : TipoAutor;
  descripcion         : string;
  genero              : string;
  fecha_publicacion   : Date;
  disponibilidad      : boolean;
  cantidad_stock      : number;
  puntuacion_promedio : number;
  precio              : number;
  imagen_url          : string;
}

export interface TipoAutor {
  _id:        string;
  name:       string;
  photo:      string;
  biography:  string;
  active:     boolean;
}

export interface ResponseLibro {
  mesaage?:   string;
  value?:     Libro;
  deleted?:   Libro;
  updated?:   Libro;
}
