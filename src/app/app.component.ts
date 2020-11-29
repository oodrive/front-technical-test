import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { first } from 'rxjs/internal/operators';
import { Item } from '../models/item';

@Component({
	selector: 'oo-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private itemService: ItemService) {	}
	items: Item[] = [];
	ngOnInit() {
		this.itemService.read()
			.pipe(first())
			.subscribe(
				(data: Item[]) => {
					this.items = data;
				},
				(error: Error) => {
					console.log(error);
				});
	}
}
