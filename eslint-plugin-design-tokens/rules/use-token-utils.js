/**
 * ESLint Rule: use-token-utils
 * Erzwingt die Verwendung von TokenUtils für alle visuellen Properties
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Erzwingt die Verwendung von TokenUtils für Design Token Zugriff',
      category: 'Design System',
      recommended: true
    },
    messages: {
      missingTokenUtils: 'TokenUtils wird nicht in dieser Komponente verwendet, aber es gibt visuelle Properties!',
      directTokenAccess: 'Direkter Zugriff auf DESIGN_TOKENS vermeiden! Nutze TokenUtils.{{ method }}() stattdessen',
      hardcodedClasses: 'Hardcodierte Klassen-Strings gefunden! Nutze TokenUtils für dynamische Klassen'
    },
    schema: []
  },

  create(context) {
    let hasTokenUtilsImport = false;
    let usesTokenUtils = false;
    let hasVisualProperties = false;
    let componentName = null;

    // Visual Properties die Token benötigen
    const visualProperties = [
      'class', 'className', 'ngClass',
      'style', 'ngStyle',
      'color', 'backgroundColor', 'borderColor',
      'padding', 'margin',
      'width', 'height',
      'fontSize', 'fontWeight'
    ];

    return {
      // Prüfe Imports
      ImportDeclaration(node) {
        if (node.source.value.includes('token-utilities') || 
            node.source.value.includes('TokenUtils')) {
          hasTokenUtilsImport = true;
        }
        
        // Direkter DESIGN_TOKENS Import sollte vermieden werden
        if (node.source.value.includes('design-tokens') && 
            !node.source.value.includes('token-utilities')) {
          context.report({
            node,
            messageId: 'directTokenAccess',
            data: { method: 'getToken' }
          });
        }
      },

      // Prüfe Komponenten-Definition
      ClassDeclaration(node) {
        if (node.superClass && node.id) {
          componentName = node.id.name;
          
          // Ist es eine Angular Component?
          const decorators = node.decorators || [];
          const isComponent = decorators.some(d => 
            d.expression && 
            d.expression.callee && 
            d.expression.callee.name === 'Component'
          );
          
          if (isComponent) {
            // Component gefunden, prüfe später auf TokenUtils
          }
        }
      },

      // Prüfe Method Calls
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression') {
          const obj = node.callee.object;
          const prop = node.callee.property;
          
          // TokenUtils wird verwendet
          if (obj.name === 'tokenUtils' || 
              (obj.type === 'MemberExpression' && obj.property.name === 'tokenUtils')) {
            usesTokenUtils = true;
          }
          
          // Direkter DESIGN_TOKENS Zugriff
          if (obj.name === 'DESIGN_TOKENS') {
            context.report({
              node,
              messageId: 'directTokenAccess',
              data: { method: 'getToken' }
            });
          }
        }
      },

      // Prüfe Properties
      Property(node) {
        const propName = node.key.name || node.key.value;
        
        if (visualProperties.includes(propName)) {
          hasVisualProperties = true;
          
          // Prüfe ob der Wert hardcodiert ist
          if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
            const value = node.value.value;
            
            // Enthält Tailwind-Klassen?
            if (/(?:bg|text|border|p|m|w|h)-/.test(value)) {
              context.report({
                node: node.value,
                messageId: 'hardcodedClasses'
              });
            }
          }
        }
      },

      // Prüfe Computed Properties
      MethodDefinition(node) {
        // Angular Computed Signal Pattern
        if (node.key.name && node.key.name.endsWith('Classes')) {
          hasVisualProperties = true;
          
          // Sollte computed() und tokenUtils verwenden
          const functionBody = node.value.body;
          if (functionBody) {
            const bodyText = context.getSourceCode().getText(functionBody);
            
            if (!bodyText.includes('tokenUtils')) {
              context.report({
                node,
                message: 'Klassen-Method sollte TokenUtils verwenden!'
              });
            }
          }
        }
      },

      // Am Ende prüfen
      'Program:exit'() {
        // Wenn es eine Component mit visuellen Properties ist, aber kein TokenUtils
        if (componentName && hasVisualProperties && !hasTokenUtilsImport) {
          context.report({
            node: context.getSourceCode().ast,
            messageId: 'missingTokenUtils',
            loc: { line: 1, column: 0 }
          });
        }
      }
    };
  }
};