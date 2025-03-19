import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/navigation/sidebar';

// Need to mock these hooks that are used in the Sidebar component
jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn().mockReturnValue(false)
}));

// Mock Radix UI components
jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children }) => children
}));

// Mock Sheet component
jest.mock('@/components/ui', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Input: ({ ...props }) => <input {...props} />,
  Separator: () => <hr />,
  Sheet: ({ open, onOpenChange, children }) => (
    <div data-testid="sheet" data-open={open}>
      {children}
    </div>
  ),
  SheetContent: ({ children, side }) => (
    <div data-testid="sheet-content" data-side={side}>
      {children}
    </div>
  ),
  Tooltip: ({ children }) => <>{children}</>,
  TooltipContent: ({ children }) => <div data-testid="tooltip-content">{children}</div>,
  TooltipProvider: ({ children }) => <>{children}</>,
  TooltipTrigger: ({ children }) => <div data-testid="tooltip-trigger">{children}</div>
}));

const mockSetCursorText = jest.fn();

// A helper component to test the sidebar
const TestSidebar = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader>
          <h3>Sidebar Header</h3>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onMouseEnter={() => mockSetCursorText('VIEW')} 
                onMouseLeave={() => mockSetCursorText('')}
              >
                Menu Item 1
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Menu Item 2
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div>Sidebar Footer</div>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar in collapsed state when defaultOpen is false', () => {
    render(<TestSidebar />);
    
    // Sidebar should exist
    const sidebar = screen.getByRole('button', { name: /toggle sidebar/i });
    expect(sidebar).toBeInTheDocument();
    
    // Sidebar should be in collapsed state
    const sidebarWrapper = screen.getByText('Sidebar Header').closest('[data-state]');
    expect(sidebarWrapper).toHaveAttribute('data-state', 'collapsed');
  });
  
  it('toggles sidebar state when trigger is clicked', () => {
    render(<TestSidebar />);
    
    // Sidebar should be in collapsed state initially
    const sidebarWrapper = screen.getByText('Sidebar Header').closest('[data-state]');
    expect(sidebarWrapper).toHaveAttribute('data-state', 'collapsed');
    
    // Click the sidebar trigger
    const trigger = screen.getByRole('button', { name: /toggle sidebar/i });
    fireEvent.click(trigger);
    
    // Sidebar should now be expanded
    expect(sidebarWrapper).toHaveAttribute('data-state', 'expanded');
    
    // Click the trigger again
    fireEvent.click(trigger);
    
    // Sidebar should be collapsed again
    expect(sidebarWrapper).toHaveAttribute('data-state', 'collapsed');
  });
  
  it('contains header, content, and footer sections', () => {
    render(<TestSidebar />);
    
    // Check for header
    expect(screen.getByText('Sidebar Header')).toBeInTheDocument();
    
    // Check for content and menu items
    expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
    expect(screen.getByText('Menu Item 2')).toBeInTheDocument();
    
    // Check for footer
    expect(screen.getByText('Sidebar Footer')).toBeInTheDocument();
  });
  
  it('updates cursor text on menu items hover', async () => {
    const user = userEvent.setup();
    render(<TestSidebar />);
    
    // Get the first menu item
    const menuItem = screen.getByText('Menu Item 1');
    
    // Mouse enter
    await user.hover(menuItem);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Mouse leave
    await user.unhover(menuItem);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('passes accessibility tests', async () => {
    const { container } = render(<TestSidebar />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 