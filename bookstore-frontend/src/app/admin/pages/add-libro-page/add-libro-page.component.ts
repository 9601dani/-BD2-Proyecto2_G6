import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Libro, TipoAutor } from '../../interfaces/libro.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from '../../services/file-upload.service';
import { autores } from '../../../models/autores';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogLibroComponent } from '../../components/confirm-dialog-libro/confirm-dialog-libro.component';
import Swal from 'sweetalert2';
import { libros } from '../../../models/libros';

@Component({
  selector: 'app-add-libro-page',
  templateUrl: './add-libro-page.component.html',
  styles: [
  ]
})
export class AddLibroPageComponent  {
  @ViewChild('autorSelected') autorSelect!: MatSelect;
  public autores!: TipoAutor[];
  public imagenSubir!: File;
  public imgTemp: any = null;
  public libroTmp!: Libro;


  miFormulario: FormGroup = this.fb.group({
          _id:                [''],
          titulo:             ['', [Validators.required, Validators.minLength(4)]],
          autor:              new FormControl<string>('', {
                                  validators: [Validators.required]
                              }),
          genero:             ['', [Validators.required, Validators.minLength(4)]],
          descripcion:        ['', [Validators.required, Validators.minLength(10)]],
          fecha_publicacion:  ['', [Validators.required]],
          cantidad_stock:     new FormControl<number>(1, {
                                  validators: [Validators.required, Validators.min(1)]
                              }),
          precio:             new FormControl<number>(1, {
                                  validators: [Validators.required, Validators.min(1)]
                              }),

  });

  constructor( private libroService: LibroService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog,
               private fb: FormBuilder,
               private fileService: FileUploadService) {}

  get currentLibro(): Libro {
    const libro = this.miFormulario.value as Libro;
    return libro;
  }

  ngOnInit(): void {

    this.libroService.getAutores().subscribe( autores => {
      this.autores = autores;

      if (this.libroTmp.autor) {
        const autorSeleccionado = this.autores.find(
          autor => autor._id === this.libroTmp.autor._id
        );
        if (autorSeleccionado) {
          this.miFormulario.get('autor')?.setValue(autorSeleccionado);
        }
      }
    });

    this.libroTmp = this.currentLibro;
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.libroService.getLibrosByID( id ) ),
      ).subscribe( libro => {

        if ( !libro ) {
          return this.router.navigateByUrl('/list-libros');
        }
        this.libroTmp = libro;

        this.miFormulario.reset( libro );

        if ( this.libroTmp.autor ) {
          const libroSeleccionado = this.autores.find(
                  autor => autor._id === this.libroTmp.autor._id );
          if ( libroSeleccionado ) {
            this.miFormulario.get('autor')?.setValue(libroSeleccionado._id);
          }
        }
        return;

      });

  }

  onSubmit() {
    if ( this.miFormulario.invalid ) return;

    if ( this.currentLibro._id ) {
      this.actualizarImagen( this.libroTmp );
      this.libroService.updateLibro( this.currentLibro )
                            .subscribe( libro => {
                              this.showSnackbar( `${ this.currentLibro.titulo } actualizado correctamente!`)
                            });
      return;
    }
    this.fileService.guardarImagenAutor( this.imagenSubir ).subscribe( res => {
      this.currentLibro.imagen_url = res.fileName!;
      this.currentLibro.disponibilidad = true;
      this.currentLibro.puntuacion_promedio = 0;
      this.libroService.addLibro( this.currentLibro )
      .subscribe( libro => {
        this.router.navigate(['/admin/edit-libro', libro.value!._id ]);
        this.showSnackbar(`${ libro.value!.titulo } creado con éxito!`);

      });
    })


  }

  onDeleteProducto() {
    if ( !this.currentLibro._id ) throw Error('Autor id is required');

    const dialogRef = this.dialog.open( ConfirmDialogLibroComponent, {
      data: this.miFormulario.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.libroService.deleteProductoById( this.currentLibro._id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/admin/list-libros']);
      });


  }

  actualizarImagen( libro: Libro ){
    if( this.imgTemp ){
      this.fileService.actualizarImagenLibro( libro, this.imagenSubir )
                                  .subscribe( ok => {
                                    this.libroTmp.imagen_url = this.fileService.nombreArchivo
                                    this.currentLibro.imagen_url = this.fileService.nombreArchivo
      })
    }
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'ok', {
      duration: 2500,
    })
  }

  cambiarImagen( event: any ) {
    // El archivo seleccionado es una imagen
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type.indexOf('image') !== -1) {
        this.imagenSubir = selectedFile;
        const reader = new FileReader();
        reader.readAsDataURL( selectedFile );

        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }
        this.showSnackbar('Imagen cargada correctamente')

      } else {
        // El archivo seleccionado no es una imagen
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El archivo seleccionado no tiene un formato valido',
        })
        this.imgTemp = null;
      }
      //this.imagenSubir = event.target.files[0];


    } else {
      this.imgTemp = null;
    }

  }

  autorValido(control: AbstractControl): ValidationErrors | null {
    const libroId = control.value;
    for (let i = 0; i < this.autores.length; i++) {
      if (!this.autores[i]._id.includes(libroId)) {
        return { autorInvalido: true };
      }

    }

    return null;
  }

}
