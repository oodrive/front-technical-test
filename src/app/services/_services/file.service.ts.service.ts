import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { items } from '../../models/items.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  apiUrl = 'http://localhost:8080/api/'
  constructor(
    private http: HttpClient,
  ) { }

  getListItems(): Observable<items[]> {
    let endpoint = "items";
    let url = this.apiUrl + endpoint;
    let params = new HttpParams();

    return this.http
      .get<items[]>(url, { params: params })
      .pipe(catchError(this.handleError));
  }
  getListItemsById(id: string): Observable<items[]> {
    let endpoint = "items/";
    let url = this.apiUrl + endpoint;
    url += id + '/path';
    let params = new HttpParams();

    return this.http
      .get<items[]>(url, { params: params })
      .pipe(catchError(this.handleError));
  }

  DownloadFile(id: string) {
    //  const endpoint = + id  ;
    let url = this.apiUrl + id;
    const headers = new Headers();
    let params = new HttpParams();

    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(url, { params: params })
      .pipe(catchError(this.handleError));
  }
  deleteAbscence(id: string) {
    let url = this.apiUrl + id;
    let params = new HttpParams();

    return this.http.delete(url, { params: params })
      .pipe(catchError(this.handleError));
  }

  additems(id: any) {

    let url = 'http://localhost:8080/api/items';
    return this.http.post<any>(url, id).pipe(catchError(this.handleError));
  }

  Patchitems(id: string, payload: any) {
    let endpoint = "items/";
    let url = this.apiUrl + endpoint;
    url += id;
    return this.http.patch(url, payload).pipe(catchError(this.handleError));
  }








  //ERROR HANDLER
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
