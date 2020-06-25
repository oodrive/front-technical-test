export class ItemCreate {
  name :string;
  folder :boolean;
constructor(item?:any){
    item = item || {};
    this.name = item.name || '';
    this.folder = item.folder || false;

    }
}

export interface Item {
  id :string;
  parentId :string;
  name :string;
  folder :boolean;
  creation :Date;
  modification :Date;
}

export interface ItemList {
  items :Item[];
}

export interface ItemUploadResponse {
  items :Item[];
  errors :any[];
  
}

export interface ApiError {
  name :string;
  desc :string;
  code :string;
}