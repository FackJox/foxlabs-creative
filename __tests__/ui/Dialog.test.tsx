import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/overlay/dialog';
import { Button } from '@/components/ui/inputs/button';

// Mock Radix UI's portal to make testing easier
jest.mock('@radix-ui/react-dialog', () => {
  const originalModule = jest.requireActual('@radix-ui/react-dialog');
  return {
    __esModule: true,
    ...originalModule,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Dialog Component', () => {
  // Mock setCursorText function
  const setCursorText = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setCursorText.mockReset();
  });
  
  it('renders dialog trigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogHeader>
          <p>Dialog content</p>
          <DialogFooter>
            <Button>Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Check that trigger is rendered
    expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument();
    
    // Content should not be visible initially
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Dialog description text')).not.toBeInTheDocument();
    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
  });
  
  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogHeader>
          <p>Dialog content</p>
          <DialogFooter>
            <Button>Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Click the trigger button
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    
    // Dialog content should be visible
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog description text')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    
    // Close button should be visible (X button in the corner with sr-only text)
    expect(screen.getByText('Close', { selector: '.sr-only' })).toBeInTheDocument();
  });
  
  it('closes dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    
    // Click the close button (X button in the corner)
    const closeButton = screen.getByText('Close', { selector: '.sr-only' }).closest('button');
    await user.click(closeButton);
    
    // Dialog content should no longer be visible
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });
  
  it('closes dialog when escape key is pressed', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    
    // Press Escape
    await user.keyboard('{Escape}');
    
    // Dialog content should no longer be visible
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });
  
  it('closes dialog when a custom close trigger is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <p>Dialog content</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    
    // Click the custom close button
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    
    // Dialog content should no longer be visible
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });
  
  it('maintains focus trap within dialog when open', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <input placeholder="Input field" data-testid="dialog-input" />
          <DialogFooter>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    
    // For Radix UI Dialog, focus is auto-managed and might initially go to any focusable element
    // Check that some element inside the dialog has focus, rather than a specific element
    const focusedElement = document.activeElement;
    expect(focusedElement).not.toBe(document.body);
    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement.contains(focusedElement)).toBe(true);
    
    // Continue tabbing to verify focus trap
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    
    // After tabbing through all elements, we should still be inside the dialog
    const newFocusedElement = document.activeElement;
    expect(newFocusedElement).not.toBe(document.body);
    expect(dialogElement.contains(newFocusedElement)).toBe(true);
  });
  
  it('returns focus to trigger when dialog is closed', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button data-testid="close-dialog-button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Focus and click the trigger
    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    trigger.focus();
    expect(trigger).toHaveFocus();
    
    await user.click(trigger);
    
    // Dialog should be open, trigger loses focus
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(trigger).not.toHaveFocus();
    
    // Close the dialog with the custom close button
    await user.click(screen.getByTestId('close-dialog-button'));
    
    // Focus should return to the trigger
    expect(trigger).toHaveFocus();
  });
  
  it('sets cursor text on hover and clears on leave', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button onMouseEnter={() => setCursorText('OPEN')} onMouseLeave={() => setCursorText('')}>
            Open Dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose asChild>
            <Button 
              data-testid="close-dialog-button"
              onMouseEnter={() => setCursorText('CLOSE')} 
              onMouseLeave={() => setCursorText('')}
            >
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Hover the trigger
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(setCursorText).toHaveBeenCalledWith('OPEN');
    
    fireEvent.mouseLeave(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    
    // Hover the close button
    fireEvent.mouseEnter(screen.getByTestId('close-dialog-button'));
    expect(setCursorText).toHaveBeenCalledWith('CLOSE');
    
    fireEvent.mouseLeave(screen.getByTestId('close-dialog-button'));
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('correctly handles a controlled dialog state', async () => {
    const user = userEvent.setup();
    const handleOpenChange = jest.fn();
    
    // Use a wrapper component to fully control the dialog state
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      
      const handleChange = (newOpen: boolean) => {
        setOpen(newOpen);
        handleOpenChange(newOpen);
      };
      
      return (
        <Dialog 
          open={open} 
          onOpenChange={handleChange}
        >
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <Button 
              data-testid="close-dialog-button" 
              onClick={() => handleChange(false)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      );
    };
    
    render(<ControlledDialog />);
    
    // Open the dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    
    // Handler should have been called with true
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    
    // Dialog should be open
    expect(screen.getByText('Controlled Dialog')).toBeInTheDocument();
    
    // Clear previous calls to the mock
    handleOpenChange.mockClear();
    
    // Close with button inside dialog
    await user.click(screen.getByTestId('close-dialog-button'));
    
    // Handler should have been called with false
    expect(handleOpenChange).toHaveBeenCalledWith(false);
    
    // Dialog should be closed
    expect(screen.queryByText('Controlled Dialog')).not.toBeInTheDocument();
  });
  
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogHeader>
          <p>Dialog content</p>
          <DialogFooter>
            <Button>Action</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog for axe to analyze the full component
    fireEvent.click(screen.getByRole('button', { name: 'Open Dialog' }));
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('supports controlled mode with onOpenChange', async () => {
    const onOpenChange = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose asChild>
            <Button data-testid="close-dialog-button">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Click to open
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    
    // Click to close
    await user.click(screen.getByTestId('close-dialog-button'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});