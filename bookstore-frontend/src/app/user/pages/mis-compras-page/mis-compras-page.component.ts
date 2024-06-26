import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-compras-page',
  templateUrl: './mis-compras-page.component.html',
  styleUrls: ['./pedidos.css'],
})
export class MisComprasPageComponent implements OnInit {
  sumaTotal: number = 500;
  allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  // que mire el objeto de paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // tenemos el observable
  obs!: Observable<any>;
  // generamos la info
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    this.allItems
  );

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  //inicio
  ngOnInit() {
    // solo que detecte cambos y genere el paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    console.log(this.dataSource.filteredData);
  }
}
