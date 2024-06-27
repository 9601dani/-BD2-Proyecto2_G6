export interface ventas {
  fecha_pedido: String;
  estado: String;
  precio_total: Number;
  id_usuario: string;
  direccion_envio: String;
  metodo_pago: String;
  libros: detalle[];
}

export interface detalle {
  id_libro: string;
  subtotal: Number;
  cantidad: Number;
}
