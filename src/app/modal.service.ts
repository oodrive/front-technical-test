import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';

@Injectable({
	providedIn: 'root',
})

export class ModalService {

	bsModalRef: BsModalRef;

	constructor(private bsModalService: BsModalService) {
	}

	confirm(title: string, message: string, options: string[]): Observable<string> {
		const initialState = {
			title,
			message,
			options,
			type: 'danger',
			answer: '',
		}
		;
		this.bsModalRef = this.bsModalService.show(ConfirmModelComponent,
			{
				initialState,
				class: 'my-modal-confirme modal-dialog',
				backdrop: true,
				keyboard: false,
				ignoreBackdropClick: true,
			},
		);
		return new Observable<string>(this.getConfirmSubscriber());
	}

	private getConfirmSubscriber() {
		// @ts-ignore
		return (observer) => {
			// @ts-ignore
			const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
				observer.next(this.bsModalRef.content.answer);
				observer.complete();
			});

			return {
				unsubscribe() {
					subscription.unsubscribe();
				},
			};
		};
	}
}
