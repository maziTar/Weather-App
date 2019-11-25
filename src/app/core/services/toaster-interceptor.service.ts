import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppError} from '../models/error.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => this.handleError(e)));
  }


  private handleError(req: AppError) {
    if (req.status >= 500) { // internal server message - display as is
      this.showSnackbar(req.value);
    }
    return throwError(req);
  }

  private showSnackbar(massage: string): void {
    this.snackBar.open(massage, '', {
      duration: 60000,
      verticalPosition: 'top',
      panelClass: 'error'
    });
  }

}
