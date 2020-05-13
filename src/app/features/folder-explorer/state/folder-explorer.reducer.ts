import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import * as FileExplorerActions from './folder-explorer.actions';
import { IFile } from 'src/app/core/models/file.model';

export interface State {
  folderTree: IFile[];
  fileList: IFile[];
  selectFolder: IFile;
  copiedFile: IFile;
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
  on(FileExplorerActions.renameFileSuccess, (state, action) => ({
    ...state,
    fileList: state.fileList.map((file) =>
      file.id === action.file.id ? { ...file, ...action.file } : file
    ),
  })),
  on(FileExplorerActions.addFolderSuccess, (state, action) => ({
    ...state,
    fileList: [...state.fileList, action.file],
  })),
  on(FileExplorerActions.copyFile, (state, action) => ({ ...state, copiedFile: action.file })),
  on(FileExplorerActions.pasteFileSuccess, (state, action) => ({
    ...state,
    copiedFile: null,
    fileList: [...state.fileList, action.file],
  })),
  on(FileExplorerActions.removeFileSuccess, (state, action) => ({
    ...state,
    fileList: state.fileList.filter(file => file.id !== action.file.id),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileExplorerReducer(state, action);
}

export const featureKey = 'fileExplorer';

export const selectFeature = createFeatureSelector<State>(featureKey);

export const getFolderTree = createSelector(selectFeature, (state: State) => state.folderTree);
export const getFileList = createSelector(selectFeature, (state: State) => state.fileList);
export const getCopiedFile = createSelector(selectFeature, (state: State) => state.copiedFile);

const setFolderTree = (folderList: IFile[], folder: IFile) => {
  const index = folderList.findIndex((fd) => fd.id === folder.id);
  if (index > -1) {
    // selelct folde from breadcrumb
    return folderList.slice(0, index + 1);
  }
  // add new folder
  return [...folderList, folder];
};
