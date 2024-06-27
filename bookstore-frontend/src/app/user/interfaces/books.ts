export interface books {
  _id: string;
  titulo: String;
  autor: String;
  descripcion: String;
  genero: String;
  fecha_publicacion: Date;
  disponibilidad: Boolean;
  cantidad_stock: Number;
  puntuacion_promedio: Number;
  precio: Number;
  imagen_url: String;
}
