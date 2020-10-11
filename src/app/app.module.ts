import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExplorerComponent } from './explorer/explorer.component';
import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileViewComponent } from './file-view/file-view.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';
import { EditItemComponent } from './edit-item/edit-item.component';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
		MatBottomSheetModule,
		MatInputModule,
		MatFormFieldModule,
		MatSnackBarModule
	],
	declarations: [
		AppComponent,
		ExplorerComponent,
		FileViewComponent,
		NewFolderComponent,
		DragNDropDirective,
		EditItemComponent,
	],
	entryComponents: [
		FileViewComponent
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
