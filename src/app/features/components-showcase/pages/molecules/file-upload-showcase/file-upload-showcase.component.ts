import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { FileUploadComponent, UploadedFile } from '../../../../../shared/components/file-upload';

@Component({
  selector: 'pst-file-upload-showcase',
  standalone: true,
  imports: [CommonModule, ShowcaseTemplateComponent, FileUploadComponent],
  template: `
    <pst-showcase-template
      title="File Upload"
      description="Drag and drop file upload component with validation and progress"
      [sections]="sections"
      [props]="props"
    >
      <!-- Basic Example -->
      <div class="space-y-8">
        <div class="example-section">
          <h3 class="text-lg font-semibold mb-4">Basic File Upload</h3>
          <pst-file-upload
            (filesSelected)="onFilesSelected($event)"
            (fileRemoved)="onFileRemoved($event)"
          />
        </div>

        <div class="example-section">
          <h3 class="text-lg font-semibold mb-4">Image Upload Only</h3>
          <pst-file-upload
            accept="image/*"
            [showPreview]="true"
            (filesSelected)="onFilesSelected($event)"
          />
        </div>

        <div class="example-section">
          <h3 class="text-lg font-semibold mb-4">Multiple Files with Size Limit</h3>
          <pst-file-upload
            [multiple]="true"
            [maxFiles]="5"
            [maxSize]="5242880"
            accept=".pdf,.doc,.docx"
            (filesSelected)="onFilesSelected($event)"
          />
        </div>

        <div class="example-section">
          <h3 class="text-lg font-semibold mb-4">Disabled State</h3>
          <pst-file-upload
            [disabled]="true"
          />
        </div>
      </div>
    </pst-showcase-template>
  `
})
export class FileUploadShowcaseComponent {
  sections = [
    {
      title: 'Basic Usage',
      code: `<pst-file-upload
  (filesSelected)="onFilesSelected($event)"
  (fileRemoved)="onFileRemoved($event)"
/>`
    },
    {
      title: 'With Restrictions',
      code: `<pst-file-upload
  accept="image/*"
  [multiple]="true"
  [maxFiles]="5"
  [maxSize]="5242880"
  [showPreview]="true"
  (filesSelected)="onFilesSelected($event)"
/>`
    },
    {
      title: 'Component Usage',
      code: `import { FileUploadComponent } from '@shared/components/file-upload';

@Component({
  // ...
  imports: [FileUploadComponent]
})
export class MyComponent {
  onFilesSelected(files: File[]): void {
    console.log('Files selected:', files);
  }

  onFileRemoved(file: UploadedFile): void {
    console.log('File removed:', file);
  }

  onUploadProgress(event: { file: UploadedFile, progress: number }): void {
    console.log(\`Upload progress for \${event.file.name}: \${event.progress}%\`);
  }
}`
    }
  ];

  props = [
    { name: 'accept', type: 'string', default: '-', description: 'Accepted file types (e.g., "image/*", ".pdf")' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple file selection' },
    { name: 'maxSize', type: 'number', default: '-', description: 'Maximum file size in bytes' },
    { name: 'maxFiles', type: 'number', default: '10', description: 'Maximum number of files allowed' },
    { name: 'showPreview', type: 'boolean', default: 'true', description: 'Show image previews for image files' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the file upload' },
    { name: 'filesSelected', type: 'EventEmitter<File[]>', default: '-', description: 'Emits when files are selected' },
    { name: 'fileRemoved', type: 'EventEmitter<UploadedFile>', default: '-', description: 'Emits when a file is removed' },
    { name: 'uploadProgress', type: 'EventEmitter<{file, progress}>', default: '-', description: 'Emits upload progress updates' }
  ];

  onFilesSelected(files: File[]): void {
    console.log('Files selected:', files);
  }

  onFileRemoved(file: UploadedFile): void {
    console.log('File removed:', file);
  }
}