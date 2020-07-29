export interface ItemInterface {
	id?: string;
	name: string;
	folder: boolean;
	creation?: string;
	modification?: string;
	_links: { [index: string]: { href: string; type: string } };
}
