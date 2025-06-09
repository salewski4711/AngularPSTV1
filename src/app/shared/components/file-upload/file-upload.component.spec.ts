import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadService } from './file-upload.service';
import { UploadedFile } from './file-upload.types';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let fileUploadService: jasmine.SpyObj<FileUploadService>;

  beforeEach(async () => {
    const fileUploadServiceSpy = jasmine.createSpyObj('FileUploadService', [
      'generateFileId',
      'validateFile',
      'createPreviewUrl',
      'revokePreviewUrl',
      'formatFileSize',
      'getFileIcon',
      'simulateUpload'
    ]);

    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
      providers: [
        { provide: FileUploadService, useValue: fileUploadServiceSpy }
      ]
    }).compileComponents();

    fileUploadService = TestBed.inject(FileUploadService) as jasmine.SpyObj<FileUploadService>;
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('File Selection', () => {
    it('should handle file selection through input', () => {
      const files = [new File(['content'], 'test.txt', { type: 'text/plain' })];
      const mockEvent = { target: { files } } as any;
      
      fileUploadService.generateFileId.and.returnValue('file-123');
      fileUploadService.validateFile.and.returnValue({ valid: true });
      fileUploadService.formatFileSize.and.returnValue('10 KB');
      
      spyOn(component.filesSelected, 'emit');
      
      component.onFileSelect(mockEvent);
      
      expect(component.files().length).toBe(1);
      expect(component.files()[0].name).toBe('test.txt');
      expect(component.filesSelected.emit).toHaveBeenCalled();
    });

    it('should validate file size', () => {
      component.maxSize.and.returnValue(100); // 100 bytes max
      const largeFile = new File(['x'.repeat(200)], 'large.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [largeFile] } } as any;
      
      fileUploadService.validateFile.and.returnValue({ 
        valid: false, 
        error: 'Die Datei ist zu groß. Maximale Größe: 0.00 MB' 
      });
      
      component.onFileSelect(mockEvent);
      
      expect(component.files().length).toBe(0);
      expect(component.errorMessage()).toContain('Die Datei ist zu groß');
    });

    it('should validate file type', () => {
      component.accept.and.returnValue('image/*');
      const textFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [textFile] } } as any;
      
      fileUploadService.validateFile.and.returnValue({ 
        valid: false, 
        error: 'Dateityp nicht erlaubt. Erlaubte Typen: image/*' 
      });
      
      component.onFileSelect(mockEvent);
      
      expect(component.files().length).toBe(0);
      expect(component.errorMessage()).toContain('Dateityp nicht erlaubt');
    });

    it('should enforce max files limit', () => {
      component.maxFiles.and.returnValue(2);
      component.files.set([
        { id: '1', name: 'file1.txt', size: 100, type: 'text/plain', progress: 0, status: 'completed' } as UploadedFile,
        { id: '2', name: 'file2.txt', size: 100, type: 'text/plain', progress: 0, status: 'completed' } as UploadedFile
      ]);
      
      const newFile = new File(['content'], 'file3.txt', { type: 'text/plain' });
      const mockEvent = { target: { files: [newFile] } } as any;
      
      component.onFileSelect(mockEvent);
      
      expect(component.files().length).toBe(2);
      expect(component.errorMessage()).toContain('Maximale Anzahl von 2 Dateien erreicht');
    });
  });

  describe('Drag and Drop', () => {
    it('should handle drag over', () => {
      const mockEvent = new DragEvent('dragover');
      spyOn(mockEvent, 'preventDefault');
      spyOn(mockEvent, 'stopPropagation');
      
      component.onDragOver(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(true);
    });

    it('should handle drag leave', () => {
      const mockEvent = new DragEvent('dragleave');
      spyOn(mockEvent, 'preventDefault');
      spyOn(mockEvent, 'stopPropagation');
      
      component.isDragging.set(true);
      component.onDragLeave(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(false);
    });

    it('should handle drop', () => {
      const files = [new File(['content'], 'test.txt', { type: 'text/plain' })];
      const mockEvent = new DragEvent('drop');
      Object.defineProperty(mockEvent, 'dataTransfer', {
        value: { files },
        writable: false
      });
      
      spyOn(mockEvent, 'preventDefault');
      spyOn(mockEvent, 'stopPropagation');
      
      fileUploadService.generateFileId.and.returnValue('file-123');
      fileUploadService.validateFile.and.returnValue({ valid: true });
      
      component.isDragging.set(true);
      component.onDrop(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(component.isDragging()).toBe(false);
      expect(component.files().length).toBe(1);
    });
  });

  describe('File Management', () => {
    it('should remove file', () => {
      const file: UploadedFile = {
        id: 'file-123',
        file: new File(['content'], 'test.txt'),
        name: 'test.txt',
        size: 100,
        type: 'text/plain',
        progress: 0,
        status: 'completed'
      };
      
      component.files.set([file]);
      spyOn(component.fileRemoved, 'emit');
      
      component.removeFile(file);
      
      expect(component.files().length).toBe(0);
      expect(component.fileRemoved.emit).toHaveBeenCalledWith(file);
    });

    it('should not remove file when disabled', () => {
      const file: UploadedFile = {
        id: 'file-123',
        file: new File(['content'], 'test.txt'),
        name: 'test.txt',
        size: 100,
        type: 'text/plain',
        progress: 0,
        status: 'completed'
      };
      
      component.files.set([file]);
      component.disabled.and.returnValue(true);
      spyOn(component.fileRemoved, 'emit');
      
      component.removeFile(file);
      
      expect(component.files().length).toBe(1);
      expect(component.fileRemoved.emit).not.toHaveBeenCalled();
    });

    it('should create preview URL for images', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const mockEvent = { target: { files: [imageFile] } } as any;
      
      fileUploadService.generateFileId.and.returnValue('file-123');
      fileUploadService.validateFile.and.returnValue({ valid: true });
      fileUploadService.createPreviewUrl.and.returnValue('blob:preview-url');
      component.showPreview.and.returnValue(true);
      
      component.onFileSelect(mockEvent);
      
      expect(component.files()[0].previewUrl).toBe('blob:preview-url');
    });

    it('should not create preview URL when showPreview is false', () => {
      const imageFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const mockEvent = { target: { files: [imageFile] } } as any;
      
      fileUploadService.generateFileId.and.returnValue('file-123');
      fileUploadService.validateFile.and.returnValue({ valid: true });
      component.showPreview.and.returnValue(false);
      
      component.onFileSelect(mockEvent);
      
      expect(component.files()[0].previewUrl).toBeUndefined();
      expect(fileUploadService.createPreviewUrl).not.toHaveBeenCalled();
    });
  });

  describe('Upload Progress', () => {
    it('should simulate upload and emit progress', async () => {
      const file: UploadedFile = {
        id: 'file-123',
        file: new File(['content'], 'test.txt'),
        name: 'test.txt',
        size: 100,
        type: 'text/plain',
        progress: 0,
        status: 'pending'
      };
      
      component.files.set([file]);
      spyOn(component.uploadProgress, 'emit');
      
      let progressCallback: (progress: number) => void;
      fileUploadService.simulateUpload.and.callFake((f, cb) => {
        progressCallback = cb;
        return Promise.resolve();
      });
      
      // Trigger the effect by detecting changes
      fixture.detectChanges();
      
      // Wait for effect to run
      await fixture.whenStable();
      
      // Simulate progress updates
      progressCallback!(50);
      expect(component.uploadProgress.emit).toHaveBeenCalledWith({ file: jasmine.any(Object), progress: 50 });
      
      progressCallback!(100);
      expect(component.uploadProgress.emit).toHaveBeenCalledWith({ file: jasmine.any(Object), progress: 100 });
    });
  });

  describe('Cleanup', () => {
    it('should revoke preview URLs on destroy', () => {
      const file: UploadedFile = {
        id: 'file-123',
        file: new File(['content'], 'test.jpg'),
        name: 'test.jpg',
        size: 100,
        type: 'image/jpeg',
        progress: 0,
        status: 'completed',
        previewUrl: 'blob:preview-url'
      };
      
      component.files.set([file]);
      
      component.ngOnDestroy();
      
      expect(fileUploadService.revokePreviewUrl).toHaveBeenCalledWith('blob:preview-url');
    });
  });
});