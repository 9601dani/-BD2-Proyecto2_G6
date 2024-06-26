import { Component } from '@angular/core';

interface prueba {
  nombre: string;
  cantidad: string;
  precio: string;
}
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent {
  // para las columnas de la tablas
  displayedColumns: string[] = ['name', 'cantidad', 'precio', 'accion'];

  productos: prueba[] = [
    { nombre: 'Producto 1', cantidad: '1', precio: '100' },
    { nombre: 'Producto 2', cantidad: '2', precio: '150' },
    { nombre: 'Producto 3', cantidad: '3', precio: '200' },
    { nombre: 'Producto 4', cantidad: '4', precio: '250' },
    { nombre: 'Producto 5', cantidad: '5', precio: '300' },
    { nombre: 'Producto 6', cantidad: '6', precio: '350' },
    { nombre: 'Producto 7', cantidad: '7', precio: '400' },
    { nombre: 'Producto 8', cantidad: '8', precio: '450' },
    { nombre: 'Producto 9', cantidad: '9', precio: '500' },
    { nombre: 'Producto 10', cantidad: '10', precio: '550' },
  ];

  // ahora si aca todo el funcionamiento
}
