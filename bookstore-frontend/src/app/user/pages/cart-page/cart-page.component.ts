import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { detalle } from '../../interfaces/ventas';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.css'],
})
export class CartPageComponent implements OnInit {
  // para las columnas de la tablas
  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'accion'];
  //suma
  sumaTotal!: number;
  eliminado: boolean = false;

  productos: detalle[] = [];
  direccion!: string;
  metodo!: string;

  constructor(private carritoServicio: CarritoService) {}

  // ahora si aca todo el funcionamiento
  //sumar
  sumaTotalFunc() {
    this.sumaTotal = this.productos.reduce(
      (sum, valores) => sum + Number(valores.sub_total),
      0
    );
  }

  // para eliminar todo
  eliminarCarrito() {
    this.carritoServicio.limpiarTodo();
    this.eliminado = true;
    this.carritoServicio.mostrarCarrito();
  }

  // para eliminar un dato determinado
  eliminarId(id: detalle) {
    this.carritoServicio.eliminarLibro(id);
    this.carritoServicio.mostrarCarrito();
    this.sumaTotalFunc();
  }

  //funcion para pagar todo si todo va bien()

  pagar() {
    this.carritoServicio
      .pagar(this.sumaTotal, this.direccion, this.metodo)
      .subscribe();
  }

  ngOnInit(): void {
    // se le asigna el observable
    this.carritoServicio.carrito$.subscribe((productos) => {
      this.productos = productos;
      this.sumaTotalFunc();
    });
  }
}
