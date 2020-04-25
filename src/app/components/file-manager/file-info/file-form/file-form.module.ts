import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileFormComponent } from './file-form.component';

@NgModule({
	declarations: [FileFormComponent],
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [FileFormComponent],
})
export class FileFormModule {
}
