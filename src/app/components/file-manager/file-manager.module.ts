import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FileManagerComponent } from './file-manager.component';
import { FileInfoModule } from './file-info/file-info.module';

const routes: Routes = [
	{
		path: '', component: FileManagerComponent,
		children: [
			{
				path: ':id', loadChildren: () =>
					import('./file-explorer/file-explorer.module')
						.then((m) => m.FileExplorerModule),
			},
		],
	},
];

@NgModule({
	declarations: [FileManagerComponent],
	imports: [
		CommonModule,
		FileInfoModule,
		RouterModule.forChild(routes),
	],
	exports: [FileManagerComponent, RouterModule],
})
export class FileManagerModule {
}
