import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContainerModule } from './container/container.module';
import { BreadcrumbModule } from '../components/breadcrumb/breadcrumb.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ContainerModule,
		HttpClientModule,
		BreadcrumbModule,
		FormsModule,
	],
	exports: [ContainerModule, BreadcrumbModule, FormsModule],
})
export class CoreModule {
}
