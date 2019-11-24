import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {AppCommonModule} from '../app-common/common.module';
import {TopNavBarComponent} from './components/top-nav-bar/top-nav-bar.component';

const components = [
  ConfirmDialogComponent,
  TopNavBarComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppCommonModule
  ],
  exports: [components],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {
}
