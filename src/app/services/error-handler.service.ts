import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  handleError(error: HttpErrorResponse) {
    let _msg = '';
    if (error.error instanceof ErrorEvent) {
      _msg = 'An error occurred:' + error.error.message;
    } else {
      _msg = `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`;
    }
      
    this.snackbar.open(_msg , 'Close',{ verticalPosition: 'top', panelClass: ['snack-bar-danger'] });
  }

}
