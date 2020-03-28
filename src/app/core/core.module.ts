import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Helper } from './services/helper.service';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		BrowserAnimationsModule,
	],
	declarations: [],
	providers: [Helper],
})
export class CoreModule {
	/**
	 * CoreModule constructor
	 *
	 * @param parentModule
	 */
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(`${parentModule} has already been loaded. Import Core modules in the AppModule only.`);
		}
	}
}
