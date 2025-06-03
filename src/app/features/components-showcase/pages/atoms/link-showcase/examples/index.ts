export interface Example {
  title: string;
  filename: string;
  content?: string;
}

export const LINK_EXAMPLES: Example[] = [
  {
    title: 'Basic Usage',
    filename: 'basic.example.html'
  },
  {
    title: 'Sizes',
    filename: 'sizes.example.html'
  },
  {
    title: 'External Links',
    filename: 'external.example.html'
  },
  {
    title: 'Router Links',
    filename: 'router.example.html'
  },
  {
    title: 'States',
    filename: 'states.example.html'
  },
  {
    title: 'With Icons',
    filename: 'with-icons.example.html'
  }
];