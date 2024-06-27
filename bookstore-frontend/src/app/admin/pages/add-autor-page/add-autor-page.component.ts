import { Component } from '@angular/core';
import { Autor } from '../../interfaces/autor.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutorService } from '../../services/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from '../../services/file-upload.service';
import { filter, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-autor-page',
  templateUrl: './add-autor-page.component.html',
  styles: [
  ]
})
export class AddAutorPageComponent {

  public imagenSubir!: File;
  public imgTemp: any = null;
  public autorTmp!: Autor;
  public imgAct !: string;


  miFormulario: FormGroup = this.fb.group({
          _id:          [''],
          name:         ['', [Validators.required, Validators.minLength(4)]],
          biography:    ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor( private autorService: AutorService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog,
               private fb: FormBuilder,
               private fileService: FileUploadService) {}

  get currentAutor(): Autor {
    const autor = this.miFormulario.value as Autor;
    return autor;
  }

  ngOnInit(): void {

    this.autorTmp = this.currentAutor;

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.autorService.getAutorByID( id ) ),
      ).subscribe( autor => {

        if ( !autor ) {
          return this.router.navigateByUrl('/list-autores');
        }
        this.autorTmp = autor;
        this.imgAct = autor.photo;

        this.miFormulario.reset( autor );

        // Establecer el formulario como inválido
        this.miFormulario.setErrors({ invalid: true });

        return;

      });

  }

  onSubmit() {
    if ( this.miFormulario.invalid ) return;

    if ( this.currentAutor._id ) {
      this.actualizarImagen( this.autorTmp );
      this.autorService.updateAutor( this.currentAutor )
                            .subscribe( autor => {
                              this.showSnackbar( `${ autor.name } actualizado correctamente!`)
                            });
      return;
    }
    this.fileService.guardarImagenAutor( this.imagenSubir ).subscribe( res => {
      this.currentAutor.photo = res.fileName!;
      this.autorService.addAutor( this.currentAutor )
      .subscribe( autor => {
        this.router.navigate(['/admin/edit-autor/', autor.value!._id ]);
        this.showSnackbar(`${ autor.value!.name } creado con éxito!`);

      });
    })
  }

  onDeleteAutor() {
    if ( !this.currentAutor._id ) throw Error('Autor id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.miFormulario.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.autorService.deleteAutorById( this.currentAutor._id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/admin/edit-autor/']);
      });


  }

  actualizarImagen( autor: Autor ){
    if( this.imgTemp ){
      this.fileService.actualizarImagenAutor( autor, this.imagenSubir )
                                  .subscribe( ok => {
                                    this.autorTmp.photo = this.fileService.nombreArchivo
                                    this.currentAutor.photo = this.fileService.nombreArchivo
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

}
