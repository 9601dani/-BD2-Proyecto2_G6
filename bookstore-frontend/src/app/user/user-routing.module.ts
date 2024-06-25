import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListAutoresPageComponent } from './pages/list-autores-page/list-autores-page.component';
import { AutorPageComponent } from './pages/autor-page/autor-page.component';
import { ListLibrosPageComponent } from './pages/list-libros-page/list-libros-page.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';
import { MisComprasPageComponent } from './pages/mis-compras-page/mis-compras-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'list-autores',
        component: ListAutoresPageComponent
      },
      {
        path: 'autor/:id',
        component: AutorPageComponent
      },
      {
        path: 'list-libros',
        component: ListLibrosPageComponent
      },

      {
        path: 'libro/:id',
        component: LibroPageComponent
      },
      {
        path: 'cart',
        component: CartPageComponent
      },
      {
        path: 'shop',
        component: ShoppingPageComponent
      },
      {
        path: 'list-mis-pedidos',
        component: MisComprasPageComponent
      },
      {
        path: 'pedido/:id',
        component: PedidoPageComponent
      },
      {
        path: 'mi-usuario',
        component: UsuarioPageComponent
      },
      {
        path: '**',
        redirectTo: 'list-autores'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
