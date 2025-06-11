/**
 * ESLint Rule: no-hardcoded-spacing
 * Verhindert hardcodierte Pixel-Werte und erzwingt Token-basierte Spacing
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Verbietet hardcodierte Spacing-Werte - nutze Design Tokens!',
      category: 'Design System',
      recommended: true
    },
    fixable: 'code',
    messages: {
      hardcodedPixels: '❌ Hardcodierter Pixel-Wert "{{ value }}" gefunden! Nutze: TokenUtils.getSpacing(\'{{ suggestion }}\')',
      unmappedPixels: '❌ Pixel-Wert "{{ value }}" gefunden! Aktion: 1) Nutze Standard-Spacing (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24), 2) Bei 16px nutze "4", bei 8px nutze "2", 3) Vermeide ungerade Werte - runde auf nächstes Token',
      hardcodedRem: '❌ Hardcodierter rem-Wert "{{ value }}" gefunden! Aktion: Konvertiere zu Tailwind-Spacing (1rem = 4, 2rem = 8, etc.) und nutze TokenUtils.getSpacing()',
      hardcodedMarginPadding: '❌ Hardcodiertes margin/padding "{{ property }}: {{ value }}" gefunden! Aktion: Nutze Tailwind-Utility-Klassen (p-4, m-2) oder TokenUtils.getSpacing() für Style-Bindings'
    },
    schema: []
  },

  create(context) {
    // Pixel zu Token Mapping
    const pixelToTokenMap = {
      '0px': '0',
      '1px': 'px',
      '2px': '0.5',
      '4px': '1',
      '6px': '1.5',
      '8px': '2',
      '10px': '2.5',
      '12px': '3',
      '14px': '3.5',
      '16px': '4',
      '20px': '5',
      '24px': '6',
      '28px': '7',
      '32px': '8',
      '36px': '9',
      '40px': '10',
      '48px': '12',
      '56px': '14',
      '64px': '16',
      '80px': '20',
      '96px': '24'
    };

    return {
      // String Literals
      Literal(node) {
        if (typeof node.value !== 'string') return;
        
        const value = node.value;
        
        // Pixel-Werte
        const pxMatch = value.match(/(\d+(?:\.\d+)?px)/g);
        if (pxMatch) {
          pxMatch.forEach(px => {
            const mapping = pixelToTokenMap[px];
            const messageId = mapping ? 'hardcodedPixels' : 'unmappedPixels';
            
            context.report({
              node,
              messageId,
              data: { 
                value: px,
                suggestion: mapping || '[SIEHE-NACHRICHT]'
              },
              fix: pixelToTokenMap[px] ? (fixer) => {
                // If the entire string is just the pixel value, replace with the function call
                if (value === px) {
                  return fixer.replaceText(node, `TokenUtils.getSpacing('${pixelToTokenMap[px]}')`);
                }
                // Otherwise, we can't auto-fix mixed content
                return null;
              } : undefined
            });
          });
        }
        
        // rem-Werte
        const remMatch = value.match(/(\d+(?:\.\d+)?rem)/g);
        if (remMatch) {
          remMatch.forEach(rem => {
            context.report({
              node,
              messageId: 'hardcodedRem',
              data: { value: rem }
            });
          });
        }
        
        // CSS Properties mit Spacing
        const cssSpacingMatch = value.match(/(margin|padding)(?:-(?:top|right|bottom|left))?\s*:\s*(\d+(?:\.\d+)?(?:px|rem|em))/);
        if (cssSpacingMatch) {
          context.report({
            node,
            messageId: 'hardcodedMarginPadding',
            data: { 
              property: cssSpacingMatch[1],
              value: cssSpacingMatch[2]
            }
          });
        }
      },
      
      // Template Elements
      TemplateElement(node) {
        const value = node.value.raw;
        
        // Prüfe auf px-Werte in Templates
        const pxMatches = value.match(/\d+px/g);
        if (pxMatches) {
          context.report({
            node,
            message: `❌ Hardcodierte Pixel in Template: ${pxMatches.join(', ')}`
          });
        }
      },
      
      // Object Properties (für Style-Objekte)
      Property(node) {
        if (node.key.type === 'Identifier' || node.key.type === 'Literal') {
          const propName = node.key.name || node.key.value;
          const spacingProps = ['margin', 'padding', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 
                               'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'gap', 'width', 'height',
                               'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'top', 'right', 'bottom', 'left'];
          
          if (spacingProps.includes(propName) && node.value.type === 'Literal') {
            const value = node.value.value;
            
            if (typeof value === 'string' && /\d+px/.test(value)) {
              context.report({
                node: node.value,
                message: `❌ Hardcodierter Spacing-Wert für '${propName}': ${value}. Nutze Design Tokens!`
              });
            }
            
            if (typeof value === 'number' && value !== 0) {
              context.report({
                node: node.value,
                message: `❌ Numerischer Spacing-Wert für '${propName}': ${value}. Nutze Design Tokens!`
              });
            }
          }
        }
      }
    };
  }
};