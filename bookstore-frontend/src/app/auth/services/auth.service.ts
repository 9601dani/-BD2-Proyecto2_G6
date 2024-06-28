import { Injectable } from '@angular/core';
import { AuthResponse, Role, Usuario } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }

  constructor( private http: HttpClient ) { }

  registro( username: string, password: string, complete_name: string, email: string, phone: string, address: string ) {
    const url: string = `${this.baseUrl}/users/register`;
    // Obtener la fecha actual
    const today = new Date();

    // Formatear la fecha como desees
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11, así que sumamos 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`
    const body = { username, password, complete_name, email, phone, address, register_date: formattedDate, rol: Role.CommonRole, payment_method: 'Efectivo' };

    return this.http.post<Usuario>( url, body)
                    .pipe(
                      tap( res => {
                        if( res ) {
                          this._usuario = {
                            _id: res._id,
                            username: res!.username,
                            password: res!.password,
                            complete_name: res!.complete_name,
                            email:  res!.email,
                            phone:  res!.phone,
                            address:res!.address,
                            payment_method: res!.payment_method,
                            register_date: res!.register_date,
                            rol: res!.rol,
                          }
                        }
                      }),
                    );
  }

  login( email: string, password: string ) {
    const url: string = `${this.baseUrl}/users/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body)
                    .pipe(
                      tap( res => {
                        if( res.ok ) {
                          this._usuario = {
                            _id: res.user!._id,
                            username: res.user!.username,
                            password: res.user!.password,
                            complete_name: res.user!.complete_name!,
                            email:  res.user!.email,
                            phone:  res.user!.phone,
                            address:res.user!.address,
                            payment_method: res.user!.payment_method,
                            register_date: res.user!.register_date,
                            rol: res.user!.rol,
                            photo: res.user!.photo
                          }
                        }
                      }),
                      map( valide => valide.ok ),
                      catchError( err => of( err.error.message ))
                    );
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
