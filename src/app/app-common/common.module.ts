import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

/**
 * This module contains all of the elements that are not App-Specific (usually 3rd party features/ elements):
 * For example: Material, Angular Flex Layout etc...
 * Any element found in this module has NO dependency to any of the App features
 */
@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: true}),
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class AppCommonModule {
}
