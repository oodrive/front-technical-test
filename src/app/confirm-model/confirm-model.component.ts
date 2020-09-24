import {Component, ViewEncapsulation} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
	selector: 'app-confirm-model',
	templateUrl: './confirm-model.component.html',
	styleUrls: ['./confirm-model.component.css'],
	encapsulation: ViewEncapsulation.None,

})
export class ConfirmModelComponent {

	title: string;
	message: string;
	options: string[];
	type: string;
	answer = '';
	public i = 0;

	constructor(public bsModalRef: BsModalRef) {
	}

	respond(answer: string) {
		this.answer = answer;
		this.bsModalRef.hide();
	}
}
