import { createAction, props } from '@ngrx/store';
import { File } from 'src/app/core/models/file.model';

export const getFiles = createAction('[File Explorer] Get Files', props<File>());
export const getFilesSuccess = createAction('[File Explorer] Get Files Success', props<{payload: File[]}>());
export const openFolder = createAction('[File Explorer] Open Folder', props<File>());
export const addFolder = createAction(
  '[File Explorer] Open Folder',
  props<{ folder: File; name: string }>()
);
export const copyFile = createAction('[File Explorer] Copy File', props<File>());
export const pasteFile = createAction('[File Explorer] Paste File', props<File>());
export const renameFile = createAction('[File Explorer] Rename File', props<File>());
export const downloadFile = createAction('[File Explorer] Download File', props<File>());
