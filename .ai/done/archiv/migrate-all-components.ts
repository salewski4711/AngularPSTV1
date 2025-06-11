#!/usr/bin/env node
import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Mapping-Regeln für die Migration
const colorMappings = {
  // Grays
  'gray-50': 'neutral.50',
  'gray-100': 'neutral.100',
  'gray-200': 'neutral.200',
  'gray-300': 'neutral.300',
  'gray-400': 'neutral.400',
  'gray-500': 'neutral.500',
  'gray-600': 'neutral.600',
  'gray-700': 'neutral.700',
  'gray-800': 'neutral.800',
  'gray-900': 'neutral.900',
  
  // Primary (Orange)
  'orange-50': 'primary.50',
  'orange-100': 'primary.100',
  'orange-200': 'primary.200',
  'orange-300': 'primary.300',
  'orange-400': 'primary.400',
  'orange-500': 'primary.500',
  'orange-600': 'primary.600',
  'orange-700': 'primary.700',
  'orange-800': 'primary.800',
  'orange-900': 'primary.900',
  
  // Secondary (Blue)
  'blue-50': 'secondary.50',
  'blue-100': 'secondary.100',
  'blue-200': 'secondary.200',
  'blue-300': 'secondary.300',
  'blue-400': 'secondary.400',
  'blue-500': 'secondary.500',
  'blue-600': 'secondary.600',
  'blue-700': 'secondary.700',
  'blue-800': 'secondary.800',
  'blue-900': 'secondary.900',
  
  // Success (Green)
  'green-50': 'success.50',
  'green-100': 'success.100',
  'green-200': 'success.200',
  'green-300': 'success.300',
  'green-400': 'success.400',
  'green-500': 'success.500',
  'green-600': 'success.600',
  'green-700': 'success.700',
  'green-800': 'success.800',
  'green-900': 'success.900',
  
  // Error (Red)
  'red-50': 'error.50',
  'red-100': 'error.100',
  'red-200': 'error.200',
  'red-300': 'error.300',
  'red-400': 'error.400',
  'red-500': 'error.500',
  'red-600': 'error.600',
  'red-700': 'error.700',
  'red-800': 'error.800',
  'red-900': 'error.900',
  
  // Warning (Yellow/Amber)
  'yellow-50': 'warning.50',
  'yellow-100': 'warning.100',
  'yellow-200': 'warning.200',
  'yellow-300': 'warning.300',
  'yellow-400': 'warning.400',
  'yellow-500': 'warning.500',
  'yellow-600': 'warning.600',
  'yellow-700': 'warning.700',
  'yellow-800': 'warning.800',
  'yellow-900': 'warning.900',
  'amber-50': 'warning.50',
  'amber-100': 'warning.100',
  'amber-200': 'warning.200',
  'amber-300': 'warning.300',
  'amber-400': 'warning.400',
  'amber-500': 'warning.500',
  'amber-600': 'warning.600',
  'amber-700': 'warning.700',
  'amber-800': 'warning.800',
  'amber-900': 'warning.900',
  
  // Special
  'white': 'neutral.white',
  'black': 'neutral.black',
  'transparent': 'transparent'
};

const spacingMappings = {
  'p-0': "TokenUtils.getSpacingClass('p', '0')",
  'p-1': "TokenUtils.getSpacingClass('p', '1')",
  'p-2': "TokenUtils.getSpacingClass('p', '2')",
  'p-3': "TokenUtils.getSpacingClass('p', '3')",
  'p-4': "TokenUtils.getSpacingClass('p', '4')",
  'p-5': "TokenUtils.getSpacingClass('p', '5')",
  'p-6': "TokenUtils.getSpacingClass('p', '6')",
  'p-8': "TokenUtils.getSpacingClass('p', '8')",
  
  'px-1': "TokenUtils.getSpacingClass('px', '1')",
  'px-2': "TokenUtils.getSpacingClass('px', '2')",
  'px-3': "TokenUtils.getSpacingClass('px', '3')",
  'px-4': "TokenUtils.getSpacingClass('px', '4')",
  'px-5': "TokenUtils.getSpacingClass('px', '5')",
  'px-6': "TokenUtils.getSpacingClass('px', '6')",
  
  'py-1': "TokenUtils.getSpacingClass('py', '1')",
  'py-2': "TokenUtils.getSpacingClass('py', '2')",
  'py-3': "TokenUtils.getSpacingClass('py', '3')",
  'py-4': "TokenUtils.getSpacingClass('py', '4')",
  
  'm-1': "TokenUtils.getSpacingClass('m', '1')",
  'm-2': "TokenUtils.getSpacingClass('m', '2')",
  'm-3': "TokenUtils.getSpacingClass('m', '3')",
  'm-4': "TokenUtils.getSpacingClass('m', '4')",
  
  'mt-1': "TokenUtils.getSpacingClass('mt', '1')",
  'mt-2': "TokenUtils.getSpacingClass('mt', '2')",
  'mt-3': "TokenUtils.getSpacingClass('mt', '3')",
  'mt-4': "TokenUtils.getSpacingClass('mt', '4')",
  
  'mb-1': "TokenUtils.getSpacingClass('mb', '1')",
  'mb-2': "TokenUtils.getSpacingClass('mb', '2')",
  'mb-3': "TokenUtils.getSpacingClass('mb', '3')",
  'mb-4': "TokenUtils.getSpacingClass('mb', '4')",
  
  'ml-1': "TokenUtils.getSpacingClass('ml', '1')",
  'ml-2': "TokenUtils.getSpacingClass('ml', '2')",
  'ml-3': "TokenUtils.getSpacingClass('ml', '3')",
  'ml-4': "TokenUtils.getSpacingClass('ml', '4')",
  
  'mr-1': "TokenUtils.getSpacingClass('mr', '1')",
  'mr-2': "TokenUtils.getSpacingClass('mr', '2')",
  'mr-3': "TokenUtils.getSpacingClass('mr', '3')",
  'mr-4': "TokenUtils.getSpacingClass('mr', '4')",
  
  'gap-1': "TokenUtils.getSpacingClass('gap', '1')",
  'gap-2': "TokenUtils.getSpacingClass('gap', '2')",
  'gap-3': "TokenUtils.getSpacingClass('gap', '3')",
  'gap-4': "TokenUtils.getSpacingClass('gap', '4')",
};

const textSizeMappings = {
  'text-xs': "TokenUtils.getTextSizeClass('xs')",
  'text-sm': "TokenUtils.getTextSizeClass('sm')",
  'text-base': "TokenUtils.getTextSizeClass('base')",
  'text-lg': "TokenUtils.getTextSizeClass('lg')",
  'text-xl': "TokenUtils.getTextSizeClass('xl')",
  'text-2xl': "TokenUtils.getTextSizeClass('2xl')",
  'text-3xl': "TokenUtils.getTextSizeClass('3xl')",
};

async function migrateFile(filePath: string): Promise<boolean> {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let hasChanges = false;
    const originalContent = content;
    
    // Skip if already has TokenUtils import
    const hasTokenUtils = content.includes('TokenUtils');
    
    // Replace color classes
    Object.entries(colorMappings).forEach(([oldColor, newToken]) => {
      // bg-color
      const bgRegex = new RegExp(`bg-${oldColor}(?![\\w-])`, 'g');
      if (bgRegex.test(content)) {
        content = content.replace(bgRegex, `\${TokenUtils.getColorClass('bg', '${newToken}')}`);
        hasChanges = true;
      }
      
      // text-color
      const textRegex = new RegExp(`text-${oldColor}(?![\\w-])`, 'g');
      if (textRegex.test(content)) {
        content = content.replace(textRegex, `\${TokenUtils.getColorClass('text', '${newToken}')}`);
        hasChanges = true;
      }
      
      // border-color
      const borderRegex = new RegExp(`border-${oldColor}(?![\\w-])`, 'g');
      if (borderRegex.test(content)) {
        content = content.replace(borderRegex, `\${TokenUtils.getColorClass('border', '${newToken}')}`);
        hasChanges = true;
      }
    });
    
    // Replace spacing classes in strings
    Object.entries(spacingMappings).forEach(([oldClass, newCall]) => {
      const regex = new RegExp(`'([^']*\\s)?${oldClass}(\\s[^']*)?'`, 'g');
      content = content.replace(regex, (match, before = '', after = '') => {
        hasChanges = true;
        return `'${before.trim()} \${${newCall}} ${after.trim()}'.trim()`;
      });
    });
    
    // Replace text sizes
    Object.entries(textSizeMappings).forEach(([oldClass, newCall]) => {
      const regex = new RegExp(`'([^']*\\s)?${oldClass}(\\s[^']*)?'`, 'g');
      content = content.replace(regex, (match, before = '', after = '') => {
        hasChanges = true;
        return `'${before.trim()} \${${newCall}} ${after.trim()}'.trim()`;
      });
    });
    
    // Replace pixel values
    const pxRegex = /(\\d+)px/g;
    content = content.replace(pxRegex, (match, value) => {
      const tokenMap: Record<string, string> = {
        '4': '1', '8': '2', '12': '3', '16': '4', '20': '5',
        '24': '6', '32': '8', '40': '10', '48': '12', '64': '16'
      };
      
      if (tokenMap[value]) {
        hasChanges = true;
        return `\${TokenUtils.getSpacing('${tokenMap[value]}')}`;
      }
      return match;
    });
    
    // Add TokenUtils import if needed and changes were made
    if (hasChanges && !hasTokenUtils) {
      // Find the last import statement
      const importRegex = /^import .* from .*;$/gm;
      const imports = content.match(importRegex);
      if (imports) {
        const lastImport = imports[imports.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        content = content.slice(0, lastImportIndex + lastImport.length) + 
          "\\nimport { TokenUtils } from '../../../core/design-system/token-utilities';" +
          content.slice(lastImportIndex + lastImport.length);
      }
    }
    
    // Clean up template literals
    content = content.replace(/`([^`]*)`/g, (match, inner) => {
      // Remove empty template literal parts
      const cleaned = inner
        .replace(/\\s+/g, ' ')
        .trim();
      return '`' + cleaned + '`';
    });
    
    // Write back if changes were made
    if (hasChanges) {
      await fs.writeFile(filePath, content);
      console.log(`✅ Migrated: ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error migrating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting component migration to TokenUtils...\n');
  
  // Find all component files
  const componentFiles = await glob('src/app/shared/components/**/*.component.ts');
  
  let migratedCount = 0;
  
  for (const file of componentFiles) {
    const migrated = await migrateFile(file);
    if (migrated) migratedCount++;
  }
  
  console.log(`\n✨ Migration complete! ${migratedCount} files migrated.`);
  
  // Also migrate the tailwind.utils.ts file
  console.log('\n🔧 Migrating tailwind.utils.ts...');
  await migrateFile('src/app/shared/utils/tailwind.utils.ts');
  
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run lint:fix');
  console.log('2. Review changes with: git diff');
  console.log('3. Test components visually');
  console.log('4. Commit with: git commit -m "refactor: migrate all components to TokenUtils"');
}

main().catch(console.error);