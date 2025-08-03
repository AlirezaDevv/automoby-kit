import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Backdrop } from './Backdrop';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the backdrop is visible',
    },
    blur: {
      control: 'boolean',
      description: 'Whether to show a blur effect',
    },

    zIndex: {
      control: 'number',
      description: 'Custom z-index value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic backdrop story
export const Basic: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => (
    <div className="relative h-screen bg-gray-100 p-8">
      <Typography variant="h1" className="mb-4">
        Backdrop Demo
      </Typography>
      <Typography variant="body-m-medium" className="mb-8">
        This is the main content. The backdrop is displayed on top.
      </Typography>
      <Backdrop {...args} />
    </div>
  ),
};

// Interactive backdrop with button
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative h-screen bg-gray-100 p-8">
        <Typography variant="h1" className="mb-4">
          Interactive Backdrop
        </Typography>
        <Typography variant="body-m-medium" className="mb-8">
          Click the button to show/hide the backdrop. Click on the backdrop to
          close it.
        </Typography>

        <Button onClick={() => setIsOpen(true)}>Open Backdrop</Button>

        <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Backdrop with blur effect
export const WithBlur: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative h-screen bg-gray-100 p-8">
        <Typography variant="h1" className="mb-4">
          Backdrop with Blur
        </Typography>
        <Typography variant="body-m-medium" className="mb-8">
          This backdrop includes a blur effect on the background content.
        </Typography>

        <Button onClick={() => setIsOpen(true)}>Open Blurred Backdrop</Button>

        <Backdrop isOpen={isOpen} blur onClick={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Backdrop with content
export const WithContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative h-screen bg-gray-100 p-8">
        <Typography variant="h1" className="mb-4">
          Backdrop with Content
        </Typography>
        <Typography variant="body-m-medium" className="mb-8">
          This backdrop contains a modal dialog.
        </Typography>

        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)}>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4">
              <Typography variant="h3" className="mb-4">
                Modal Title
              </Typography>
              <Typography variant="body-m-medium" className="mb-6">
                This is a modal dialog that appears on top of the backdrop.
                Click outside to close it.
              </Typography>
              <div className="flex gap-3">
                <Button onClick={() => setIsOpen(false)}>Close</Button>
                <Button variant="secondary">Action</Button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};

// Backdrop with custom z-index
export const WithCustomZIndex: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative h-screen bg-gray-100 p-8">
        <Typography variant="h1" className="mb-4">
          Backdrop with Custom Z-Index
        </Typography>
        <Typography variant="body-m-medium" className="mb-8">
          This backdrop uses a custom z-index value to demonstrate layering
          control.
        </Typography>

        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Backdrop
        </Button>

        <Backdrop isOpen={isOpen} onClick={() => setIsOpen(false)} zIndex={100}>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4">
              <Typography variant="h3" className="mb-4">
                High Z-Index Backdrop
              </Typography>
              <Typography variant="body-m-medium" className="mb-6">
                This backdrop has a z-index of 100, making it appear above most
                other elements.
              </Typography>
              <Button onClick={() => setIsOpen(false)}>Close Backdrop</Button>
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};
