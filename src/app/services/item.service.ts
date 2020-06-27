import { Injectable } from '@angular/core';
import { ItemList, Item, ItemCreate } from '../models/item.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

constructor(private http:HttpClient) { }

getItems(parentId?: string): Observable<ItemList> {
  const getAllUrl = `/api/items`;
  let params = new HttpParams();
  
  params = parentId ? params.set('parentId', parentId) : params;
  return this.http
    .get<ItemList>(getAllUrl, { params })
    .pipe(
      map((data) => data));
  }
  getPath(itemId?: string): Observable<ItemList> {
    const pathUrl = `api/items/${itemId}/path`;
    return this.http
      .get<ItemList>(pathUrl)
      .pipe(
        map((data) => data));
    }
  downloadFile(file: Item) : Observable<any>{
    const downloadUrl = `/api/items/${file?.id}`;
    return this.http.get(downloadUrl);
    }

    renameFile(item:Item,newName:string){
    const renameUrl = `/api/items/${item?.id}`;
      return this.http.patch(renameUrl,{
        "name": newName
      })
    }

    createFolder(name:string,parentId?:string){
      const createFolderUrl = `/api/items`;
      let params = new HttpParams();
  
      params = parentId ? params.set('parentId', parentId) : params;
      const folder : ItemCreate = {name,folder:true};
      return this.http.post(createFolderUrl,folder,{ params });
    }

    uploadFile(name:string,parentId?:string){
      const createFolderUrl = `/api/items`;
      let params = new HttpParams();
  
      params = parentId ? params.set('parentId', parentId) : params;
      const folder : ItemCreate = {name,folder:false};
      return this.http.post(createFolderUrl,folder,{ params });
    }

    deleteFile(item:Item){
      const renameUrl = `/api/items/${item?.id}`;
        return this.http.delete(renameUrl)
      }
  
}