/**
 * ESLint Rule: no-hardcoded-colors
 * Verhindert hardcodierte Farben (Hex, RGB, HSL)
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Verbietet hardcodierte Farben - nutze Design Tokens!',
      category: 'Design System',
      recommended: true
    },
    fixable: 'code',
    messages: {
      hardcodedHex: '❌ Hardcodierte Hex-Farbe "{{ color }}" gefunden! Nutze: TokenUtils.getColor(\'{{ suggestion }}\')',
      hardcodedRgb: '❌ Hardcodierte RGB-Farbe "{{ color }}" gefunden! Aktion: 1) Finde passendes Token (primary/secondary/neutral/success/error/warning), 2) Nutze TokenUtils.getColor(\'[token].500\'), 3) Bei Unsicherheit: Frage im Team nach dem richtigen Token',
      hardcodedHsl: '❌ Hardcodierte HSL-Farbe "{{ color }}" gefunden! Aktion: Konvertiere zu Hex und folge den Hex-Anweisungen',
      unknownHex: '❌ Unbekannte Hex-Farbe "{{ color }}" gefunden! AKTION: 1) Nutze ein bestehendes Token (primary/secondary/neutral), 2) NIEMALS selbst neue Tokens hinzufügen!, 3) Falls wirklich kein Token passt: Erstelle Token-Request-Issue und nutze temporär das ähnlichste Token mit TODO-Kommentar'
    },
    schema: []
  },

  create(context) {
    // Token-Mapping für Auto-Fix
    const colorTokenMap = {
      '#F99600': 'primary.500',
      '#f99600': 'primary.500',
      '#1C3661': 'secondary.500',
      '#1c3661': 'secondary.500',
      '#FFFFFF': 'neutral.white',
      '#ffffff': 'neutral.white',
      '#FFF': 'neutral.white',
      '#fff': 'neutral.white',
      '#000000': 'neutral.black',
      '#000': 'neutral.black',
      '#10B981': 'success.500',
      '#EF4444': 'error.500',
      '#F59E0B': 'warning.500'
    };

    return {
      // Prüfe String Literals
      Literal(node) {
        if (typeof node.value !== 'string') return;
        
        const value = node.value;
        
        // Hex-Farben
        const hexMatch = value.match(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/);
        if (hexMatch) {
          const hexColor = hexMatch[0];
          const mapping = colorTokenMap[hexColor];
          const messageId = mapping ? 'hardcodedHex' : 'unknownHex';
          
          context.report({
            node,
            messageId,
            data: { 
              color: hexColor,
              suggestion: mapping || '[TOKEN-NAME]'
            },
            fix(fixer) {
              if (colorTokenMap[hexMatch[0]]) {
                const fixes = [];
                
                // Replace the color value
                fixes.push(fixer.replaceText(
                  node, 
                  `TokenUtils.getColor('${colorTokenMap[hexMatch[0]]}')`
                ));
                
                // Check if TokenUtils is imported
                const sourceCode = context.getSourceCode();
                const hasTokenUtilsImport = sourceCode.ast.body.some(node => 
                  node.type === 'ImportDeclaration' && 
                  node.source.value.includes('token-utilities')
                );
                
                if (!hasTokenUtilsImport) {
                  // Add import at the beginning of the file
                  const firstImport = sourceCode.ast.body.find(node => node.type === 'ImportDeclaration');
                  if (firstImport) {
                    fixes.push(fixer.insertTextBefore(
                      firstImport,
                      `import { TokenUtils } from '@core/design-system/token-utilities';\n`
                    ));
                  }
                }
                
                return fixes;
              }
            }
          });
        }
        
        // RGB/RGBA
        if (/rgba?\s*\([^)]+\)/.test(value)) {
          context.report({
            node,
            messageId: 'hardcodedRgb',
            data: { color: value }
          });
        }
        
        // HSL/HSLA
        if (/hsla?\s*\([^)]+\)/.test(value)) {
          context.report({
            node,
            messageId: 'hardcodedHsl',
            data: { color: value }
          });
        }
      },
      
      // Prüfe Template Strings
      TemplateElement(node) {
        const value = node.value.raw;
        
        // Hex in Template Strings
        const hexMatches = value.match(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g);
        if (hexMatches) {
          hexMatches.forEach(match => {
            context.report({
              node,
              messageId: 'hardcodedHex',
              data: { 
                color: match,
                suggestion: colorTokenMap[match] || 'TODO'
              }
            });
          });
        }
      },
      
      // Prüfe JSX/TSX Attribute
      JSXAttribute(node) {
        if (node.name.name === 'style' && node.value) {
          context.report({
            node: node.value,
            message: '❌ Inline Styles verboten! Nutze Token-basierte Klassen!'
          });
        }
      }
    };
  }
};