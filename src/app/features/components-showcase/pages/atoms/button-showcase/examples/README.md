# Button Showcase Examples

This directory contains example HTML files that are automatically imported into the button showcase component.

## How it works

1. Create or edit `.example.html` files in this directory
2. Run `npm run sync:examples` to generate the TypeScript exports
3. The examples are automatically imported in the showcase component

## Example structure

Each example file should contain valid Angular template code:

```html
<!-- Description of the example -->
<app-button variant="primary">Button Text</app-button>
```

## Available examples

- `basic.example.html` - Basic button usage
- `variants.example.html` - Different button variants
- `sizes.example.html` - Button size options
- `states.example.html` - Button states (disabled, loading)
- `with-icons.example.html` - Buttons with icons

## Adding new examples

1. Create a new file: `example-name.example.html`
2. Add your example HTML
3. Run `npm run sync:examples`
4. The example will be available as `exampleNameExample` in the generated `index.ts`