import { createAction, props } from '@ngrx/store';
import { File } from 'src/app/core/models/file.model';

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
  downloadFile = '[File Explorer] Download File',
}

export const getFiles = createAction(actionTypes.getFiles, props<File>());
export const getFilesSuccess = createAction(
  actionTypes.getFilesSuccess,
  props<{ payload: File[] }>()
);
export const openFolder = createAction(actionTypes.openFolder, props<File>());
export const renameFile = createAction(actionTypes.renameFile, props<File>());
export const renameFileSuccess = createAction(
  actionTypes.renameFileSuccess,
  props<{ file: File }>()
);
export const addFolder = createAction(
  actionTypes.addFolder,
  props<{ parentFolder: File; name: string }>()
);
export const addFolderSuccess = createAction(actionTypes.addFolderSuccess, props<{ file: File }>());
export const copyFile = createAction(actionTypes.copyFile, props<{ file: File }>());
export const pasteFile = createAction(actionTypes.pasteFile, props<File>());
export const pasteFileSuccess = createAction(actionTypes.pasteFileSuccess, props<{ file: File }>());
export const downloadFile = createAction(actionTypes.downloadFile, props<File>());
