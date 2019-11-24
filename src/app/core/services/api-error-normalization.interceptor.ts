import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppError} from '../models/error.model';

@Injectable()
export class ApiErrorNormalizationInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((response: HttpResponse<any>) => {
        if (!(response.body)) {
          // Error
          throw (new HttpErrorResponse({error: response.body}));
        }
        return response;
      }),
      catchError(e => this.normalizeError(e))
    );
  }

  normalizeError(event: HttpErrorResponse): Observable<never> {
    if (!event.error && event.message) {
      console.error(
        `Backend returned code ${(event as any).code}, ` +
        `body was: ${(event as any).message}`);

      return throwError(new AppError({status: (event as any).code, error: (event as any).message}));
    }

    // tslint:disable-next-line:variable-name
    const _errorMessage = event.error.message || event.statusText;
    const status = event && event.status ? event.status : event.error;

    if (event.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', event.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let error = '';
      if (typeof event.error === 'string') {
        error = event.error;
      } else {
        try {
          error = JSON.stringify(event.error);
        } catch (e) {
          error = event.error;
        }
      }

      console.error(
        `Backend returned code ${status}, ` +
        `body was: ${error}`);
    }
    // return an observable with a user-facing error message
    return throwError(new AppError({status, error: _errorMessage}));
  }
}
