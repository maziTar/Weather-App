import {ThemePalette} from '@angular/material/core';

export interface IConfirmDialogData {
  titleKey?: string;
  extraButtonArray?: IDialogButton[];
  noCancel?: boolean;
  dialogText?: string;
  dialogTextKey?: string;
}

export interface IDialogButton {
  buttonText?: string;
  buttonAction: string;
  buttonColor: ThemePalette;
}
