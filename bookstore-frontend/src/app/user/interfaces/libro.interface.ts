export interface Libro {
    _id: string; // Campo de ID generado por MongoDB
    titulo: string;
    autor: string;
    descripcion: string;
    genero: string;
    fecha_publicacion: Date;
    disponibilidad: boolean;
    cantidad_stock: number;
    puntuacion_promedio: number;
    precio: number;
    imagen_url: string;
  }
  