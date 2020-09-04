import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileManagerModule } from './file-manager/file-manager.module';
import { RouterModule } from '@angular/router';
import { PostFileComponent } from './file-manager/components/post-file/post-file.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		FileManagerModule,
		RouterModule,
	],
	declarations: [
		AppComponent,
		FileManagerComponent,
	],
	bootstrap: [AppComponent],
	entryComponents: [PostFileComponent],
})
export class AppModule {
}
