import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FileService } from '../../core/services/file.service';

@Component({
	selector: 'fl-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
	constructor(private router: Router,
				private fileService: FileService) {
	}

	navigate(to: string) {
		this.fileService.select({} as any);
		this.router.navigateByUrl(to);
	}

	back() {
		this.fileService.select({} as any);
		window.history.back();
	}
}
