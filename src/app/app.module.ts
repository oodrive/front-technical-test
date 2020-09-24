import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from '@angular/common/http';
import {FileUploadModule} from 'ng2-file-upload';
import {ConfirmModelComponent} from './confirm-model/confirm-model.component';
import {ApiService} from './api.service';
import {ModalService} from './modal.service';
import {ModalModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		BrowserModule,
		TableModule,
		HttpClientModule,
		FileUploadModule,
		ModalModule.forRoot(),
		BrowserAnimationsModule,
	],
	declarations: [
		AppComponent, ConfirmModelComponent,
	],
	bootstrap: [AppComponent],
	providers: [ApiService, ModalService],
	entryComponents: [
		ConfirmModelComponent,
	],
})
export class AppModule {
}
