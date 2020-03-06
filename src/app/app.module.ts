import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileComponent } from './components/file/file.component';
import {HttpClientModule} from "@angular/common/http";
import {FileService} from "./services/file.service";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		AppComponent,
		FileComponent,
	],
	providers:[FileService],
	bootstrap: [AppComponent],
})
export class AppModule {
}
