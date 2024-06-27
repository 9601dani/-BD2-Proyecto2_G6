import { books } from './books';

export interface ventas {
  fecha_pedido: Date;
  estado: String;
  precio_total: Number;
  id_usuario: string;
  direccion_envio: String;
  metodo_pago: String;
  libros: detalle[];
}

export interface detalle {
  libro: books;
  sub_total: Number;
  cantidad: Number;
}
