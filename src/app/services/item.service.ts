import { Injectable } from '@angular/core';
import { ItemList } from '../models/item.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

constructor(private http:HttpClient) { }

public getItems(parentId?: string): Observable<ItemList> {
  const getAllUrl = `/api/items`;
  let params = new HttpParams();
  
  params = parentId ? params.set('parentId', parentId) : params;
  return this.http
    .get<ItemList>(getAllUrl, { params })
    .pipe(
      map((data) => data));
  }
  
}