import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { Dialog, DialogButton } from './Dialog';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the dialog is visible',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the dialog',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show/hide the close button in the title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Dialog Trigger Component
const DialogTrigger = ({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Dialog>
    </>
  );
};

export const Basic: Story = {
  render: () => (
    <DialogTrigger>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Basic Dialog</h3>
        <p className="text-gray-600">
          This is a basic dialog with simple content.
        </p>
      </div>
    </DialogTrigger>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <DialogTrigger title="Dialog Title">
      <div className="text-center">
        <p className="text-gray-600">
          This dialog has a title with a close button.
        </p>
      </div>
    </DialogTrigger>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <DialogTrigger
      title="Confirm Action"
      buttons={
        <>
          <DialogButton
            variant="primary"
            icon={<CheckSquare className="w-5 h-5" />}
          >
            Confirm
          </DialogButton>
          <DialogButton variant="secondary">Cancel</DialogButton>
        </>
      }
    >
      <div className="text-center">
        <p className="text-gray-600">
          Are you sure you want to proceed with this action?
        </p>
      </div>
    </DialogTrigger>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <DialogTrigger
      title="Edit Profile"
      size="lg"
      buttons={
        <>
          <DialogButton
            variant="primary"
            icon={<CheckSquare className="w-5 h-5" />}
          >
            Save Changes
          </DialogButton>
          <DialogButton variant="secondary">Cancel</DialogButton>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <Input label="Name" placeholder="Enter your name" />
        </div>
        <div>
          <Input label="Email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Input label="Phone" placeholder="Enter your phone number" />
        </div>
      </div>
    </DialogTrigger>
  ),
};

export const LargeContent: Story = {
  render: () => (
    <DialogTrigger
      title="Terms and Conditions"
      size="xl"
      buttons={
        <>
          <DialogButton variant="primary">Accept</DialogButton>
          <DialogButton variant="secondary">Decline</DialogButton>
        </>
      }
    >
      <div className="max-h-96 overflow-y-auto">
        <h4 className="font-semibold mb-3">Terms of Service</h4>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>
      </div>
    </DialogTrigger>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <DialogTrigger title="Important Notice" showCloseButton={false}>
      <div className="text-center">
        <p className="text-gray-600">
          This dialog cannot be closed with the X button.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          You must use the buttons below.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 mt-4">
        <DialogButton variant="primary">Continue</DialogButton>
        <DialogButton variant="secondary">Go Back</DialogButton>
      </div>
    </DialogTrigger>
  ),
};

export const DifferentSizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(
      null,
    );

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpenSize('sm')}>Small</Button>
          <Button onClick={() => setOpenSize('md')}>Medium</Button>
          <Button onClick={() => setOpenSize('lg')}>Large</Button>
          <Button onClick={() => setOpenSize('xl')}>Extra Large</Button>
        </div>

        {openSize && (
          <Dialog
            isOpen
            onClose={() => setOpenSize(null)}
            title={`${openSize.toUpperCase()} Dialog`}
            size={openSize}
            buttons={
              <>
                <DialogButton variant="primary">OK</DialogButton>
                <DialogButton variant="secondary">Cancel</DialogButton>
              </>
            }
          >
            <div className="text-center">
              <p className="text-gray-600">
                This is a {openSize} sized dialog.
              </p>
            </div>
          </Dialog>
        )}
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => (
    <DialogTrigger>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">No Title Dialog</h3>
        <p className="text-gray-600">
          This dialog doesn&apos;t have a title section.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 mt-4">
        <DialogButton variant="primary">Primary Action</DialogButton>
        <DialogButton variant="secondary">Secondary Action</DialogButton>
      </div>
    </DialogTrigger>
  ),
};
