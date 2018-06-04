import {HttpErrorResponse} from '@angular/common/http';
import {ErrorObservable} from "rxjs-compat/observable/ErrorObservable";
import {Observable} from 'rxjs/Observable';
export class BaseService {
  constructor() {}

  protected handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:' + error.error.message);
      return ErrorObservable.create(error.error.message);
    } else {

      console.info('body ===='+JSON.stringify(error.error));
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        return ErrorObservable.create(error.error);
    }
  }
}
