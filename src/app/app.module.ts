import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { MenuComponent } from './components/menu/menu.component';
import { FolderComponent } from './components/folder/folder.component';

const routes: Routes = [
	{ path: 'folders', component: FolderComponent },
	{ path: 'folders/:id', component: FolderComponent },
	{ path: '', component: AppComponent },
];

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentComponent,
		MenuComponent,
		FolderComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
