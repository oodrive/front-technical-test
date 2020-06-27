import { Component, OnInit } from '@angular/core';
import {Item, ApiError, ItemList} from '../models/item.model';
import { ItemService } from '../services/item.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'fl-manage-folders',
  templateUrl: './manage-folders.component.html',
  styleUrls: ['./manage-folders.component.css']
})
export class ManageFoldersComponent implements OnInit {
	folders : Item[] = [];
	path : any[] = [];

	parentId : string;
	itemSelected : Item;
	displayModalRename: boolean=false;
	displayModalUpload: boolean=false;
	displayModalCreate: boolean=false;
	newName : string;

	fileActions = [
		{
			label: 'Download', 
			command: () => {
                this.downloadFile();
            },
            icon: 'pi pi-download',
		},
		{
			label: 'Rename', 
			command : ()=>this.rename(),
            icon: 'pi pi-user-edit',
		},
		{
			label: 'Delete',
			command : ()=>this.delete(),
            icon: 'pi pi-trash',
		}
	];
	folderActions = [
		{
			label: 'Rename', 
			command : ()=>this.rename(),
            icon: 'pi pi-user-edit',
		},
		{
			label: 'Delete',
			command : ()=>this.delete(),
            icon: 'pi pi-trash',
		}
	]
	constructor(private itemService : ItemService,
	private router : Router,
	private messageService: MessageService,
	private confirmationService: ConfirmationService,
	private route : ActivatedRoute) { }

  ngOnInit() {
	this.route.params.subscribe(
		params =>{
			if (params.parentId){
				this.parentId = params.parentId;
			}
			this.getItems();
			this.getPath();
		}
	)
	  
	  
  }
  

  getItems(){
	this.itemService.getItems(this.parentId)
	.subscribe(res =>{
		this.folders = res.items;
	} );
  }
  getPath(){
	  if (!this.parentId){
		  return;
	  }
	this.itemService.getPath(this.parentId)
	.subscribe((res:ItemList)=>{
		this.path = res.items.map(x=>  {
			return {label:x.name, id:x.id}
		})
	} );
  }
  gotoFolder(folder:Item){
	this.router.navigate([`folders/${folder.id}`])
  }
  itemClicked(folder:Item){
	if (folder.id){
		this.router.navigate([`folders/${folder.id}`])
	}
	else{
		this.router.navigate([`folders`])
	}
  }


	downloadFile(){
	this.itemService.downloadFile(this.itemSelected)
		.subscribe(() =>{
			this.success("File downloaded with success")
		},
		(error)=>{
			this.error(error.message);
		});

	}
	rename(){
		this.newName = this.itemSelected.name.split(".").find(x=>x) || '';
		this.displayModalRename = true;
	}
	delete(){
		this.confirmationService.confirm({
            message: `Are you sure that you want to delete this ${this.itemSelected.folder ? 'folder' :'file'} : ${this.itemSelected.name}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
				this.itemService.deleteFile(this.itemSelected).subscribe(
					()=>{
						const index = this.folders.indexOf(this.itemSelected);
						this.folders.splice(index,1);
						this.success(`${this.itemSelected.name} deleted with succes`)
					},
					(error : {error:ApiError})=>{
						this.error(error.error.desc);
					}
				)
            },
            reject: () => {
            }
        });
	}

	ApplyRename(){
		this.displayModalRename = false;
		const oldName = this.itemSelected.name.split(".").find(x=>x) || '';
		const newName = this.itemSelected.name.replace(oldName,this.newName);
		this.itemService.renameFile(this.itemSelected,newName).subscribe(
			(res:Item)=>{
				this.itemSelected.name = res.name;
				this.success(res.name);
			},
			(error : {error:ApiError})=>{
				this.error(error.error.desc);
			}
		)
		
	}

	createFolder(){
		this.newName = "";
		this.displayModalCreate = true;
	}

	saveFolder(){
		this.displayModalCreate = false;
		this.itemService.createFolder(this.newName,this.parentId)
			.subscribe((res : Item) =>{
				this.folders.push(res);
				this.success(res.name);
			},
			(error : {error:ApiError})=>{
				this.error(error.error.desc);
			} );
		
	}

	uploadFile(){
		this.displayModalUpload = true;
	}
	onUpload(event:any){
		event.files.forEach((file :Item)=> {
			
			this.itemService.uploadFile(file.name,this.parentId)
				.subscribe((res : Item) =>{
					this.folders.push(res)
					this.success(res.name);
				},
				(error)=>{
					this.error(error.error.desc)
				} );
		});

		this.displayModalUpload = false;
		
	}

	error(detail:string) {
		this.messageService.add({key: 'tr', 
		severity:'error', summary: 'Error Message', detail:detail});
	}
	
	success(detail:string) {
		this.messageService.add({key: 'tr', severity:'success',
		 summary: 'success Message', detail:detail});
    }

	
}
