import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'courses-confirmation-dialog',
  templateUrl: 'courses-confirmation-dialog.component.html',
  styles: [ 'button {margin: 5px;}' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<CoursesConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
