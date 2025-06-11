#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * This script fixes template string interpolations in Angular component templates
 * by converting them to computed properties or static class arrays
 */

// Find all TypeScript files in components directory
const componentFiles = glob.sync('src/app/shared/components/**/*.component.ts');

let totalFixed = 0;

componentFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Pattern to find template string interpolations with TokenUtils
  const templateStringPattern = /\$\{TokenUtils\.[^}]+\}/g;
  const fullTemplatePattern = /`([^`]*\$\{TokenUtils\.[^`]+)`/g;
  
  // Check if file has issues
  if (!content.includes('${TokenUtils')) {
    return;
  }
  
  console.log(`\nProcessing: ${filePath}`);
  
  // Extract component class name
  const classMatch = content.match(/export class (\w+Component)/);
  if (!classMatch) return;
  
  const className = classMatch[1];
  
  // Find all unique template strings with TokenUtils
  const templateStrings = new Set();
  let match;
  
  while ((match = fullTemplatePattern.exec(content)) !== null) {
    templateStrings.add(match[0]);
  }
  
  // Generate computed properties for each unique template string
  const computedProperties = [];
  const replacements = new Map();
  
  Array.from(templateStrings).forEach((templateString, index) => {
    // Extract the content of the template string
    const innerContent = templateString.slice(1, -1); // Remove backticks
    
    // Generate property name
    const propName = `computedClass${index + 1}`;
    
    // Convert template string to array join pattern
    const parts = innerContent.split(/\$\{([^}]+)\}/);
    const arrayParts = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Static text
        if (parts[i]) {
          arrayParts.push(`'${parts[i].trim()}'`);
        }
      } else {
        // Dynamic expression
        arrayParts.push(parts[i]);
      }
    }
    
    const computedProp = `  ${propName} = [${arrayParts.join(', ')}].join(' ');`;
    computedProperties.push(computedProp);
    
    // Store replacement
    replacements.set(templateString, propName);
  });
  
  // Replace template strings in the content
  replacements.forEach((propName, templateString) => {
    // Replace in class attributes
    content = content.replace(
      new RegExp(`\\[class\\]="${templateString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
      `[class]="${propName}"`
    );
    
    // Replace in regular attributes
    content = content.replace(
      new RegExp(`class="${templateString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
      `[class]="${propName}"`
    );
  });
  
  // Find the end of the class to insert computed properties
  const classEndMatch = content.match(/}\s*$/);
  if (classEndMatch && computedProperties.length > 0) {
    const insertPosition = content.lastIndexOf('}');
    content = content.slice(0, insertPosition) + 
              '\n  // Generated computed properties\n' +
              computedProperties.join('\n') + '\n' +
              content.slice(insertPosition);
  }
  
  // Write back if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${computedProperties.length} template strings`);
    totalFixed++;
  }
});

console.log(`\n✨ Total files fixed: ${totalFixed}`);