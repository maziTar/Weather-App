import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiErrorNormalizationInterceptor} from './services/api-error-normalization.interceptor';
import {environment} from '../../environments/environment';
import {ToasterInterceptorService} from './services/toaster-interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MockBackendInterceptor} from './mock/mockBackend.interceptor';

const devProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ToasterInterceptorService, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ApiErrorNormalizationInterceptor, multi: true},
];

const prodProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ToasterInterceptorService, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ApiErrorNormalizationInterceptor, multi: true}

  // TODO:: OPTIONAL Add Error monitoring for production -> https://sentry.io/for/angular/
  // { provide: ErrorHandler, useFactory: provideErrorHandler } -  see example: https://alligator.io/angular/error-tracking-sentry/
];

const providers = environment.production ? prodProviders : devProviders;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule // to use with ToasterInterceptorService
  ],
  providers,
  exports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule {
}
