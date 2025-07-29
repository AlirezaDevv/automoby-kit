import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-onboarding', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
    };
    
    // Define environment variables for the browser
    config.define = {
      ...config.define,
      'process.env.STORYBOOK_FORCE_MOBILE': JSON.stringify(process.env.STORYBOOK_FORCE_MOBILE),
    };
    
    return config;
  },
};
export default config;
