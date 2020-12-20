import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListFileComponent } from './views/files/list-file/list-file.component';
import { DetailsFileComponent } from './views/files/details-file/details-file.component';
import { AppRoutingModule } from '../app-routing.module.ts.service';
import { FooterComponent } from './views/theme/footer/footer.component';
import { HeaderComponent } from './views/theme/header/header.component';
import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
	imports: [
		BrowserModule,   
			 AppRoutingModule,
			 HttpClientModule,
			  
 
	],
	declarations: [
		AppComponent,
		ListFileComponent,
		DetailsFileComponent,
		FooterComponent,
		HeaderComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
