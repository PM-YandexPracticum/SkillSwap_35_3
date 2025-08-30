import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export const selectFileUploadState = (state: RootState) =>
  state.fileUpload || {
    files: [],
    uploadProgress: {},
    uploadStatus: {},
    error: null
  };

export const selectFiles = createSelector(
  selectFileUploadState,
  (state) => state.files
);

export const selectUploadProgress = createSelector(
  selectFileUploadState,
  (state) => state.uploadProgress
);

export const selectUploadStatus = createSelector(
  selectFileUploadState,
  (state) => state.uploadStatus
);

export const selectUploadError = createSelector(
  selectFileUploadState,
  (state) => state.error
);

export const selectIsUploading = createSelector(selectUploadStatus, (status) =>
  Object.values(status).some((s) => s === 'uploading')
);

export const selectUploadedFilesCount = createSelector(
  selectUploadStatus,
  (status) => Object.values(status).filter((s) => s === 'success').length
);

export const selectTotalFilesCount = createSelector(
  selectFiles,
  (files) => files.length
);
