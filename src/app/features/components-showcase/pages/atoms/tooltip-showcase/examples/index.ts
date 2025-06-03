export const tooltipExamples = {
  basic: {
    title: 'Basic Usage',
    description: 'Simple tooltips with different trigger modes',
    files: {
      'basic.example.html': `<div class="flex items-center gap-4 flex-wrap">
  <button 
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    appTooltip="This is a basic tooltip"
  >
    Hover me
  </button>

  <button 
    class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    appTooltip="Click to see this tooltip"
    tooltipTrigger="click"
  >
    Click me
  </button>

  <input 
    type="text"
    class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Focus to see tooltip"
    appTooltip="This tooltip appears on focus"
    tooltipTrigger="focus"
  />
</div>`
    }
  },
  positions: {
    title: 'Positions',
    description: 'Tooltips can be positioned in different directions',
    files: {
      'positions.example.html': `<div class="flex items-center gap-8 flex-wrap">
  <button 
    class="px-4 py-2 bg-blue-600 text-white rounded"
    appTooltip="Top position"
    tooltipPosition="top"
  >
    Top
  </button>

  <button 
    class="px-4 py-2 bg-blue-600 text-white rounded"
    appTooltip="Right position"
    tooltipPosition="right"
  >
    Right
  </button>

  <button 
    class="px-4 py-2 bg-blue-600 text-white rounded"
    appTooltip="Bottom position"
    tooltipPosition="bottom"
  >
    Bottom
  </button>

  <button 
    class="px-4 py-2 bg-blue-600 text-white rounded"
    appTooltip="Left position"
    tooltipPosition="left"
  >
    Left
  </button>
</div>`
    }
  },
  advanced: {
    title: 'Advanced Features',
    description: 'Delayed tooltips, max width control, and disabled state',
    files: {
      'advanced.example.html': `<div class="space-y-4">
  <!-- Delay Example -->
  <div class="flex items-center gap-4">
    <button 
      class="px-4 py-2 bg-green-600 text-white rounded"
      appTooltip="This tooltip has a 1 second delay"
      [tooltipDelay]="1000"
    >
      Delayed Tooltip
    </button>
  </div>

  <!-- Max Width Example -->
  <div class="flex items-center gap-4">
    <button 
      class="px-4 py-2 bg-purple-600 text-white rounded"
      appTooltip="This is a very long tooltip text that demonstrates how the max width property works. It will wrap to multiple lines when it exceeds the specified maximum width."
      [tooltipMaxWidth]="200"
    >
      Long Tooltip with Max Width
    </button>
  </div>

  <!-- Disabled State -->
  <div class="flex items-center gap-4">
    <button 
      class="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
      appTooltip="This tooltip won't show because it's disabled"
      [tooltipDisabled]="true"
      disabled
    >
      Disabled Tooltip
    </button>
  </div>
</div>`
    }
  },
  interactive: {
    title: 'Interactive Examples',
    description: 'Real-world use cases with icons, forms, and overflow handling',
    files: {
      'interactive.example.html': `<div class="space-y-6">
  <!-- Icon with Tooltip -->
  <div class="flex items-center gap-2">
    <span class="text-gray-700">Need help?</span>
    <app-icon 
      name="info" 
      [size]="20"
      class="text-blue-600 cursor-help"
      appTooltip="Click here to learn more about this feature"
    ></app-icon>
  </div>

  <!-- Form Field with Validation Tooltip -->
  <div class="max-w-md">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input 
      type="email"
      class="w-full px-3 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
      placeholder="Enter your email"
      appTooltip="Please enter a valid email address"
      tooltipTrigger="focus"
      tooltipPosition="right"
    />
  </div>

  <!-- Button Group with Tooltips -->
  <div class="inline-flex rounded-md shadow-sm" role="group">
    <button 
      type="button" 
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100"
      appTooltip="Edit this item"
    >
      <app-icon name="edit" [size]="16"></app-icon>
    </button>
    <button 
      type="button" 
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100"
      appTooltip="Duplicate this item"
    >
      <app-icon name="copy" [size]="16"></app-icon>
    </button>
    <button 
      type="button" 
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100"
      appTooltip="Delete this item"
    >
      <app-icon name="delete" [size]="16"></app-icon>
    </button>
  </div>
</div>`
    }
  }
};