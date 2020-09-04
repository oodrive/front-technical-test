import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerRoutingModule } from './file-manager-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PostFileComponent } from './components/post-file/post-file.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotFoundComponent,
		WelcomeComponent,
		PostFileComponent,
		ItemDetailsComponent,
	],
	imports: [
		CommonModule,
		FileManagerRoutingModule,
		ReactiveFormsModule,
	],
	exports: [
		HeaderComponent,
		FooterComponent,
	],
})
export class FileManagerModule { }
