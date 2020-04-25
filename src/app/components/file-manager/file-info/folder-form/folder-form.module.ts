import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FolderFormComponent } from './folder-form.component';

@NgModule({
	declarations: [FolderFormComponent],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [FolderFormComponent],
})
export class FolderFormModule {
}
