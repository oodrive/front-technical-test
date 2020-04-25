import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileInfoComponent } from './file-info.component';
import { FileFormModule } from './file-form/file-form.module';
import { FolderFormModule } from './folder-form/folder-form.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';

@NgModule({
	declarations: [FileInfoComponent],
	imports: [
		CommonModule,
		FormsModule,
		FileFormModule,
		FolderFormModule,
		UploadModule,
		DownloadModule,
	],
	exports: [FileInfoComponent],
})
export class FileInfoModule {
}
