import { Injectable, signal } from '@angular/core';
import { UploadedFile, FileUploadError } from './file-upload.types';

@Injectable()
export class FileUploadService {
  private uploadQueue = signal<UploadedFile[]>([]);

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  validateFileType(file: File, accept?: string): boolean {
    if (!accept) return true;
    
    const acceptedTypes = accept.split(',').map(type => type.trim());
    
    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        // Extension check
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      } else if (type.endsWith('/*')) {
        // MIME type wildcard check (e.g., image/*)
        const baseType = type.replace('/*', '');
        return file.type.startsWith(baseType);
      } else {
        // Exact MIME type check
        return file.type === type;
      }
    });
  }

  validateFileSize(file: File, maxSize?: number): boolean {
    if (!maxSize) return true;
    return file.size <= maxSize;
  }

  createPreviewUrl(file: File): string | undefined {
    if (!file.type.startsWith('image/')) return undefined;
    return URL.createObjectURL(file);
  }

  generateFileId(): string {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Simulate file upload with progress
  async simulateUpload(file: UploadedFile, onProgress: (progress: number) => void): Promise<void> {
    const totalSteps = 10;
    const stepDuration = 200; // ms
    
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      const progress = (i / totalSteps) * 100;
      onProgress(progress);
    }
  }

  // Clean up object URLs when no longer needed
  revokePreviewUrl(url: string): void {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }
}