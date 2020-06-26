import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


const appRoutes: Routes = [
	{
		path        : 'folders',
		loadChildren: () => import('./manage-folders/manage-folders.module').then(m => m.ManageFoldersModule)
	},
	{
		path      : '**',
		redirectTo: 'folders'
	}
  ];
@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
    	BrowserAnimationsModule,
		SharedModule,
		RouterModule.forRoot(appRoutes),
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
