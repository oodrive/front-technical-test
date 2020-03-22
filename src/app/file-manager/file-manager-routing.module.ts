import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
/* import { ChildComponent } from './child/child.component'; */

const routes: Routes = [
	{
		path: '',
		component: FileManagerComponent,
		children: [
			{
				path: ':name',
				component: FileManagerComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class FileManagerRoutingModule {}
