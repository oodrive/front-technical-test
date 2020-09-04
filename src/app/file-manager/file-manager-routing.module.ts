import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

const routes: Routes = [
	{
		path: '',
		component: WelcomeComponent,
	},
	{
		path: 'items',
		component: FileManagerComponent,
	},
	{
		path: 'items/:id',
		component: ItemDetailsComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class FileManagerRoutingModule {}
