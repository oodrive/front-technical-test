import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
	{
		path        : 'manage-folders',
		loadChildren: () => import('./manage-folders/manage-folders.module').then(m => m.ManageFoldersModule)
	},
	{
		path      : '**',
		redirectTo: 'manage-folders'
	}
  ];
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(appRoutes),
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
