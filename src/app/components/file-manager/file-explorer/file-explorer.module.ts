import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FileExplorerComponent } from './file-explorer.component';
import { FileModule } from './file/file.module';

const routes: Routes = [
	{
		path: '', component: FileExplorerComponent,
	},
];

@NgModule({
	declarations: [FileExplorerComponent],
	imports: [
		CommonModule,
		FileModule,
		RouterModule.forChild(routes),
	],
	exports: [RouterModule, FileExplorerComponent],
})
export class FileExplorerModule {
}
