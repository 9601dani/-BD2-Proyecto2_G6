export interface Book {
  _id: string;
  id_libro: string;
  subtotal: number;
  cantidad: number;
  nombre: string;
}

export interface Order {
  _id: string;
  fecha_pedido: string;
  estado: string;
  precio_total: number;
  id_usuario: string;
  direccion_envio: string;
  libros: Book[];
  metodo_pago: string;
}
