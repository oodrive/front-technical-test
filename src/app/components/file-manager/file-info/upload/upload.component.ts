import { Component, Input } from '@angular/core';

import { FileModel } from '../../../../core/models/file.model';
import { FileService } from '../../../../core/services/file.service';

@Component({
	selector: 'fl-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
	@Input() file: FileModel;
	toUpload: File;

	constructor(private fileService: FileService) {
	}

	upload(files: File[]) {
		this.fileService
			.upload(files)
			.subscribe();
	}
}
