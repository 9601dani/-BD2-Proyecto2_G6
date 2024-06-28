import { Component, OnInit } from '@angular/core';
import { ReporteExit } from '../../interfaces/reporte.interface';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-top-libros-page',
  templateUrl: './top-libros-page.component.html',
  styles: [
  ]
})
export class TopLibrosPageComponent implements OnInit {
  columnas: string[] = ['No.', 'Total de Ventas', 'Nombre del Libro', 'Género', 'Autor', 'Puntuacion'];
  reportes: ReporteExit[] = [];

  constructor( private reporteService: ReporteService ){}

  ngOnInit(): void {
    this.reporteService.getTopBooks().subscribe( res => {
      console.log(res)
      this.reportes = res
    })
  }

}
