import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { faFile, faFolder, fas } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
	imports: [
		BrowserModule,
		CoreModule,
		RouterModule.forRoot(
			[
				{
					path: 'folder',
					loadChildren: () => import('./components/file-manager/file-manager.module')
						.then((m) => m.FileManagerModule),
				},
				{
					path: '**',
					redirectTo: '/folder/root',
					pathMatch: 'full',
				},
			],
		),
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
		library.addIcons(faFolder);
		library.addIcons(faFile);
	}
}
