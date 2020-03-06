export interface Item {
	id:string;
	name?:string;
	folder:boolean;
	parentId?:string;
    creation:Date;
    modification:Date;
}
