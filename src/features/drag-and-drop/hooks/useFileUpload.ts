import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {
  addFiles,
  removeFile,
  clearFiles,
  setError
} from '../slices/fileUploadSlice';

export const useFileUpload = () => {
  const dispatch = useDispatch();
  const { files, error } = useSelector(
    (state: RootState) =>
      state.fileUpload || {
        files: [],
        uploadProgress: {},
        uploadStatus: {},
        error: null
      }
  );

  const handleFilesSelected = useCallback(
    (newFiles: File[]) => {
      dispatch(addFiles(newFiles));
    },
    [dispatch]
  );

  const handleFileRemoved = useCallback(
    (fileId: string) => {
      dispatch(removeFile(fileId));
    },
    [dispatch]
  );

  const handleFilesCleared = useCallback(() => {
    dispatch(clearFiles());
  }, [dispatch]);

  const handleError = useCallback(
    (errorMessage: string | null) => {
      dispatch(setError(errorMessage));
    },
    [dispatch]
  );

  return {
    files,
    error,
    handleFilesSelected,
    handleFileRemoved,
    handleFilesCleared,
    handleError
  };
};
