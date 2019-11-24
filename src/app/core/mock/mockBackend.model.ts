import {HttpResponseBody} from '../models/api.models';

export function AppHttpResponse<T>(payload: T): HttpResponseBody<T> {
  return {
    data: payload
  };
}
