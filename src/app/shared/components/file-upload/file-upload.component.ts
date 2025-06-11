import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedFile, FileUploadError } from './file-upload.types';
import { FileUploadService } from './file-upload.service';
import { IconComponent } from '../../icons/icon.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { fileUploadClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

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
        [class]="dropZoneClass()"
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
            [class]="fileUploadClasses.icon.upload"
          />
          
          <div>
            <p [class]="fileUploadClasses.text.title">
              {{ isDragging() ? 'Drop files here' : 'Click to upload or drag and drop' }}
            </p>
            <p [class]="fileUploadClasses.text.description">
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
            <div [class]="fileUploadClasses.error.message">
              <pst-icon name="alert-circle" size="xs" class="mt-0.5" />
              <span>{{ error.message }}</span>
            </div>
          }
        </div>
      }

      <!-- File List -->
      @if (files().length > 0) {
        <div class="mt-6 space-y-3">
          <h3 [class]="fileUploadClasses.fileList.header">
            Uploaded Files ({{ files().length }})
          </h3>
          
          @for (file of files(); track file.id) {
            <div [class]="fileUploadClasses.fileList.item.container">
              <div class="flex items-start space-x-3">
                <!-- Preview or Icon -->
                @if (showPreview && file.previewUrl) {
                  <img 
                    [src]="file.previewUrl" 
                    [alt]="file.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                } @else {
                  <div [class]="fileUploadClasses.fileList.item.iconContainer">
                    <pst-icon [name]="getFileIcon(file.type)" size="lg" [class]="fileUploadClasses.icon.file" />
                  </div>
                }
                
                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="min-w-0">
                      <p [class]="fileUploadClasses.fileList.item.fileName">
                        {{ file.name }}
                      </p>
                      <p [class]="fileUploadClasses.fileList.item.fileSize">
                        {{ formatFileSize(file.size) }}
                      </p>
                    </div>
                    
                    <!-- Remove Button -->
                    @if (file.status !== 'uploading') {
                      <button
                        type="button"
                        (click)="removeFile(file)"
                        [class]="fileUploadClasses.fileList.item.removeButton"
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
                    <div [class]="fileUploadClasses.fileList.status.success">
                      <pst-icon name="check-circle" size="xs" />
                      <span class="text-xs">Upload complete</span>
                    </div>
                  }
                  
                  @if (file.status === 'error') {
                    <div [class]="fileUploadClasses.fileList.status.error">
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

  // Static class references
  readonly fileUploadClasses = fileUploadClasses;

  // Computed class for drop zone (combines base with conditional dragging state)
  dropZoneClass = computed(() => {
    const base = fileUploadClasses.dropZone.base;
    const dragging = this.isDragging() ? fileUploadClasses.dropZone.dragging : '';
    return `${base} ${dragging}`.trim();
  });

  constructor(private fileUploadService: FileUploadService) {}

  ngOnDestroy(): void {
    // Clean up preview URLs
    this.files().forEach(file => {
      if (file.previewUrl) {
        this.fileUploadService.revokePreviewUrl(file.previewUrl);
      }
    });
  }

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