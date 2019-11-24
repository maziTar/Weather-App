import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AppResponse, HttpResponseBody} from '../models/api.models';
import {AppError} from '../models/error.model';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string, options?): Observable<AppResponse<T>> {
    const requestOptions = this.createRequestOptions(options, 'GET');
    return this.httpClient.get<HttpResponseBody<T>>(`${url}`, requestOptions)
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      );
  }

  post<T>(url: string, body?, options?): Observable<AppResponse<T>> {
    const requestOptions = this.createRequestOptions(options, 'POST');
    return this.httpClient.post<HttpResponseBody<T>>(`${url}`, body, requestOptions)
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      );
  }

  put<T>(url: string, body?, options?): Observable<AppResponse<T>> {
    const requestOptions = this.createRequestOptions(options, 'PUT');
    return this.httpClient.put<HttpResponseBody<T>>(`${url}`, body, requestOptions).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, options?): Observable<any> {
    const requestOptions = this.createRequestOptions(options, 'DELETE');
    return this.httpClient.delete<AppResponse<T>>(`${url}`, requestOptions).pipe(
      map(res => {
        return this.handleDeleteResponse(res['body']);
      }),
      catchError(this.handleError)
    );
  }

  private createRequestOptions(options, method) {
    let headers = options && options.headers ? (options.headers) : null;
    let params: HttpParams = null;
    switch (method) {
      case 'GET':
        headers = (new HttpHeaders(headers)).set('Accept-Encoding', 'gzip');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Accept-Encoding', 'gzip');
        break;
      case 'PUT':
        if (!this.headersOfType(headers, 'Content-Type')) { // Add only if there is no such Header
          headers = (new HttpHeaders(headers)).set('Content-Type', 'application/json');
        }
        break;
      case 'DELETE':
        headers = (new HttpHeaders(headers));
        break;
      case 'POST':
        headers = (new HttpHeaders(headers)); // .set('Content-Type', 'application/json'); // Must be JSON
        break;
    }
    if (options && options.params) {
      params = new HttpParams();
      Object.keys(options.params).map(key => params = params.set(key, options.params[key]));
    }
    const observe: 'response' = 'response';
    const withCredentials = environment.production; // needs to be false in order to see the data from the server
    return {
      ...options,
      headers,
      params,
      observe, // get full response instead of just the body with the observe option
      withCredentials // Add cookies to each api call
    };

  }

  private headersOfType(headers: HttpHeaders, contentType: string): boolean {
    return headers !== null && headers instanceof HttpHeaders && headers.has(contentType);
  }


  /**
   * handleDeleteResponse
   * Map response to AppResponse model
   * @param response HttpResponseBody
   */
  private handleDeleteResponse<T>(response: AppResponse<T>): AppResponse<T> {
    return new AppResponse<T>({data: response});
  }

  /**
   * handleResponse
   * Map response to AppResponse model
   * @param response HttpResponse
   */
  private handleResponse<T>(response: HttpResponse<HttpResponseBody<T>>): AppResponse<T> {
    if (response.body instanceof Blob) {
      return new AppResponse<T>({data: response.body});
    }
    return new AppResponse<T>({data: response.body.data});
  }

  private handleError(error: AppError) {
    // Optional - Handle specific Http-Errors (other then the Error.interceptor)
    return throwError(error);
  }
}


