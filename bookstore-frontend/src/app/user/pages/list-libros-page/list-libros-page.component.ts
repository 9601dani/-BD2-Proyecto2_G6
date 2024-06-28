import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ModalEdicionUsuarioComponent } from '../modal-edicion-usuario/modal-edicion-usuario.component';
import { ModalComprasComponent } from '../modal-compras/modal-compras.component';
import { LibrosService } from '../../services/libros.service';
import { libros } from 'src/app/models/libros';
import { Router } from '@angular/router';
import { usuarios } from 'src/app/models/usuarios';

interface tipoFiltro {
  id: number;
  valor: string;
}
@Component({
  selector: 'app-list-libros-page',
  templateUrl: './list-libros-page.component.html',
  styles: [],
})
export class ListLibrosPageComponent implements OnInit {
  listadoAutores!: libros[];
  texto!: string;

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<libros> = new MatTableDataSource<libros>();

  // para las busquedas
  selectedValue!: string;
  tipoFiltro: tipoFiltro[] = [
    { id: 1, valor: 'titulo' },
    { id: 2, valor: 'autor' },
    { id: 3, valor: 'genero' },
    { id: 4, valor: 'precio' },
    { id: 5, valor: 'puntuacion' },
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private librosServicio: LibrosService,
    private router: Router
  ) {}

  // para el editar
  comprasEspecifico(libro: any) {
    this.dialog.open(ModalComprasComponent, {
      width: '50%',
      height: '200px',
      data: libro,
    });
  }

  // para los librozs
  verLibro(libroId: string, item: usuarios) {
    this.router.navigate(['/user/libro', libroId], { state: { item: item } });
  }

  //funcion que determina la busqueda
  tipoBusqueda() {
    console.log(this.selectedValue, this.texto);

    this.librosServicio
      .determinaBusqueda(this.selectedValue, this.texto)
      .subscribe((libros: any) => {
        console.log(libros);
        this.listadoAutores = libros;
        this.dataSource = new MatTableDataSource(this.listadoAutores);
        // solo que detecte cambos y genere el paginator
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
  }

  ngOnInit() {
    //lllmamamps  al servicio

    this.librosServicio.obtenerTodosLibros().subscribe((libros: any) => {
      this.listadoAutores = libros;
      console.log(libros);
      this.dataSource = new MatTableDataSource(this.listadoAutores);
      // solo que detecte cambos y genere el paginator
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      console.log(this.dataSource.filteredData);
    });
  }
}
