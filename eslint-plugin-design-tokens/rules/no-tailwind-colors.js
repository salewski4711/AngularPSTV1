/**
 * ESLint Rule: no-tailwind-colors
 * Verhindert hardcodierte Tailwind-Farbklassen
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Verbietet hardcodierte Tailwind-Farben - nutze Design Tokens!',
      category: 'Design System',
      recommended: true
    },
    fixable: 'code',
    messages: {
      hardcodedTailwindColor: '❌ Hardcodierte Tailwind-Farbe "{{ class }}" gefunden! {{ action }}',
      unmappedTailwindColor: '❌ Tailwind-Farbe "{{ class }}" gefunden! AKTION: 1) Nutze vorhandene Tokens: primary (orange), secondary (blau), neutral (grau), 2) Beispiel: statt "bg-orange-500" nutze TokenUtils.getColorClass(\'bg\', \'primary.500\'), 3) KEINE neuen Tokens ohne Design-System-Team-Genehmigung!',
      hardcodedTailwindSpacing: '❌ Hardcodiertes Tailwind-Spacing "{{ class }}" gefunden! Nutze: TokenUtils.getSpacingClass(\'{{ property }}\', \'{{ size }}\')',
      hardcodedTailwindText: '❌ Hardcodierte Text-Größe "{{ class }}" gefunden! Nutze: TokenUtils.getTextSizeClass(\'{{ size }}\')'
    },
    schema: []
  },

  create(context) {
    // Mapping für Auto-Fix
    const colorMappings = {
      // Primary colors
      'bg-orange-500': { property: 'bg', token: 'primary.500' },
      'bg-orange-600': { property: 'bg', token: 'primary.600' },
      'bg-primary': { property: 'bg', token: 'primary.500' },
      'text-orange-500': { property: 'text', token: 'primary.500' },
      'border-orange-500': { property: 'border', token: 'primary.500' },
      
      // Secondary colors
      'bg-blue-700': { property: 'bg', token: 'secondary.500' },
      'text-blue-700': { property: 'text', token: 'secondary.500' },
      'border-blue-700': { property: 'border', token: 'secondary.500' },
      
      // Neutral colors
      'text-white': { property: 'text', token: 'neutral.white' },
      'text-black': { property: 'text', token: 'neutral.black' },
      'bg-white': { property: 'bg', token: 'neutral.white' },
      'bg-black': { property: 'bg', token: 'neutral.black' },
      'border-gray-300': { property: 'border', token: 'neutral.300' },
      'bg-gray-100': { property: 'bg', token: 'neutral.100' },
      'bg-gray-200': { property: 'bg', token: 'neutral.200' },
      'text-gray-700': { property: 'text', token: 'neutral.700' },
      'text-gray-500': { property: 'text', token: 'neutral.500' },
      
      // Common error/success colors
      'bg-red-500': { property: 'bg', token: 'error.500' },
      'text-red-500': { property: 'text', token: 'error.500' },
      'border-red-500': { property: 'border', token: 'error.500' },
      'bg-green-500': { property: 'bg', token: 'success.500' },
      'text-green-500': { property: 'text', token: 'success.500' }
    };

    const spacingMappings = {
      'p-4': { property: 'p', size: 'md' },
      'px-4': { property: 'px', size: 'md' },
      'py-2': { property: 'py', size: 'sm' },
      'm-2': { property: 'm', size: 'sm' },
      'mt-4': { property: 'mt', size: 'md' }
    };

    const textSizeMappings = {
      'text-xs': 'xs',
      'text-sm': 'sm',
      'text-base': 'base',
      'text-lg': 'lg',
      'text-xl': 'xl'
    };

    function checkForTailwindClasses(node, text) {
      // Farben-Pattern
      const colorPattern = /(?:bg|text|border|ring|divide|from|to|via)-(red|blue|green|yellow|orange|purple|pink|gray|indigo|violet|amber|emerald|teal|cyan|sky|rose|fuchsia|lime|neutral|stone|zinc|slate)(?:-(?:50|100|200|300|400|500|600|700|800|900|950))?/g;
      
      // Spacing-Pattern
      const spacingPattern = /(?:p|m|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr|gap|space)(?:-(?:0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96))/g;
      
      // Text-Size-Pattern
      const textSizePattern = /text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/g;

      // Prüfe Farben
      let match;
      while ((match = colorPattern.exec(text)) !== null) {
        const fullClass = match[0];
        const mapping = colorMappings[fullClass];
        
        const messageId = mapping ? 'hardcodedTailwindColor' : 'unmappedTailwindColor';
        const action = mapping 
          ? `Nutze: TokenUtils.getColorClass('${mapping.property}', '${mapping.token}')`
          : '';
          
        context.report({
          node,
          messageId,
          data: {
            class: fullClass,
            property: mapping?.property || fullClass.split('-')[0],
            token: mapping?.token || '[TOKEN-NAME]',
            action
          },
          fix: mapping ? (fixer) => {
            const replacement = `TokenUtils.getColorClass('${mapping.property}', '${mapping.token}')`;
            return fixer.replaceTextRange(
              [node.range[0] + match.index + 1, node.range[0] + match.index + fullClass.length + 1],
              replacement
            );
          } : undefined
        });
      }

      // Prüfe Spacing
      while ((match = spacingPattern.exec(text)) !== null) {
        const fullClass = match[0];
        const mapping = spacingMappings[fullClass];
        
        if (mapping) {
          context.report({
            node,
            messageId: 'hardcodedTailwindSpacing',
            data: {
              class: fullClass,
              property: mapping.property,
              size: mapping.size
            }
          });
        }
      }

      // Prüfe Text-Größen
      while ((match = textSizePattern.exec(text)) !== null) {
        const fullClass = match[0];
        const size = textSizeMappings[fullClass];
        
        if (size) {
          context.report({
            node,
            messageId: 'hardcodedTailwindText',
            data: {
              class: fullClass,
              size: size
            }
          });
        }
      }
    }

    return {
      // String Literals
      Literal(node) {
        if (typeof node.value === 'string') {
          checkForTailwindClasses(node, node.value);
        }
      },
      
      // Template Strings
      TemplateElement(node) {
        checkForTailwindClasses(node, node.value.raw);
      },
      
      // Angular Templates - class attribute
      JSXAttribute(node) {
        if (node.name.name === 'class' && node.value && node.value.type === 'Literal') {
          checkForTailwindClasses(node.value, node.value.value);
        }
      }
    };
  }
};