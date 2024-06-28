import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { ConfirmDialogOrderComponent } from '../confirm-dialog-order/confirm-dialog-order.component';
import { filter, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-pedido-card',
  templateUrl: './pedido-card.component.html',
  styles: [
  ]
})
export class PedidoCardComponent implements OnInit{
  @Input() order!: Order;
  nombreComprador !: string;
  nombreLibros !: string[];
  libroEncontrado !: Libro;
  orderMap = {
    '=1'      : 'Unidad',
    'other'   : 'Unidades'
  }
  dialog: any;
  constructor( private snackbar: MatSnackBar,
               private orderService: OrderService,
               private router: Router,){}

  ngOnInit(): void {
    this.orderService.getUsuario( this.order.id_usuario ).subscribe( res => {
      for( let libro of this.order.libros ){

        this.orderService.getLibrosByID( libro.id_libro ).subscribe( res=>{
          this.nombreLibros.push( res.titulo )
        })
      }
      this.nombreComprador = res.complete_name;
    })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

  actualizarEstado(){
    const dialogRef = this.dialog.open( ConfirmDialogOrderComponent, {
      data: this.order
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.orderService.actualizarEstado( this.order._id ))
      )
      .subscribe(() => {
        this.router.navigate(['/admin/list-autores']);
      });
  }
}
