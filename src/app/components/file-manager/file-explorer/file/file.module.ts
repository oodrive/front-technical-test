import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FileComponent } from './file.component';

@NgModule({
	declarations: [FileComponent],
	imports: [
		CommonModule,
		FontAwesomeModule,
	],
	exports: [FileComponent],
})
export class FileModule {
}
