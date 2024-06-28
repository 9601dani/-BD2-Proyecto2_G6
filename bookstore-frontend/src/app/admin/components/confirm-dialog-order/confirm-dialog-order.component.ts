import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-confirm-dialog-order',
  templateUrl: './confirm-dialog-order.component.html',
  styles: [
  ]
})
export class ConfirmDialogOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }
}
