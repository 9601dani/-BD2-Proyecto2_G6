import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-autores-page',
  templateUrl: './list-autores-page.component.html',
  styleUrls: ['./listaAutores.css'],
})
export class ListAutoresPageComponent implements OnInit {
  listadoAutores: string[] = [
    'hola',
    'adios',
    'simon',
    'preuba',
    'aaa',
    'hola',
    'adios',
    'simon',
    'preuba',
    'aaa',
    'hola',
    'adios',
    'simon',
    'preuba',
    'aaa',
    'final',
  ];

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.listadoAutores
  );

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // solo que detecte cambos y genere el paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
}
