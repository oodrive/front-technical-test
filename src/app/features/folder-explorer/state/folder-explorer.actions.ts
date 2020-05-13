import { createAction, props } from '@ngrx/store';
import { IFile } from 'src/app/core/models/file.model';

export enum actionTypes {
  getFiles = '[File Explorer] Get Files',
  getFilesSuccess = '[File Explorer] Get Files Success',
  openFolder = '[File Explorer] Open Folder',
  renameFile = '[File Explorer] Rename File',
  renameFileSuccess = '[File Explorer] Rename File Success',
  addFolder = '[File Explorer] Add Folder',
  addFolderSuccess = '[File Explorer] Add Folder Success',
  copyFile = '[File Explorer] Copy File',
  pasteFile = '[File Explorer] Paste File',
  pasteFileSuccess = '[File Explorer] Paste File Success',
  removeFile = '[File Explorer] Remove File',
  removeFileSuccess = '[File Explorer] Remove File Success',
  downloadFile = '[File Explorer] Download File',
}

export const getFiles = createAction(actionTypes.getFiles, props<IFile>());
export const getFilesSuccess = createAction(
  actionTypes.getFilesSuccess,
  props<{ payload: IFile[] }>()
);
export const openFolder = createAction(actionTypes.openFolder, props<IFile>());
export const renameFile = createAction(actionTypes.renameFile, props<IFile>());
export const renameFileSuccess = createAction(
  actionTypes.renameFileSuccess,
  props<{ file: IFile }>()
);
export const addFolder = createAction(
  actionTypes.addFolder,
  props<{ parentFolder: IFile; name: string }>()
);
export const addFolderSuccess = createAction(actionTypes.addFolderSuccess, props<{ file: IFile }>());
export const copyFile = createAction(actionTypes.copyFile, props<{ file: IFile }>());
export const pasteFile = createAction(actionTypes.pasteFile, props<IFile>());
export const pasteFileSuccess = createAction(actionTypes.pasteFileSuccess, props<{ file: IFile }>());
export const removeFile = createAction(actionTypes.removeFile, props<IFile>());
export const removeFileSuccess = createAction(actionTypes.removeFileSuccess, props<{ file: IFile }>());
export const downloadFile = createAction(actionTypes.downloadFile, props<IFile>());
