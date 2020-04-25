import { Component, Input } from '@angular/core';

import { FileModel } from '../../../core/models/file.model';

@Component({
	selector: 'fl-file-info',
	templateUrl: './file-info.component.html',
	styleUrls: ['./file-info.component.scss'],
})
export class FileInfoComponent {
	@Input() file: FileModel;
}
