import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListFileComponent } from './views/files/list-file/list-file.component';
import { DetailsFileComponent } from './views/files/details-file/details-file.component';
import { AppRoutingModule } from '../app-routing.module.ts.service';
import { FooterComponent } from './views/theme/footer/footer.component';
import { HeaderComponent } from './views/theme/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		 SidebarModule.forRoot(),
		 FormsModule,
		 ToastrModule.forRoot(), // ToastrModule added
		 BrowserAnimationsModule

	],
	declarations: [
		AppComponent,
		ListFileComponent,
		DetailsFileComponent,
		FooterComponent,
		HeaderComponent,
	],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule {
}
