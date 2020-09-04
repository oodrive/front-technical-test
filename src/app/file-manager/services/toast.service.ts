import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class ToastService {

	constructor() { }

	private swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success ml-sm',
			cancelButton: 'btn btn-danger',
		},
		buttonsStyling: false,
	});

	public success(customTitle?: string): void {
		Swal.fire({
			toast: true,
			icon: 'success',
			position: 'top-end',
			title: customTitle,
			showConfirmButton: false,
			customClass: { popup: 'toaster' },
			timer: 1500,
			showClass: {
				popup: 'animated fadeInDown faster',
			},
			hideClass: {
				popup: 'animated fadeOutUp faster',
			},
		});
	}

	public error(errorText?: string): void {
		Swal.fire({
			toast: true,
			icon: 'error',
			timer: 1500,
			position: 'top-end',
			showConfirmButton: false,
			title: errorText ,
		});
	}

	public info(infoMessage: string): void {
		Swal.fire({
			toast: true,
			icon: 'info',
			timer: 1500,
			position: 'top-end',
			showConfirmButton: false,
			title: infoMessage,
		});
	}

	public delete(message?: string) {
		this.swalWithBootstrapButtons.fire(
			message,
			'success',
		);
	}
}
