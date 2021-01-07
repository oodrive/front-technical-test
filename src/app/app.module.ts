import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentComponent,
		MenuComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
