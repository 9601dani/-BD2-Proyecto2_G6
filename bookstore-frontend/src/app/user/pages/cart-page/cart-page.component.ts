import { Component, OnInit } from '@angular/core';

interface prueba {
  id: number;
  nombre: string;
  cantidad: string;
  precio: number;
}
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  // para las columnas de la tablas
  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'accion'];
  //suma
  sumaTotal!: number;
  eliminado: boolean = false;

  productos: prueba[] = [
    { id: 1, nombre: 'Producto 1', cantidad: '1', precio: 100 },
    { id: 2, nombre: 'Producto 2', cantidad: '2', precio: 150 },
    { id: 3, nombre: 'Producto 3', cantidad: '3', precio: 200 },
    { id: 4, nombre: 'Producto 4', cantidad: '4', precio: 250 },
    { id: 5, nombre: 'Producto 5', cantidad: '5', precio: 300 },
    { id: 6, nombre: 'Producto 6', cantidad: '6', precio: 350 },
    { id: 7, nombre: 'Producto 7', cantidad: '7', precio: 400 },
    { id: 8, nombre: 'Producto 8', cantidad: '8', precio: 450 },
    { id: 9, nombre: 'Producto 9', cantidad: '9', precio: 500 },
    { id: 10, nombre: 'Producto 10', cantidad: '10', precio: 550 },
  ];

  // ahora si aca todo el funcionamiento
  //sumar
  sumaTotalFunc() {
    this.sumaTotal = this.productos.reduce(
      (sum, valores) => sum + valores.precio * parseInt(valores.cantidad),
      0
    );
  }

  // para eliminar todo
  eliminarCarrito() {
    this.productos = [];
    this.eliminado = !this.eliminado;
  }

  // para eliminar un dato determinado
  eliminarId(id: number) {
    this.productos = this.productos.filter((valores) => valores.id !== id);

    this.sumaTotalFunc();
  }

  ngOnInit(): void {
    this.sumaTotalFunc();
  }
}
