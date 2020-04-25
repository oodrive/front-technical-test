export interface FileModel {
	id: string;
	parentId?: string;
	name: string;
	folder: boolean;
	creation: string;
	modification: string;
	children?: File[];
}
