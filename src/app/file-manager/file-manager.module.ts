import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';

import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';
import { FileManagerComponent } from './file-manager.component';
import { FileManagerRoutingModule } from './file-manager-routing.module';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatMenuModule,
		MatInputModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatGridListModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		FileManagerRoutingModule
	],
	declarations: [
		FileManagerComponent,
		NewFolderDialogComponent,
		RenameDialogComponent
	],
	exports: [FileManagerComponent],
	entryComponents: [NewFolderDialogComponent, RenameDialogComponent]
})
export class FileManagerModule {}
