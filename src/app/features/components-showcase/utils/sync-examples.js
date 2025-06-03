const fs = require('fs');
const path = require('path');

/**
 * Sync example HTML files to TypeScript exports
 * This script reads all .example.html files and generates a corresponding index.ts
 */
function syncExamples(showcaseDir) {
  const examplesDir = path.join(showcaseDir, 'examples');
  
  if (!fs.existsSync(examplesDir)) {
    console.log(`No examples directory found in ${showcaseDir}`);
    return;
  }

  const exampleFiles = fs.readdirSync(examplesDir)
    .filter(file => file.endsWith('.example.html'));

  if (exampleFiles.length === 0) {
    console.log(`No example files found in ${examplesDir}`);
    return;
  }

  let indexContent = '// Auto-generated file from example HTML files\n';
  indexContent += '// Run "node sync-examples.js" to regenerate\n\n';

  exampleFiles.forEach(file => {
    const filePath = path.join(examplesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const exportName = file.replace('.example.html', '')
      .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()) + 'Example';
    
    indexContent += `export const ${exportName} = \`${content.replace(/`/g, '\\`')}\`;\n\n`;
  });

  const indexPath = path.join(examplesDir, 'index.ts');
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Generated ${indexPath}`);
}

// Run for all showcase components
const showcaseRoot = path.join(__dirname, '..', 'pages');
const categories = ['atoms', 'molecules', 'organisms'];

categories.forEach(category => {
  const categoryPath = path.join(showcaseRoot, category);
  if (fs.existsSync(categoryPath)) {
    const components = fs.readdirSync(categoryPath)
      .filter(dir => fs.statSync(path.join(categoryPath, dir)).isDirectory());
    
    components.forEach(component => {
      const componentPath = path.join(categoryPath, component);
      syncExamples(componentPath);
    });
  }
});

console.log('Example sync complete!');