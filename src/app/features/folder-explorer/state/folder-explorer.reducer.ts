import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as FileExplorerActions from './folder-explorer.actions';
import { File } from 'src/app/core/models/file.model';

export interface State {
  folderTree: File[];
  fileList: File[];
  selectFolder: File;
  copiedFile: File;
}

export const initialState: State = {
  folderTree: [
    { id: null, name: 'my-folder', folder: true, creation: new Date(), modification: new Date() },
  ],
  fileList: [],
  selectFolder: null,
  copiedFile: null,
};

const fileExplorerReducer = createReducer(
  initialState,
  on(FileExplorerActions.getFiles, (state) => ({ ...state })),
  on(FileExplorerActions.getFilesSuccess, (state, action) => ({
    ...state,
    fileList: action.payload,
  })),
  on(FileExplorerActions.openFolder, (state, action) => ({
    ...state,
    folderTree: setFolderTree(state.folderTree, action),
  })),
  on(FileExplorerActions.copyFile, (state, action) => ({ ...state, copiedFile: action })),
  on(FileExplorerActions.pasteFile, (state) => ({ ...state, copiedFile: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileExplorerReducer(state, action);
}

export const featureKey = 'fileExplorer';

export const selectFeature = createFeatureSelector<State>(featureKey);

export const getFolderTree = createSelector(selectFeature, (state: State) => state.folderTree);
export const getFileList = createSelector(selectFeature, (state: State) => state.fileList);

const setFolderTree = (folderList: File[], folder: File) => {
  const index = folderList.findIndex((fd) => fd.id === folder.id);
  if (index > -1) {
    // selelct folde from breadcrumb
    return folderList.slice(0, index + 1);
  }
  // add new folder
  return [...folderList, folder];
};
