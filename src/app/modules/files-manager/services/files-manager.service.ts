import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Helper } from '../../../core/services/helper.service';
import { HttpHeader } from '../../../shared/utils/http-header';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FilesManagerService {

  /**
  * Url for request
  **/
  private readonly _hostUrl: string;

  /**
   * Request Headers
   */
  private readonly _headers: HttpHeaders;

  /**
   * constructor
   * @param _http
   * @param _helper
   */
  constructor(
    private readonly _http: HttpClient,
    private readonly _helper: Helper) {
    this._hostUrl = environment.items_api_url;
    this._headers = HttpHeader.getHeaders();
  }

  /**
   * Get the list of All items inside the folder with the given parentID
   * @param parentId : item ID
   */
  public getItems<Item>(parentId?: string): Observable<Item[]> {
    const requestParams: HttpParams = this._buildParams({ parentId });
    const options = { headers: this._headers, params: requestParams };
    return this._http.get<Item[]>(this._hostUrl, options).pipe(
      tap(() => this._helper.trace(`Get all items : ${this._hostUrl}`)),
      catchError(this._helper.handleErrors('Get Items', [])));
  }

  /**
  * Get the list of All items By id
  * @param parentId : item ID
  */
  public getItemsById<Item>(itemId: string): Observable<Item[]> {
    return this._http.get<Item[]>(`${this._hostUrl}/${itemId}/path`, { headers: this._headers }).pipe(
      tap(() => this._helper.trace(`Get items by id: ${this._hostUrl}`)),
      catchError(this._helper.handleErrors('Get items by id ', [])));
  }

  /**
   * Upload files inside the folder with the given parentID.
   * Otherwise, the file will be uploaded at the root if there is no parentID.
   * @param files : Array of file - MultiFiles
   * @param parentId : by default (/) root
   */
  public upload(files: any[], parentId?: string): Observable<Item> {
    const formData: FormData = new FormData();
    const requestParams: HttpParams = this._buildParams({ parentId });
    [...files].forEach((file) => formData.append('uploads', file, file.name));
    const options = { headers: this._headers, params: requestParams };
    return this._http.post<Item>(`${this._hostUrl}`, formData, options)
      .pipe(tap(() => this._helper.trace(`upload Files done : ${this._hostUrl}`)),
        catchError(this._helper.handleErrors<Item>('Upload')));
  }

  /**
   * Download a file By itemId
   * @param itemId : item ID
   */
  public download(itemId: string): Observable<any> {
    return this._http.get(`${this._hostUrl}/${itemId}`, {
      headers: this._headers,
      responseType: 'blob',
    }).pipe(catchError(this._helper.handleErrors('download')));
  }

  /**
  * Used For Create file or folder inside the given parentID.
  * Otherwise, the (File | Folder) will be created at the root if there is no parentID.
  * @param name : item name
  * @param isFolder : define the type of item(Folder | File). By default true
  * @param parentId : parent ID
  */
  public create(name: string, isFolder: boolean, parentId?: string): Observable<Item> {
    const folder = isFolder ? true : false;
    const requestParams: HttpParams = this._buildParams({ parentId });
    const body = { name, folder };
    return this._http
      .post<Item>(`${this._hostUrl}`, body, { headers: this._headers, params: requestParams })
      .pipe(
        tap(() => this._helper.trace(`Create : ${folder ? 'Folder' : 'File'}`)),
        catchError(this._helper.handleErrors<Item>('create')));
  }

  /**
   * Delete item by the given ID
   * @param itemId
   */
  public delete(itemId: string): Observable<any> {
    return this._http.delete(`${this._hostUrl}/${itemId}`, { headers: this._headers })
      .pipe(
        tap(() => this._helper.trace(`Delete item with ID : ${itemId} - ${this._hostUrl}`)),
        catchError(this._helper.handleErrors));
  }

  /**
   * Rename the given item (File |Folder)
   * @param item : item type
   * @param name
   */
  public renameItem(item: Item, name: string): Observable<Item> {
    return this._http
      .patch<Item>(`${this._http}/${item.id}`, { name }, { headers: this._headers })
      .pipe(
        tap(() => this._helper.trace(`Delete item with ID : ${item.id} - ${this._hostUrl}`)),
        catchError(this._helper.handleErrors<Item>('rename item')));
  }

  /**
   * move the the given item (File |Folder) to another parent folder
   * @param itemId : item id
   * @param parentId : prarent Id
   */
  public moveItem(itemId: string, parentId: string): Observable<any> {
    return this._http
      .patch<Item>(`${this._http}/${itemId}`, { parentId })
      .pipe(
        tap(() => this._helper.trace(`Move item : ${itemId} to ${parentId} - ${this._hostUrl}`)),
        catchError(this._helper.handleErrors<Item>('Move item')));
  }

  /**
   * Build and return the request Params
   * @param options : options
   */
  private _buildParams(options?: any): HttpParams {
    let params = new HttpParams();
    Object.getOwnPropertyNames(options).forEach((key: any) => {
      if (options[key]) {
        params = params.append(key, options[key]);
      }
    });
    return params;
  }

}
