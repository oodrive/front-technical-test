import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FileModel } from '../../../core/models/file.model';
import { FileService } from '../../../core/services/file.service';

@Component({
	selector: 'fl-file-explorer',
	templateUrl: './file-explorer.component.html',
	styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit, OnDestroy {
	files: FileModel[] = [];
	private id: string = null as any;
	private subs: Subscription = new Subscription();

	constructor(private fileService: FileService,
				private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.getItems();
		this.refresh();
	}

	refresh() {
		const sub = this.fileService
			.refresh$
			.pipe(switchMap(() => this.id ? this.fileService.getItems(this.id) : this.fileService.getItems()))
			.subscribe(this.successCallBack.bind(this));
		this.subs.add(sub);
	}

	private getItems(): void {
		const id$ = this.route
			.paramMap
			.pipe(
				map((paramMap) => paramMap.get('id')),
				tap((i: string) => {
					if (i === 'root') {
						this.id = null as any;
					} else {
						this.id = i;
					}
				}),
			);

		const sub = id$.pipe(switchMap(
			(id: string) => id === 'root' ? this.fileService.getItems() : this.fileService.getItems(id),
		)).subscribe(this.successCallBack.bind(this));

		this.subs.add(sub);
	}

	private successCallBack = (data: FileModel[]) => this.files = data;

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
