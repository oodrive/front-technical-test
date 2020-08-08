import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileManagerComponent } from "./file-manager.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TreeModule } from "primeng/tree";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { FileUploadModule } from "primeng/fileupload";
@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		TreeModule,
		BrowserAnimationsModule,
		RouterModule,
		ButtonModule,
		FileUploadModule,
	],
	declarations: [FileManagerComponent],
})
export class FileManagerModule {}
