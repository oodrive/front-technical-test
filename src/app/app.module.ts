import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TreeModule} from 'primeng/tree';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TreeModule,
		FormsModule,
		BrowserAnimationsModule,
		RouterModule,
		ButtonModule,
		FileUploadModule,
	],
	declarations: [
		AppComponent,
		FileManagerComponent,
		PageNotFoundComponent,
		DashboardComponent,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
