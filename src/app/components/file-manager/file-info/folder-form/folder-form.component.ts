import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FileModel } from '../../../../core/models/file.model';
import { FileService } from '../../../../core/services/file.service';

@Component({
	selector: 'fl-folder-form',
	templateUrl: './folder-form.component.html',
	styleUrls: ['./folder-form.component.css'],
})
export class FolderFormComponent implements OnInit, OnDestroy {
	file: FileModel = { folder: true } as any;
	id: string;
	@ViewChild('form', { static: false }) form: NgForm;
	private subs: Subscription = new Subscription();

	constructor(private fileService: FileService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		// @ts-ignore
		const id$ = this.route.firstChild.paramMap.pipe(map((paramMap) => paramMap.get('id')));
		const sub = id$.subscribe((i: string) => {
			if (i === 'root') {
				this.id = null as any;
			} else {
				this.id = i;
			}
		});

		this.subs.add(sub);
	}

	createItem() {
		if (this.form.valid) {
			this.fileService
				.createItem(
					this.id,
					this.file.name,
					this.file.folder)
				.subscribe(
					() => {
						this.file = { folder: true } as any;
						this.form.resetForm(this.file);
					},
				);
		}
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
