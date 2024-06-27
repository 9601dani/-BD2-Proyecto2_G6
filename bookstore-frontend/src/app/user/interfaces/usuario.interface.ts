// usuario.interface.ts

export interface Usuario {
    _id?: string; // El _id es opcional porque será generado por MongoDB
    username: string;
    password: string;
    complete_name: string;
    email: string;
    phone?: string;
    address?: string;
    register_date?: Date;
    rol?: string;
    photo?: string;
    payment_method?: string;
  }
  