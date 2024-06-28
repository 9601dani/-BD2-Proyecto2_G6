import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Libro, TipoAutor } from '../../interfaces/libro.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-libro-page',
  templateUrl: './add-libro-page.component.html',
  styles: [
  ]
})
export class AddLibroPageComponent  {
  // @ViewChild('autorSelected') autorSelect!: MatSelect;
  // public autores!: TipoAutor[];
  // public imagenSubir!: File;
  // public imgTemp: any = null;
  // public libroTmp!: Libro;


  // miFormulario: FormGroup = this.fb.group({
  //         _id:                [''],
  //         titulo:             ['', [Validators.required, Validators.minLength(4)]],
  //         autor:              new FormControl<string>('', {
  //                                 validators: [Validators.required]
  //                             }),
  //         descripcion:        ['', [Validators.required, Validators.minLength(10)]],
  //         fecha_publicacion:  ['', [Validators.required]],
  //         cantidad_stock:     new FormControl<number>(1, {
  //                                 validators: [Validators.required, Validators.min(1)]
  //                             }),
  //         precio:             new FormControl<number>(1, {
  //                                 validators: [Validators.required, Validators.min(1)]
  //                             }),

  // });

  // constructor( private libroService: LibroService,
  //              private activatedRoute: ActivatedRoute,
  //              private router: Router,
  //              private snackbar: MatSnackBar,
  //              private dialog: MatDialog,
  //              private fb: FormBuilder,
  //              private fileService: FileUploadService) {}

  // get currentProducto(): Producto {
  //   const producto = this.miFormulario.value as Producto;
  //   return producto;
  // }

  // ngOnInit(): void {

  //   this.productoService.getCategorias().subscribe(categorias => {
  //     this.categorias = categorias;

  //     if (this.productoTmp.categoria) {
  //       const categoriaSeleccionada = this.categorias.find(
  //         categoria => categoria._id === this.productoTmp.categoria._id
  //       );
  //       if (categoriaSeleccionada) {
  //         this.miFormulario.get('categoria')?.setValue(categoriaSeleccionada);
  //       }
  //     }
  //   });

  //   this.productoTmp = this.currentProducto;
  //   if ( !this.router.url.includes('edit') ) return;

  //   this.activatedRoute.params
  //     .pipe(
  //       switchMap( ({ id }) => this.productoService.getProductoByID( id ) ),
  //     ).subscribe( producto => {

  //       if ( !producto ) {
  //         return this.router.navigateByUrl('/sales');
  //       }
  //       this.productoTmp = producto;

  //       this.miFormulario.reset( producto );

  //       if ( this.productoTmp.categoria ) {
  //         const categoriaSeleccionada = this.categorias.find(
  //                 categoria => categoria._id === this.productoTmp.categoria._id );
  //         if ( categoriaSeleccionada ) {
  //           this.miFormulario.get('categoria')?.setValue(categoriaSeleccionada._id);
  //         }
  //       }

  //       return;

  //     });

  // }

  // onSubmit() {
  //   if ( this.miFormulario.invalid ) return;

  //   if ( this.currentProducto._id ) {
  //     this.productoService.updateProducto( this.currentProducto )
  //                           .subscribe( producto => {
  //                             this.actualizarImagen( producto );
  //                             this.showSnackbar( `${ producto.nombre } actualizado correctamente!`)
  //                           });
  //     return;
  //   }

  //   this.productoService.addProducto( this.currentProducto )
  //     .subscribe( producto => {
  //      TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
  //      this.actualizarImagen( producto );
  //      this.router.navigate(['/user/edit', producto._id ]);
  //      console.log('NOS FUIMOS -------------------')
  //      this.showSnackbar(`${ producto.nombre } creado con éxito!`);

  //     });


  // }

  // onDeleteProducto() {
  //   console.log( this.currentProducto._id )
  //   if ( !this.currentProducto._id ) throw Error('Producto id is required');

  //   const dialogRef = this.dialog.open( ConfirmDialogComponent, {
  //     data: this.miFormulario.value
  //   });

  //   dialogRef.afterClosed()
  //     .pipe(
  //       filter( (result: boolean) => result ),
  //       switchMap( () => this.productoService.deleteProductoById( this.currentProducto._id )),
  //       filter( (wasDeleted: boolean) => wasDeleted ),
  //     )
  //     .subscribe(() => {
  //       this.router.navigate(['/user/sales']);
  //     });


  // }

  // actualizarImagen( producto: Producto ){
  //   if( this.imgTemp ){
  //     this.fileService.actualizarImagen( producto, this.imagenSubir )
  //                                 .subscribe( ok => {
  //                                   if( ok === true ){
  //                                     this.productoTmp.img = this.fileService.nombreArchivo;

  //                                   }else{

  //                                     Swal.fire( 'Error', ok, 'error');
  //                                   }
  //     })
  //   }
  // }

  // showSnackbar( message: string ):void {
  //   this.snackbar.open( message, 'ok', {
  //     duration: 2500,
  //   })
  // }

  // cambiarImagen( event: any ) {
  //   El archivo seleccionado es una imagen
  //   if (event.target.files.length > 0) {
  //     const selectedFile = event.target.files[0];
  //     if (selectedFile.type.indexOf('image') !== -1) {
  //       this.imagenSubir = selectedFile;
  //       const reader = new FileReader();
  //       reader.readAsDataURL( selectedFile );

  //       reader.onloadend = () => {
  //         this.imgTemp = reader.result;
  //       }
  //       this.showSnackbar('Imagen cargada correctamente')

  //     } else {
  //       El archivo seleccionado no es una imagen
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'El archivo seleccionado no tiene un formato valido',
  //       })
  //       this.imgTemp = null;
  //     }
  //     this.imagenSubir = event.target.files[0];


  //   } else {
  //     this.imgTemp = null;
  //   }

  // }

  // categoriaValida(control: AbstractControl): ValidationErrors | null {
  //   const categoriaId = control.value;
  //   for (let i = 0; i < this.categorias.length; i++) {
  //     if (!this.categorias[i]._id.includes(categoriaId)) {
  //       return { categoriaInvalida: true };
  //     }

  //   }

  //   return null;
  // }

}
