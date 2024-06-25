import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAutoresPageComponent } from './pages/list-autores-page/list-autores-page.component';
import { AutorPageComponent } from './pages/autor-page/autor-page.component';
import { ListLibrosPageComponent } from './pages/list-libros-page/list-libros-page.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { MisComprasPageComponent } from './pages/mis-compras-page/mis-compras-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    ListAutoresPageComponent,
    AutorPageComponent,
    ListLibrosPageComponent,
    LibroPageComponent,
    UserPageComponent,
    CartPageComponent,
    MisComprasPageComponent,
    LayoutPageComponent,
    ShoppingPageComponent,
    PedidoPageComponent,
    UsuarioPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
