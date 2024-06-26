import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

interface valores {
  id: number;
  valor: string;
  dinero: number;
}
@Component({
  selector: 'app-list-libros-page',
  templateUrl: './list-libros-page.component.html',
  styles: [],
})
export class ListLibrosPageComponent implements OnInit {
  listadoAutores: valores[] = [
    { id: 1, valor: 'hola', dinero: 903.55 },
    { id: 2, valor: 'adios', dinero: 85 },
    { id: 3, valor: 'simon', dinero: 56 },
    { id: 4, valor: 'prueba', dinero: 96.5 },
    { id: 5, valor: 'aaa', dinero: 10 },
    { id: 6, valor: 'hola', dinero: 69.33 },
    { id: 7, valor: 'adios', dinero: 63.12 },
    { id: 8, valor: 'simon', dinero: 45 },
    { id: 9, valor: 'prueba', dinero: 100.5 },
    { id: 10, valor: 'aaa', dinero: 65.65 },
    { id: 11, valor: 'hola', dinero: 58.45 },
    { id: 12, valor: 'adios', dinero: 3.55 },
    { id: 13, valor: 'simon', dinero: 43.55 },
    { id: 14, valor: 'prueba', dinero: 453.25 },
    { id: 15, valor: 'aaa', dinero: 23.78 },
    { id: 16, valor: 'final', dinero: 323 },
  ];

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<valores> = new MatTableDataSource<valores>(
    this.listadoAutores
  );

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // solo que detecte cambos y genere el paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    console.log(this.dataSource.filteredData);
  }
}
