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
      label: 'Agregar Autor',
      icon: 'group_add',
      url: './new-autor'
    },
    {
      label: 'Libros',
      icon: 'book_2',
      url: './list-libros'
    },
    {
      label: 'Agregar Libro',
      icon: 'auto_stories',
      url: './new-book'
    },
    {
      label: 'Pedidos Realizados',
      icon: 'local_shipping',
      url: './list-pedidos'
    },
    {
      label: 'Libros Más Vendidos',
      icon: 'trending_up',
      url: './libros-vendidos'
    },
  ]

  constructor( private authService: AuthService,
               private router: Router) {}

  logOut():void {
    //this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
