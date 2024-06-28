
export interface Order{
  _id             : string;
  fecha_pedido    : string;
  estado          : Estado;
  precio_total    : number;
  id_usuario      : string;
  direccion_envio : string;
  libros          : [ LibrosComprados ];
  metodo_pago     : string;
}

export interface LibrosComprados {
  id_libro        : string;
  subtotal        : number;
  cantidad        : number;
}

export enum Estado{
  enProceso = 'En proceso',
  enviado = 'Enviado',
  entregado = 'Entregado'
}


export interface OrderFinal{

}
