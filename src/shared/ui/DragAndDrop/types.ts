export interface DragAndDropProps {
  className?: string;
  ariaLabel: string;
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
}
