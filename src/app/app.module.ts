import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { FileManagerModule } from './file-manager/file-manager.module';

@NgModule({
	imports: [
		BrowserModule,
		MatCardModule,
		HttpClientModule,
		FlexLayoutModule,
		FileManagerModule,
		BrowserAnimationsModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
