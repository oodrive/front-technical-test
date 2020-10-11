import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({providedIn: 'root'})
export class APIService {
    private _api = environment.apiUrl;
    constructor(private _http: HttpClient) { }

    /**
     * List all the items (folders and files)
     * 
     * @param parentId id of the parent folder (optional)
     */
    list(parentId: string): Observable<Item[]>{
        return this._http
            .get<Item[]>(this.buildURL(parentId))
            .pipe(
                map((data: any) => data.items),
                // catchError(handleError)
            );
    }

    /**
     * Download file
     * 
     * @param id id of the file to download
     */
    downloadFile(id: string): Observable<any>{
        return this._http.get( `${this._api}/items/${id}`, { responseType: 'blob'})
                .pipe(
                    map((res:any) => new Blob([res],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
                    // catchError(handleError)
                );
    }

    /**
     * Create new folder
     * 
     * @param folder Item - the Item object with the name of the folder
     * @param parentId string - the parentId of the folder if exist
     */
    createFolder(folder: Item, parentId: string): Observable<Item>{
        return this._http.post<Item>(this.buildURL(parentId), folder);
    }

    /**
     * Rename an item (folder or file)
     * 
     * @param item Item - the item that will be renamed
     * @returns item Item - the updated item
     */
    editItem(item: Item): Observable<Item>{
        return this._http.patch<Item>(`${this._api}/items/${item.id}`, item);
    }

    /**
     * Upload and save a file
     * 
     * @param formData FormData - contain the files
     * @param parentId string - the ID of the folder where we will save the file
     */
    uploadFiles(formData: FormData, parentId: string): Observable<Item[]>{
        let _headers = new HttpHeaders();
        _headers.append('Content-Type', 'multipart/form-data');
        return this._http.post<Item[]>(this.buildURL(parentId), formData, { headers: _headers})
                .pipe(
                    map((data:any) => data.items),
                    // catchError(handleError)
                );
    }

    /**
     * Delete an item
     * 
     * @param id string - ID of the item to be deleted
     */
    delete(id: string): Observable<any>{
        return this._http.delete(`${this._api}/items/${id}`);
                // .pipe(
                //     catchError(handleError)
                // );
    }

    private buildURL(parentId: string): string{
        return (parentId && parentId !== '') ? `${this._api}/items?parentId=${parentId}` : `${this._api}/items`;
    }
}