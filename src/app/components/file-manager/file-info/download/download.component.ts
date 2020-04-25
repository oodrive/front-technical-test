import { Component, Input } from '@angular/core';

import { FileModel } from '../../../../core/models/file.model';
import { FileService } from '../../../../core/services/file.service';

@Component({
	selector: 'fl-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.css'],
})
export class DownloadComponent {
	@Input() file: FileModel;

	constructor(private fileService: FileService) {
	}

	download() {
		this.fileService
			.download(this.file.id)
			.subscribe((content) => {
				this.writeContents(content, this.file.name);
			});
	}

	private writeContents(content: string, fileName: string) {
		const a = document.createElement('a');
		const file = new Blob([content], { type: 'text/plain' });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
}
