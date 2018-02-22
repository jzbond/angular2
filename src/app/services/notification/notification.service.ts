import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  public show(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }
}
