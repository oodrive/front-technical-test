import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadComponent } from './download.component';

@NgModule({
	declarations: [DownloadComponent],
	imports: [
		CommonModule,
	],
	exports: [DownloadComponent],
})
export class DownloadModule {
}
