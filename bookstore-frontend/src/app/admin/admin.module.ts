import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddAutorPageComponent } from './pages/add-autor-page/add-autor-page.component';
import { AddLibroPageComponent } from './pages/add-libro-page/add-libro-page.component';
import { ListAutoresPageComponent } from './pages/list-autores-page/list-autores-page.component';
import { ListLibrosPageComponent } from './pages/list-libros-page/list-libros-page.component';
import { ListPedidosPageComponent } from './pages/list-pedidos-page/list-pedidos-page.component';
import { TopLibrosPageComponent } from './pages/top-libros-page/top-libros-page.component';
import { AutorPageComponent } from './pages/autor-page/autor-page.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from './components/book-card/book-card.component';
import { AutorCardComponent } from './components/autor-card/autor-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PedidoCardComponent } from './components/pedido-card/pedido-card.component';
import { StartsCardComponent } from './components/starts-card/starts-card.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { AutorImagenPipe } from './pipes/autor-imagen.pipe';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AddAutorPageComponent,
    AddLibroPageComponent,
    ListAutoresPageComponent,
    ListLibrosPageComponent,
    ListPedidosPageComponent,
    TopLibrosPageComponent,
    AutorPageComponent,
    LibroPageComponent,
    PedidoPageComponent,
    BookCardComponent,
    AutorCardComponent,
    ConfirmDialogComponent,
    PedidoCardComponent,
    StartsCardComponent,
    ReviewCardComponent,
    AutorImagenPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
