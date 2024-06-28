export interface Usuario {
  _id             : string;
  username        : string;
  password        : string;
  complete_name   : string;
  email           : string;
  phone           : string;
  address         : string;
  register_date   : Date;
  rol             : Role;
  photo           ?: string;
  payment_method  : string;
}

export enum Role {
  CommonRole = "COMMON_ROLE",
  AdminRole = "ADMIN_ROLE"
}

export interface AuthResponse {
  user    ?: Usuario;
  ok      ?: boolean;
  message ?: string;
  error   ?: string;
}
