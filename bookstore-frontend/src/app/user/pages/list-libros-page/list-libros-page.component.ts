import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';
import { ModalComprasComponent } from '../modal-compras/modal-compras.component';

interface valores {
  id: number;
  valor: string;
  dinero: number;
  cantidad: number;
}
@Component({
  selector: 'app-list-libros-page',
  templateUrl: './list-libros-page.component.html',
  styles: [],
})
export class ListLibrosPageComponent implements OnInit {
  listadoAutores: valores[] = [
    { id: 1, valor: 'hola', dinero: 903.55, cantidad: 10 },
    { id: 2, valor: 'adios', dinero: 85, cantidad: 65 },
    { id: 3, valor: 'simon', dinero: 56, cantidad: 34 },
    { id: 4, valor: 'prueba', dinero: 96.5, cantidad: 17 },
    { id: 5, valor: 'aaa', dinero: 10, cantidad: 16 },
    { id: 6, valor: 'hola', dinero: 69.33, cantidad: 30 },
    { id: 7, valor: 'adios', dinero: 63.12, cantidad: 20 },
    { id: 8, valor: 'simon', dinero: 45, cantidad: 60 },
    { id: 9, valor: 'prueba', dinero: 100.5, cantidad: 54 },
    { id: 10, valor: 'aaa', dinero: 65.65, cantidad: 12 },
    { id: 11, valor: 'hola', dinero: 58.45, cantidad: 2 },
    { id: 12, valor: 'adios', dinero: 3.55, cantidad: 4 },
    { id: 13, valor: 'simon', dinero: 43.55, cantidad: 5 },
    { id: 14, valor: 'prueba', dinero: 453.25, cantidad: 145 },
    { id: 15, valor: 'aaa', dinero: 23.78, cantidad: 30 },
    { id: 16, valor: 'final', dinero: 323, cantidad: 4 },
  ];

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<valores> = new MatTableDataSource<valores>(
    this.listadoAutores
  );

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  // para el editar
  comprasEspecifico(valores: any) {
    this.dialog.open(ModalComprasComponent, {
      width: '50%',
      height: '200px',
      data: valores,
    });
  }

  ngOnInit() {
    // solo que detecte cambos y genere el paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    console.log(this.dataSource.filteredData);
  }
}
