export class Item {
	id: string;
	parentId: string;
	name: string;
	folder: boolean;
	creation: Date;
	modification: Date;

	constructor(id: string, parentId: string, name: string, folder: boolean, creation: Date, modification: Date) {
		this.id = id;
		this.parentId = parentId;
		this.name = name;
		this.folder = folder;
		this.creation = creation;
		this.modification = modification;
	}
}