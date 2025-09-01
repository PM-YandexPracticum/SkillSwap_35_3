import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface FileWithId {
  id: string;
  file: File;
}

export interface FileUploadState {
  files: FileWithId[];
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
      state.files = action.payload.map((file) => ({
        id: nanoid(),
        file
      }));
      state.error = null;
    },
    addFiles: (state, action: PayloadAction<File[]>) => {
      const newFiles = action.payload.filter(
        (newFile) =>
          !state.files.some(
            (existingFile) =>
              existingFile.file.name === newFile.name &&
              existingFile.file.size === newFile.size
          )
      );
      state.files.push(
        ...newFiles.map((file) => ({
          id: nanoid(),
          file
        }))
      );
      state.error = null;
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(
        (fileWithId) => fileWithId.id !== action.payload
      );
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
      action: PayloadAction<{ fileId: string; progress: number }>
    ) => {
      state.uploadProgress[action.payload.fileId] = action.payload.progress;
    },
    setUploadStatus: (
      state,
      action: PayloadAction<{
        fileId: string;
        status: 'idle' | 'uploading' | 'success' | 'error';
      }>
    ) => {
      state.uploadStatus[action.payload.fileId] = action.payload.status;
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
