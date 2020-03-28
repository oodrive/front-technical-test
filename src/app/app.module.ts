import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FilesManagerModule } from './modules/files-manager/files-manager.module';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';

@NgModule({
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		FilesManagerModule,
		SharedModuleModule.forRoot(),
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
})
export class AppModule {
}
