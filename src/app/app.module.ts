import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		NgxDropzoneModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
