import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAutorPageComponent } from './pages/add-autor-page/add-autor-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AutorPageComponent } from './pages/autor-page/autor-page.component';
import { ListAutoresPageComponent } from './pages/list-autores-page/list-autores-page.component';
import { ListLibrosPageComponent } from './pages/list-libros-page/list-libros-page.component';
import { AddLibroPageComponent } from './pages/add-libro-page/add-libro-page.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { ListPedidosPageComponent } from './pages/list-pedidos-page/list-pedidos-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { TopLibrosPageComponent } from './pages/top-libros-page/top-libros-page.component';

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
        path: 'new-autor',
        component: AddAutorPageComponent
      },
      {
        path: 'autor/:id',
        component: AutorPageComponent
      },
      {
        path: 'edit-autor/:id',
        component: AddAutorPageComponent
      },
      {
        path: 'list-libros',
        component: ListLibrosPageComponent
      },
      {
        path: 'new-book',
        component: AddLibroPageComponent
      },
      {
        path: 'libro/:id',
        component: LibroPageComponent
      },
      {
        path: 'edit-libro/:id',
        component: AddLibroPageComponent
      },
      {
        path: 'list-pedidos',
        component: ListPedidosPageComponent
      },
      {
        path: 'edit-pedido/:id',
        component: PedidoPageComponent
      },
      {
        path: 'libros-vendidos',
        component: TopLibrosPageComponent
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
export class AdminRoutingModule { }
