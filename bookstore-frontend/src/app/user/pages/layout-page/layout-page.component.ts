import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  //usuario:Usuario = this.authService.usuario;

  public sidebarItems = [
    {
      label: 'Autores',
      icon: 'groups_3',
      url: './list-autores'
    },
    {
      label: 'Libros',
      icon: 'book_2',
      url: './list-libros'
    },
    {
      label: 'Carrito',
      icon: 'shopping_cart',
      url: './cart'
    },
    {
      label: 'Mis Pedidos',
      icon: 'inventory_2',
      url: './list-mis-pedidos'
    },
    {
      label: 'Mi Usuario',
      icon: 'person',
      url: './mi-usuario'
    }
  ]

  constructor( private authService: AuthService,
               private router: Router) {}

  logOut():void {
    //this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
