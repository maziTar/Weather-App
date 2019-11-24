import {EResultCodes} from './api.models';

const DEFAULT_APP_ERROR_TYPE = 9999;
const AppErrorsTranslationMapping = {
  9999: 'ERRORS.ERROR_DEFUALT',
  401: 'ERRORS.ERROR_NOT_AUTHORIZED', // must be listed in i18n json file_formData
  500: 'ERRORS.ERROR_GENERAL', // must be listed in i18n json file_formData

  0: 'ERRORS.ERROR_DEFUALT',
  801: 'ERRORS.NO_MESSAGES_FOUND',
};

export interface IAppErrorPayload {
  status: number;
  error: string;
}

export interface IAppError {
  status: number;
  value: string;
  translateKey: string;
}

export class AppError implements IAppError {
  value: string;
  translateKey: string;
  status: number;
  data: string;

  constructor({status = DEFAULT_APP_ERROR_TYPE, error}: IAppErrorPayload) {
    this.status = status;
    this.value = error;
    if (!EResultCodes[status]) {
      console.error('New Type of Error found:', status);
    }
    this.translateKey = !!AppErrorsTranslationMapping[status] ?
      AppErrorsTranslationMapping[status] :
      AppErrorsTranslationMapping[DEFAULT_APP_ERROR_TYPE];
  }
}
