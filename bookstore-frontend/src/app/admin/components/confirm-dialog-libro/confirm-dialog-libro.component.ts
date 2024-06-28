import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-confirm-dialog-libro',
  templateUrl: './confirm-dialog-libro.component.html',
  styles: [
  ]
})
export class ConfirmDialogLibroComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Libro,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }
}
