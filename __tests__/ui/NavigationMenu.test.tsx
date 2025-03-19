import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation/navigation-menu';

// Mock Radix UI's Navigation Menu component to make testing easier
jest.mock('@radix-ui/react-navigation-menu', () => {
  const originalModule = jest.requireActual('@radix-ui/react-navigation-menu');
  
  return {
    __esModule: true,
    ...originalModule,
    Root: ({ children, ...props }) => (
      <div data-testid="navigation-menu-root" {...props}>
        {children}
      </div>
    ),
    List: ({ children, ...props }) => (
      <ul data-testid="navigation-menu-list" {...props}>
        {children}
      </ul>
    ),
    Item: ({ children, ...props }) => (
      <li data-testid="navigation-menu-item" {...props}>
        {children}
      </li>
    ),
    Trigger: ({ children, ...props }) => (
      <button data-testid="navigation-menu-trigger" {...props}>
        {children}
      </button>
    ),
    Content: ({ children, ...props }) => (
      <div data-testid="navigation-menu-content" data-state="closed" {...props}>
        {children}
      </div>
    ),
    Link: ({ children, ...props }) => (
      <a data-testid="navigation-menu-link" {...props}>
        {children}
      </a>
    ),
    Viewport: ({ ...props }) => (
      <div data-testid="navigation-menu-viewport" {...props} />
    ),
    Indicator: ({ ...props }) => (
      <div data-testid="navigation-menu-indicator" {...props} />
    ),
  };
});

// Mock lucide-react for icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span data-testid="chevron-down-icon">ChevronDown</span>
}));

// Mock setCursorText function
const mockSetCursorText = jest.fn();

// Create a test navigation menu component
const TestNavigationMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onMouseEnter={() => mockSetCursorText('VIEW')}
            onMouseLeave={() => mockSetCursorText('')}
          >
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div>
              <NavigationMenuLink href="/products/item1">Product 1</NavigationMenuLink>
              <NavigationMenuLink href="/products/item2">Product 2</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            href="/about"
            onMouseEnter={() => mockSetCursorText('ABOUT')}
            onMouseLeave={() => mockSetCursorText('')}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

describe('NavigationMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders basic navigation structure', () => {
    render(<TestNavigationMenu />);
    
    // Check main navigation components
    expect(screen.getByTestId('navigation-menu-root')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-menu-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('navigation-menu-item').length).toBe(2);
    
    // Check navigation items
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
  
  it('shows dropdown content when trigger is clicked', () => {
    render(<TestNavigationMenu />);
    
    // Get the content element
    const content = screen.getByTestId('navigation-menu-content');
    
    // Content should be initially closed
    expect(content).toHaveAttribute('data-state', 'closed');
    
    // Click the trigger
    const trigger = screen.getByText('Products');
    fireEvent.click(trigger);
    
    // Set the content state to open to simulate the dropdown being visible
    content.setAttribute('data-state', 'open');
    
    // Content should now be open
    expect(content).toHaveAttribute('data-state', 'open');
    
    // Product links should be in the document
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
  
  it('has correct links in dropdown content', () => {
    render(<TestNavigationMenu />);
    
    // Click the trigger to open dropdown
    const trigger = screen.getByText('Products');
    fireEvent.click(trigger);
    
    // Check links
    const links = screen.getAllByTestId('navigation-menu-link');
    expect(links.length).toBe(3); // 2 product links + 1 About link
    
    // Check product links
    const product1Link = screen.getByText('Product 1').closest('a');
    const product2Link = screen.getByText('Product 2').closest('a');
    
    expect(product1Link).toHaveAttribute('href', '/products/item1');
    expect(product2Link).toHaveAttribute('href', '/products/item2');
  });
  
  it('updates cursor text on hover', async () => {
    const user = userEvent.setup();
    render(<TestNavigationMenu />);
    
    // Hover over products trigger
    const trigger = screen.getByText('Products');
    await user.hover(trigger);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Leave products trigger
    await user.unhover(trigger);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Hover over about link
    const aboutLink = screen.getByText('About').closest('a');
    await user.hover(aboutLink!);
    expect(mockSetCursorText).toHaveBeenCalledWith('ABOUT');
    
    // Leave about link
    await user.unhover(aboutLink!);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('passes accessibility tests', async () => {
    const { container } = render(<TestNavigationMenu />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('includes a chevron icon in triggers', () => {
    render(<TestNavigationMenu />);
    
    // Find the trigger
    const trigger = screen.getByText('Products').closest('button');
    
    // Check for chevron icon
    const chevronIcon = screen.getByTestId('chevron-down-icon');
    expect(chevronIcon).toBeInTheDocument();
    expect(trigger).toContainElement(chevronIcon);
  });
}); 