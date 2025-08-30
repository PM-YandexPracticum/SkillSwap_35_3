import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FileUploadState {
  files: File[];
  uploadProgress: Record<string, number>;
  uploadStatus: Record<string, 'idle' | 'uploading' | 'success' | 'error'>;
  error: string | null;
}

const initialState: FileUploadState = {
  files: [],
  uploadProgress: {},
  uploadStatus: {},
  error: null
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      state.error = null;
    },
    addFiles: (state, action: PayloadAction<File[]>) => {
      const newFiles = action.payload.filter(
        (newFile) =>
          !state.files.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );
      state.files.push(...newFiles);
      state.error = null;
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.name !== action.payload);
      delete state.uploadProgress[action.payload];
      delete state.uploadStatus[action.payload];
    },
    clearFiles: (state) => {
      state.files = [];
      state.uploadProgress = {};
      state.uploadStatus = {};
      state.error = null;
    },
    setUploadProgress: (
      state,
      action: PayloadAction<{ fileName: string; progress: number }>
    ) => {
      state.uploadProgress[action.payload.fileName] = action.payload.progress;
    },
    setUploadStatus: (
      state,
      action: PayloadAction<{
        fileName: string;
        status: 'idle' | 'uploading' | 'success' | 'error';
      }>
    ) => {
      state.uploadStatus[action.payload.fileName] = action.payload.status;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setFiles,
  addFiles,
  removeFile,
  clearFiles,
  setUploadProgress,
  setUploadStatus,
  setError
} = fileUploadSlice.actions;

export const fileUploadSliceReducer = fileUploadSlice.reducer;
export default fileUploadSlice.reducer;
