import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Item } from '../file-manager/model/item';

@Injectable({
	providedIn: 'root'
})
export class FileService {
	private api: string = '/api/items';
	constructor(private http: HttpClient) {}

	public getItems(parentId?: string): Observable<Item[]> {
		const url: string = parentId
			? `${this.api}?parentId=${parentId}`
			: `${this.api}`;
		return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
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
		return this.http.post(url, formData).pipe(catchError(this.handleError));
	}

	public createFolder(folderName: string): Observable<Item> {
		return this.http
			.post<Item>(`${this.api}`, { name: folderName, folder: true })
			.pipe(catchError(this.handleError));
	}

	public downloadItem(itemId: string): Observable<any> {
		return this.http
			.get(`${this.api}/${itemId}`, {
				responseType: 'blob'
			})
			.pipe(catchError(this.handleError));
	}

	public renameItem(item: Item, name: string): Observable<Item> {
		return this.http
			.patch<Item>(`${this.api}/${item.id}`, { name })
			.pipe(catchError(this.handleError));
	}

	public moveItem(itemId: string, parentId: string): Observable<any> {
		return this.http
			.patch(`${this.api}/${itemId}`, { parentId })
			.pipe(catchError(this.handleError));
	}

	public delete(itemId: string): Observable<any> {
		return this.http
			.delete(`${this.api}/${itemId}`)
			.pipe(catchError(this.handleError));
	}

	public retrieveItemPath(itemId: string): Observable<Item[]> {
		return this.http
			.get<Item[]>(`${this.api}/${itemId}/path`)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: Response) {
		return throwError(error.json() || 'Server error');
	}
}
