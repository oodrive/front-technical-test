import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from '../file-manager/model/item';

@Injectable({
	providedIn: 'root'
})
export class FileService {
	private api: string = '/api/items';

	constructor(private http: HttpClient) {}

	public getItems(): Observable<Item[]> {
		return this.http
			.get<Item[]>(`${this.api}`)
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public uploadItems(files: any[], parentId?: string): Observable<any> {
		const url: string = parentId
			? `${this.api}?parentId=${parentId}`
			: `${this.api}`;
		const formData = new FormData();
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < files.length; i++) {
			formData.append('uploads[]', files[i], files[i]['name']);
		}
		return this.http
			.post(url, formData)
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public createFolder(folderName: string): Observable<Item> {
		return this.http
			.post<Item>(`${this.api}`, { name: folderName, folder: true })
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public downloadItem(itemId: string): Observable<any> {
		return this.http
			.get(`${this.api}/${itemId}`, {
				responseType: 'blob'
			})
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public renameItem(item: Item, name: string): Observable<Item> {
		return this.http
			.patch<Item>(`${this.api}/${item.id}`, { name })
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public moveItem(itemId: string, parentId: string): Observable<any> {
		return this.http
			.patch(`${this.api}/${itemId}`, { parentId })
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public delete(itemId: string): Observable<any> {
		return this.http
			.delete(`${this.api}/${itemId}`)
			.pipe(catchError(error => throwError(error || 'Server error')));
	}

	public retrieveItemPath(itemId: string): Observable<Item[]> {
		return this.http
			.get<Item[]>(`${this.api}/${itemId}/path`)
			.pipe(catchError(error => throwError(error || 'Server error')));
	}
}
