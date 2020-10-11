import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private _errorHandler: ErrorHandlerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).do(
      () => { },
      (error: any) => {
          if (error instanceof HttpErrorResponse) {
              this._errorHandler.handleError(error);
          }
      }
    );
  }
}
