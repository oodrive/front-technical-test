import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

import { getItems } from '../Utils';
import { FileModel } from '../models/file.model';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	private selecting$: BehaviorSubject<FileModel | any> = new BehaviorSubject({});

	selected$: Observable<FileModel> = this.selecting$.asObservable();

	private refreshSub$: Subject<boolean> = new Subject();
	public refresh$: Observable<boolean> = this.refreshSub$.asObservable();

	constructor(private http: HttpClient) {
	}

	getItems(parentId?: string): Observable<FileModel[]> {

		let params = new HttpParams();
		if (parentId) {
			params = params.append('parentId', parentId);
		}

		return this.http
			.get<FileModel[]>('/api/items', { params })
			.pipe(map(getItems));
	}

	renameItem(id: string, name: string): Observable<FileModel> {
		return this.http
			.patch<FileModel>('/api/items/' + id, { name })
			.pipe(tap(() => this.refreshSub$.next(true)));
	}

	moveToRoot(id: string): Observable<FileModel> {
		return this.http
			.patch<FileModel>('/api/items/' + id, { parentId: null })
			.pipe(tap(() => this.refreshSub$.next(true)));
	}

	deleteItem(id: string): Observable<any> {
		return this.http
			.delete('/api/items/' + id)
			.pipe(tap(() => this.refreshSub$.next(true)));
	}

	createItem(id: string, name: string, folder: boolean): Observable<FileModel> {
		let params = new HttpParams();
		if (id) {
			params = params.append('parentId', id);
		}
		return this.http.post<FileModel>(
			'/api/items',
			{ name, folder },
			{ params },
		).pipe(tap(() => this.refreshSub$.next(true)));
	}

	select(file: FileModel): void {
		this.selecting$.next(file);
	}

	download(id: string): Observable<any> {
		return this.http
			.get('/api/items/' + id, { responseType: 'text' });
	}

	upload(fs: File[]): Observable<any> {
		const files = [...fs];
		const listObs: Array<Observable<FileModel>> = [];

		files.map((file) => {
			const formData = new FormData();
			formData.append('file', file, file.name);
			const ob$ = this.http.post<FileModel>('/api/items', formData);
			listObs.push(ob$);
		});

		return combineLatest(...listObs).pipe(tap(() => this.refreshSub$.next(true)));
	}
}
