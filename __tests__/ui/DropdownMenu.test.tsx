import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/overlay/dropdown-menu';

// Mock Radix UI's portal to make testing easier
jest.mock('@radix-ui/react-dropdown-menu', () => {
  const originalModule = jest.requireActual('@radix-ui/react-dropdown-menu');
  return {
    __esModule: true,
    ...originalModule,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('DropdownMenu Component', () => {
  // Mock setCursorText function
  const setCursorText = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setCursorText.mockReset();
  });
  
  it('renders dropdown menu trigger correctly', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Check trigger is rendered
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
    
    // Content should not be visible initially
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
  
  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Click the trigger button
    await user.click(screen.getByText('Open Menu'));
    
    // Content should be visible
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
  
  it('calls onClick handler when menu item is clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleClick}>Clickable Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Click the trigger button to open the menu
    await user.click(screen.getByText('Open Menu'));
    
    // Click the menu item
    await user.click(screen.getByText('Clickable Item'));
    
    // Handler should have been called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders checkbox items correctly', async () => {
    const onCheckedChange = jest.fn();
    const user = userEvent.setup();
    
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Click the checkbox item
    await user.click(screen.getByText('Checkbox Item'));
    
    // onCheckedChange should have been called with true
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
  
  it('renders radio items correctly', async () => {
    const onValueChange = jest.fn();
    const user = userEvent.setup();
    
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Select Option</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Click Option 2
    await user.click(screen.getByText('Option 2'));
    
    // onValueChange should have been called with "option2"
    expect(onValueChange).toHaveBeenCalledWith('option2');
  });
  
  it('renders label and separator correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Open the menu
    await user.click(screen.getByText('Open Menu'));
    
    // Label should be rendered
    expect(screen.getByText('Menu Label')).toBeInTheDocument();
    
    // Separator should be rendered (check that it exists by CSS class)
    expect(document.querySelector('.h-px')).toBeInTheDocument();
  });
  
  it('handles keyboard navigation correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Tab to focus the trigger
    await user.tab();
    expect(screen.getByText('Open Menu')).toHaveFocus();
    
    // Open the menu with Enter
    await user.keyboard('{Enter}');
    
    // First item should be focused
    expect(screen.getByText('Item 1').closest('div')).toHaveFocus();
    
    // Press down arrow to focus next item
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Item 2').closest('div')).toHaveFocus();
    
    // Press down arrow again to focus next item
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('Item 3').closest('div')).toHaveFocus();
    
    // Press up arrow to focus previous item
    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('Item 2').closest('div')).toHaveFocus();
    
    // Press Escape to close the menu
    await user.keyboard('{Escape}');
    
    // Menu should be closed
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
  
  it('sets cursor text on hover and clears on leave', async () => {
    const user = userEvent.setup();
    
    render(
      <DropdownMenu>
        <DropdownMenuTrigger
          onMouseEnter={() => setCursorText('OPEN')}
          onMouseLeave={() => setCursorText('')}
        >
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onMouseEnter={() => setCursorText('SELECT')}
            onMouseLeave={() => setCursorText('')}
          >
            Item 1
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Hover the trigger
    fireEvent.mouseEnter(screen.getByText('Open Menu'));
    expect(setCursorText).toHaveBeenCalledWith('OPEN');
    
    fireEvent.mouseLeave(screen.getByText('Open Menu'));
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Open the menu
    await user.click(screen.getByText('Open Menu'));
    
    // Hover a menu item
    fireEvent.mouseEnter(screen.getByText('Item 1'));
    expect(setCursorText).toHaveBeenCalledWith('SELECT');
    
    fireEvent.mouseLeave(screen.getByText('Item 1'));
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open options menu">Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Open the menu for axe to analyze the full component
    fireEvent.click(screen.getByText('Options'));
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 