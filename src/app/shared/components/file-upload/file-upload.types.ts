export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  previewUrl?: string;
}

export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  showPreview?: boolean;
  disabled?: boolean;
}

export interface FileUploadError {
  type: 'size' | 'type' | 'count';
  message: string;
  file?: File;
}