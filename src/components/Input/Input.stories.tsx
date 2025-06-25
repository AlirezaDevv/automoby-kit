import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};

export default meta;

export const Default: StoryObj<typeof Input> = {
  args: {
    label: 'Label',
  },
};
