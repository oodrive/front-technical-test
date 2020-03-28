import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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
}
