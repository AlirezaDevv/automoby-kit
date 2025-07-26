import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Components that require 'use client' directive
const clientComponents = [
  'Input',
  'Drawer', 
  'Pagination',
  'Accordion',
  'RadioGroup',
  'Menu',
  'contexts'
];

// Define individual component entry points
const componentEntries = {
  // Main entry point with all components
  index: 'src/index.ts',
  
  // Individual components
  Typography: 'src/components/Typography/Typography.tsx',
  Button: 'src/components/Button/Button.tsx',
  Input: 'src/components/Input/Input.tsx',
  Tabs: 'src/components/Tabs/Tabs.tsx',
  Drawer: 'src/components/Drawer/Drawer.tsx',
  Backdrop: 'src/components/Backdrop/Backdrop.tsx',
  Breadcrumb: 'src/components/Breadcrumb/Breadcrumb.tsx',
  Pagination: 'src/components/Pagination/Pagination.tsx',
  Accordion: 'src/components/Accordion/Accordion.tsx',
  Divider: 'src/components/Divider/Divider.tsx',
  RadioGroup: 'src/components/RadioGroup/RadioGroup.tsx',
  Chips: 'src/components/Chips/Chips.tsx',
  Menu: 'src/components/Menu/Menu.tsx',
  
  // Contexts
  contexts: 'src/contexts/MobileContext.tsx',
  
  // Utilities
  utils: 'src/utils/cn.ts',
};

// Function to get banner for client components
const getBanner = (entryName) => {
  return clientComponents.includes(entryName) ? "'use client';\n" : '';
};

export default [
  // ESM build
  {
    input: componentEntries,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: false,
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      banner: (chunk) => getBanner(chunk.name),
    },
    external: [/^react($|\/)/, 'react-dom'],
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
      terser({
        compress: {
          directives: false,
        },
        format: {
          comments: false, 
          preserve_annotations: true,
        },
        mangle: {
          keep_fnames: true,
        },
      }),
    ],
  },
  // CJS build
  {
    input: componentEntries,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: false,
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      banner: (chunk) => getBanner(chunk.name),
    },
    external: [/^react($|\/)/, 'react-dom'],
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
      terser({
        compress: {
          directives: false,
        },
        format: {
          comments: false,
          preserve_annotations: true,
        },
        mangle: {
          keep_fnames: true,
        },
      }),
    ],
  },
  // TypeScript declarations build
  {
    input: componentEntries,
    output: {
      dir: 'dist/types',
      format: 'esm',
    },
    external: [/^react($|\/)/, 'react-dom'],
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist/types',
        emitDeclarationOnly: true,
      }),
    ],
  },
];