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
  listadoAutores!: libros[];

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<libros> = new MatTableDataSource<libros>();

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
