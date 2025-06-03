import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/icons/icon.component';

declare let Prism: any;

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative rounded-lg overflow-hidden bg-gray-900 dark:bg-gray-950">
      <!-- Header -->
      @if (fileName || language) {
        <div class="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
          @if (fileName) {
            <span class="text-sm text-gray-400">{{ fileName }}</span>
          }
          <div class="flex items-center gap-2">
            @if (language) {
              <span class="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-700 dark:bg-gray-800 rounded">
                {{ language }}
              </span>
            }
          </div>
        </div>
      }

      <!-- Code Content -->
      <div class="relative">
        <pre [class.line-numbers]="showLineNumbers" class="!m-0 !rounded-none"><code #codeElement [class]="'language-' + language" class="!text-sm">{{ code }}</code></pre>
        
        <!-- Copy Button -->
        <button
          (click)="copyToClipboard()"
          class="absolute top-2 right-2 p-2 rounded-md bg-gray-800 dark:bg-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          [attr.aria-label]="copyFeedback() ? 'Copied!' : 'Copy code'"
          title="Copy to clipboard"
        >
          @if (copyFeedback()) {
            <app-icon name="check" [size]="16" class="text-green-400"></app-icon>
          } @else {
            <app-icon name="copy" [size]="16"></app-icon>
          }
        </button>

        <!-- Copy Feedback -->
        @if (copyFeedback()) {
          <div class="absolute top-12 right-2 px-2 py-1 text-xs font-medium text-green-400 bg-gray-800 dark:bg-gray-700 rounded shadow-lg">
            Copied!
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Override Prism default styles */
    pre[class*="language-"] {
      background: transparent;
      margin: 0;
      padding: 1rem;
      overflow-x: auto;
    }

    pre[class*="language-"].line-numbers {
      padding-left: 3.5rem;
    }

    /* Line numbers styling */
    .line-numbers .line-numbers-rows {
      position: absolute;
      pointer-events: none;
      top: 1rem;
      left: 0;
      width: 3rem;
      letter-spacing: -1px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    .line-numbers-rows > span {
      display: block;
      counter-increment: linenumber;
    }

    .line-numbers-rows > span:before {
      content: counter(linenumber);
      color: #6b7280;
      display: block;
      padding-right: 0.8em;
      text-align: right;
    }

    /* Scrollbar styling */
    pre::-webkit-scrollbar {
      height: 8px;
    }

    pre::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }

    pre::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    pre::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class CodeBlockComponent implements OnInit, AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'typescript';
  @Input() showLineNumbers: boolean = false;
  @Input() fileName?: string;

  @ViewChild('codeElement') codeElement!: ElementRef<HTMLElement>;

  copyFeedback = signal(false);

  ngOnInit() {
    // Import Prism if not already loaded
    if (typeof Prism === 'undefined') {
      this.loadPrismJS();
    }
  }

  ngAfterViewInit() {
    // Highlight code after view init
    setTimeout(() => {
      this.highlightCode();
    }, 50);
  }

  private highlightCode() {
    if (typeof Prism !== 'undefined' && this.codeElement) {
      Prism.highlightElement(this.codeElement.nativeElement);
      
      // Add line numbers if enabled
      if (this.showLineNumbers && Prism.plugins && Prism.plugins.lineNumbers) {
        Prism.plugins.lineNumbers.resize(this.codeElement.nativeElement);
      }
    }
  }

  private loadPrismJS() {
    // Load Prism core
    const prismCore = document.createElement('script');
    prismCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    document.head.appendChild(prismCore);

    // Load Prism theme
    const prismTheme = document.createElement('link');
    prismTheme.rel = 'stylesheet';
    prismTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(prismTheme);

    // Load language components
    const languages = ['typescript', 'javascript', 'css', 'markup', 'json'];
    languages.forEach(lang => {
      const script = document.createElement('script');
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
      document.head.appendChild(script);
    });

    // Load line numbers plugin if needed
    if (this.showLineNumbers) {
      const lineNumbersScript = document.createElement('script');
      lineNumbersScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js';
      document.head.appendChild(lineNumbersScript);

      const lineNumbersCSS = document.createElement('link');
      lineNumbersCSS.rel = 'stylesheet';
      lineNumbersCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css';
      document.head.appendChild(lineNumbersCSS);
    }
  }

  copyToClipboard() {
    if (navigator.clipboard && this.code) {
      navigator.clipboard.writeText(this.code).then(() => {
        this.copyFeedback.set(true);
        setTimeout(() => {
          this.copyFeedback.set(false);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code:', err);
      });
    }
  }
}