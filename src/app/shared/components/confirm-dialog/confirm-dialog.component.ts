import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IConfirmDialogData} from '../../models/config-model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  @Output() actionEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public emitAction(buttonAction: string) {
    this.actionEvent.emit(buttonAction);
  }
}
