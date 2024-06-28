import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Autor } from '../../interfaces/autor.interface';
import { AuthorsService } from '../../services/authors.service';


@Component({
  selector: 'app-autor-page',
  templateUrl: './autor-page.component.html'
})
export class AutorPageComponent implements OnInit {
  autor: Autor | undefined;

  public ruta = "https://demo-usac-upload-image.s3.amazonaws.com/"

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const autorId = params['id'];
      if (autorId) {
        this.loadAutorDetails(autorId);
      }
    });
  }

  private loadAutorDetails(id: string): void {
    this.authorsService.getAutorByID(id).subscribe(
      autor => {
        if (autor) {
          this.autor = autor;
        } else {
          // Manejar el caso cuando no se encuentra el autor
        }
      },
      error => {
        console.error('Error al cargar detalles del autor:', error);
        // Manejar el error
      }
    );
  }
}
