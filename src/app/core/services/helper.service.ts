import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class Helper {

  /**
   * Helper Constructor
   */
  constructor() { }

  /**
   * Trace string in console
   * @param message : message
   */
  public trace(message: any): void {
    if (environment.log) {
      console.log(message);
    }
  }

  /**
   * Trace error in console
   * @param msg : message
   * @param object : object
   */
  public traceError(message: string, object = {}): void {
    console.error(message, object);
  }

  /**
  * Trace logs with css style
  * @param message : message
  * @param style : style
  */
  public traceWithStyle(message: string, style: string = ''): void {
    console.log('%c ' + message, style);
  }

  /**
    * Handle Http operation that failed.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  public handleErrors<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      this.trace(error);

      // better job of transforming error for user consumption
      this.trace(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
