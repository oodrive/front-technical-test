import { Component } from '@angular/core';
import { FileService } from '../../core/services/file.service';

@Component({
	selector: 'fl-file-manager',
	templateUrl: './file-manager.component.html',
	styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {

	selected$ = this.fileService.selected$;

	constructor(private fileService: FileService) {
	}
}
