import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { detalle } from '../../interfaces/ventas';
import { reviews } from '../../interfaces/reviews';
import { books } from '../../interfaces/books';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  todoBien: boolean = false;
  todoMal: boolean = false;

  productos: detalle[] = [];
  direccion!: string;
  metodo!: string;

  opinionGenerada: reviews[] = [];
  librosComprados: any[] = [];
  nombresLibrosComprados: books[] = [];

  // para los reviews

  ratings!: number;
  review!: string;

  formatLabel(value: number): string {
    return `${value}`;
  }
  constructor(
    private carritoServicio: CarritoService,
    private reseniaServicio: ReviewsService,
    private usuarioServicio: AuthService
  ) {}

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
      .subscribe((response: any) => {
        if (response instanceof HttpErrorResponse) {
          this.todoMal = true;
          this.carritoServicio.limpiarTodo();
        } else {
          //limpia final
          this.carritoServicio.limpiarTodo();
          this.todoBien = true;

          for (let i = 0; i < response.libroIds.length; i++) {
            const libroComprado = {
              _id: response.libroIds[i],
              titulo: response.nombres[i],
            };
            this.librosComprados.push(libroComprado);
          }
          Swal.fire({  title: "Pedido realizado con éxito",
          text: "Registro exitoso del pedido",
          icon: "success"
        });
        }
      });
  }

  //funcion para enviar resenias
  enviarReview(id: string) {
    const libro = this.librosComprados.find((l) => l._id === id);

    if (libro) {
      const nuevaResenia = {
        id_book: id,
        id_user: this.usuarioServicio.usuario._id,
        rating: libro.ratings.toString(),
        review: libro.review,
      };

      this.reseniaServicio.enviarResenias(nuevaResenia).subscribe();
      Swal.fire({  title: "Reseña realizada con éxito",
      text: "Registro exitoso de su reseña, gracias por su tiempo.",
      icon: "success"
      });
    }
  }
  ngOnInit(): void {
    // se le asigna el observable
    console.log(this.usuarioServicio.usuario._id);

    this.carritoServicio.carrito$.subscribe((productos) => {
      this.productos = productos;
      this.sumaTotalFunc();
    });
  }
}
