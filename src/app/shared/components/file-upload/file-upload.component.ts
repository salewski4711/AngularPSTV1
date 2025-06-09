import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedFile, FileUploadError } from './file-upload.types';
import { FileUploadService } from './file-upload.service';
import { IconComponent } from '../../icons/icon.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'pst-file-upload',
  standalone: true,
  imports: [CommonModule, IconComponent, ProgressBarComponent],
  providers: [FileUploadService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <!-- Drop Zone -->
      <div
        #dropZone
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        class="relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200"
        [class]="dropZoneClasses()"
        [class.opacity-50]="disabled"
        [class.cursor-not-allowed]="disabled"
      >
        <input
          #fileInput
          type="file"
          [accept]="accept"
          [multiple]="multiple"
          [disabled]="disabled"
          (change)="onFileSelect($event)"
          class="hidden"
        />
        
        <div class="flex flex-col items-center space-y-3">
          <pst-icon 
            [name]="isDragging() ? 'download' : 'upload-cloud'" 
            size="xl" 
            class="text-gray-400 dark:text-gray-600"
          />
          
          <div>
            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
              {{ isDragging() ? 'Drop files here' : 'Click to upload or drag and drop' }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ getAcceptText() }}
              @if (maxSize) {
                <span class="block">Max file size: {{ formatFileSize(maxSize) }}</span>
              }
              @if (maxFiles && multiple) {
                <span class="block">Max files: {{ maxFiles }}</span>
              }
            </p>
          </div>
        </div>
      </div>

      <!-- Error Messages -->
      @if (errors().length > 0) {
        <div class="mt-4 space-y-2">
          @for (error of errors(); track error.message) {
            <div class="flex items-start space-x-2 text-sm text-red-600 dark:text-red-400">
              <pst-icon name="alert-circle" size="xs" class="mt-0.5" />
              <span>{{ error.message }}</span>
            </div>
          }
        </div>
      }

      <!-- File List -->
      @if (files().length > 0) {
        <div class="mt-6 space-y-3">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded Files ({{ files().length }})
          </h3>
          
          @for (file of files(); track file.id) {
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <!-- Preview or Icon -->
                @if (showPreview && file.previewUrl) {
                  <img 
                    [src]="file.previewUrl" 
                    [alt]="file.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                } @else {
                  <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <pst-icon [name]="getFileIcon(file.type)" size="lg" class="text-gray-500 dark:text-gray-400" />
                  </div>
                }
                
                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {{ file.name }}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatFileSize(file.size) }}
                      </p>
                    </div>
                    
                    <!-- Remove Button -->
                    @if (file.status !== 'uploading') {
                      <button
                        type="button"
                        (click)="removeFile(file)"
                        class="ml-4 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        [attr.aria-label]="'Remove ' + file.name"
                      >
                        <pst-icon name="x" size="xs" />
                      </button>
                    }
                  </div>
                  
                  <!-- Progress Bar -->
                  @if (file.status === 'uploading') {
                    <div class="mt-2">
                      <pst-progress-bar 
                        [value]="file.progress" 
                        [max]="100"
                        size="sm"
                      />
                    </div>
                  }
                  
                  <!-- Status -->
                  @if (file.status === 'success') {
                    <div class="flex items-center space-x-1 mt-2 text-green-600 dark:text-green-400">
                      <pst-icon name="check-circle" size="xs" />
                      <span class="text-xs">Upload complete</span>
                    </div>
                  }
                  
                  @if (file.status === 'error') {
                    <div class="flex items-center space-x-1 mt-2 text-red-600 dark:text-red-400">
                      <pst-icon name="x-circle" size="xs" />
                      <span class="text-xs">{{ file.error || 'Upload failed' }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class FileUploadComponent implements OnDestroy {
  @Input() accept?: string;
  @Input() multiple = false;
  @Input() maxSize?: number; // in bytes
  @Input() maxFiles = 10;
  @Input() showPreview = true;
  @Input() disabled = false;
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<UploadedFile>();
  @Output() uploadProgress = new EventEmitter<{ file: UploadedFile, progress: number }>();

  @ViewChild('dropZone') dropZoneRef!: ElementRef<HTMLElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  files = signal<UploadedFile[]>([]);
  errors = signal<FileUploadError[]>([]);
  isDragging = signal(false);

  private dragCounter = 0;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnDestroy(): void {
    // Clean up preview URLs
    this.files().forEach(file => {
      if (file.previewUrl) {
        this.fileUploadService.revokePreviewUrl(file.previewUrl);
      }
    });
  }

  dropZoneClasses = computed(() => {
    const base = 'border-gray-300 dark:border-gray-600';
    const hover = 'hover:border-primary-500 dark:hover:border-primary-400';
    const dragging = this.isDragging() 
      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400' 
      : '';
    
    return `${base} ${hover} ${dragging}`;
  });

  formatFileSize(bytes: number): string {
    return this.fileUploadService.formatFileSize(bytes);
  }

  getAcceptText(): string {
    if (!this.accept) return 'All file types allowed';
    
    const types = this.accept.split(',').map(t => t.trim());
    if (types.includes('image/*')) return 'Images only';
    if (types.includes('video/*')) return 'Videos only';
    if (types.includes('audio/*')) return 'Audio files only';
    if (types.includes('.pdf')) return 'PDF files only';
    
    return `Allowed: ${types.join(', ')}`;
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'play-circle';
    if (type.startsWith('audio/')) return 'play-circle';
    if (type === 'application/pdf') return 'file-text';
    if (type.includes('sheet') || type.includes('excel')) return 'table';
    if (type.includes('document') || type.includes('word')) return 'file-text';
    return 'file';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.disabled) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.isDragging.set(false);
    }
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.dragCounter++;
    if (!this.disabled) {
      this.isDragging.set(true);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.dragCounter = 0;
    this.isDragging.set(false);
    
    if (this.disabled || !event.dataTransfer) return;
    
    const files = Array.from(event.dataTransfer.files);
    this.processFiles(files);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    
    const files = Array.from(input.files);
    this.processFiles(files);
    
    // Reset input
    input.value = '';
  }

  private processFiles(files: File[]): void {
    const errors: FileUploadError[] = [];
    const validFiles: File[] = [];
    const currentFileCount = this.files().length;
    
    // Check max files
    if (this.maxFiles && currentFileCount + files.length > this.maxFiles) {
      errors.push({
        type: 'count',
        message: `Maximum ${this.maxFiles} files allowed. You already have ${currentFileCount} file(s).`
      });
      
      // Limit files to process
      files = files.slice(0, this.maxFiles - currentFileCount);
    }
    
    // Validate each file
    files.forEach(file => {
      // Type validation
      if (!this.fileUploadService.validateFileType(file, this.accept)) {
        errors.push({
          type: 'type',
          message: `File "${file.name}" is not an allowed type.`,
          file
        });
        return;
      }
      
      // Size validation
      if (!this.fileUploadService.validateFileSize(file, this.maxSize)) {
        errors.push({
          type: 'size',
          message: `File "${file.name}" exceeds maximum size of ${this.formatFileSize(this.maxSize!)}.`,
          file
        });
        return;
      }
      
      validFiles.push(file);
    });
    
    // Update errors
    this.errors.set(errors);
    
    // Process valid files
    if (validFiles.length > 0) {
      const uploadedFiles: UploadedFile[] = validFiles.map(file => ({
        id: this.fileUploadService.generateFileId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending' as const,
        previewUrl: this.showPreview ? this.fileUploadService.createPreviewUrl(file) : undefined
      }));
      
      // Add to files list
      this.files.update(files => [...files, ...uploadedFiles]);
      
      // Emit event
      this.filesSelected.emit(validFiles);
      
      // Simulate upload
      uploadedFiles.forEach(file => this.simulateUpload(file));
    }
  }

  private async simulateUpload(file: UploadedFile): Promise<void> {
    // Update status to uploading
    this.updateFileStatus(file.id, 'uploading');
    
    try {
      await this.fileUploadService.simulateUpload(file, (progress) => {
        this.updateFileProgress(file.id, progress);
        this.uploadProgress.emit({ file, progress });
      });
      
      // Update status to success
      this.updateFileStatus(file.id, 'success');
    } catch (error) {
      // Update status to error
      this.updateFileStatus(file.id, 'error', 'Upload failed');
    }
  }

  private updateFileStatus(fileId: string, status: UploadedFile['status'], error?: string): void {
    this.files.update(files => 
      files.map(f => f.id === fileId ? { ...f, status, error } : f)
    );
  }

  private updateFileProgress(fileId: string, progress: number): void {
    this.files.update(files => 
      files.map(f => f.id === fileId ? { ...f, progress } : f)
    );
  }

  removeFile(file: UploadedFile): void {
    // Clean up preview URL
    if (file.previewUrl) {
      this.fileUploadService.revokePreviewUrl(file.previewUrl);
    }
    
    // Remove from list
    this.files.update(files => files.filter(f => f.id !== file.id));
    
    // Clear errors if no files left
    if (this.files().length === 0) {
      this.errors.set([]);
    }
    
    // Emit event
    this.fileRemoved.emit(file);
  }
}