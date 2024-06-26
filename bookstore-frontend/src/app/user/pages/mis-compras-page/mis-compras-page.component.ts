import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mis-compras-page',
  templateUrl: './mis-compras-page.component.html',
  styleUrls: ['./pedidos.css'],
})
export class MisComprasPageComponent implements OnInit {
  totalItems = 100;
  pageSize = 5;
  pagedItems: any[] = [];
  allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  //inicio
  ngOnInit() {
    this.updatePagedItems(0, this.pageSize);
  }

  //con cambios
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    this.updatePagedItems(startIndex, this.pageSize);
  }

  // actualizacion de elementosd
  updatePagedItems(startIndex: number, pageSize: number) {
    this.pagedItems = this.allItems.slice(startIndex, startIndex + pageSize);
  }
}
