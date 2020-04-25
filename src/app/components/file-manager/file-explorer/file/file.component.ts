import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { FileModel } from '../../../../core/models/file.model';
import { FileService } from '../../../../core/services/file.service';

@Component({
	selector: 'fl-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss'],
})
export class FileComponent {
	@Input() file: FileModel;
	isSelected$ = this.fileService.selected$.pipe(map((f: FileModel) => f.id === this.file.id));
	private isSingleClick: boolean = true;

	constructor(private router: Router,
				private fileService: FileService) {
	}

	navigate() {
		this.isSingleClick = false;

		if (this.file && this.file.folder) {
			this.router.navigate(['folder', this.file.id]);
		}
	}

	select() {
		this.isSingleClick = true;
		setTimeout(() => {
			if (this.isSingleClick) {
				this.fileService.select(this.file);
			}
		}, 250);

	}
}
