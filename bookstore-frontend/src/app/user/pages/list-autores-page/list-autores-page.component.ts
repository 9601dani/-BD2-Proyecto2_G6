import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

interface valores {
  id: number;
  valor: string;
}

@Component({
  selector: 'app-list-autores-page',
  templateUrl: './list-autores-page.component.html',
  styleUrls: ['./listaAutores.css'],
})
export class ListAutoresPageComponent implements OnInit {
  listadoAutores: valores[] = [
    { id: 1, valor: 'hola' },
    { id: 2, valor: 'adios' },
    { id: 3, valor: 'simon' },
    { id: 4, valor: 'prueba' },
    { id: 5, valor: 'aaa' },
    { id: 6, valor: 'hola' },
    { id: 7, valor: 'adios' },
    { id: 8, valor: 'simon' },
    { id: 9, valor: 'prueba' },
    { id: 10, valor: 'aaa' },
    { id: 11, valor: 'hola' },
    { id: 12, valor: 'adios' },
    { id: 13, valor: 'simon' },
    { id: 14, valor: 'prueba' },
    { id: 15, valor: 'aaa' },
    { id: 16, valor: 'final' },
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
