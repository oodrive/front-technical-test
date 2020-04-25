import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FileModel } from '../../../../core/models/file.model';
import { FileService } from '../../../../core/services/file.service';

@Component({
	selector: 'fl-file-form',
	templateUrl: './file-form.component.html',
	styleUrls: ['./file-form.component.css'],
})
export class FileFormComponent implements OnChanges {
	@Input('file') fileInput: FileModel;
	file: FileModel;
	@ViewChild('form', { static: false }) form: NgForm;

	constructor(private fileService: FileService) {
	}

	ngOnChanges(): void {
		this.file = { ...this.fileInput };
	}

	rename() {
		if (this.form.valid) {
			this.fileService
				.renameItem(this.file.id, this.file.name)
				.subscribe();
		}
	}

	move() {
		if (confirm('Are you sure to move to root?')) {
			this.fileService.moveToRoot(this.file.id).subscribe(
				() => {
					this.fileService.select({} as any);
				},
			);
		}
	}

	delete() {
		if (confirm('Are you sure to remove?')) {
			this.fileService.deleteItem(this.file.id).subscribe(
				() => {
					this.fileService.select({} as any);
				},
			);
		}
	}
}
