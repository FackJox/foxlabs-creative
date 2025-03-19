import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/layout/tabs';

// Mock Radix UI's Tabs component to make testing easier
jest.mock('@radix-ui/react-tabs', () => {
  const originalModule = jest.requireActual('@radix-ui/react-tabs');
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Tabs Component', () => {
  // Mock setCursorText function
  const setCursorText = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setCursorText.mockReset();
  });
  
  it('renders tabs with the correct default tab selected', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
        <TabsContent value="tab3">Tab 3 Content</TabsContent>
      </Tabs>
    );
    
    // Check that all tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    
    // Check that the default tab content is shown
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    
    // Check that other tab contents are not shown
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Tab 3 Content')).not.toBeInTheDocument();
    
    // Check that the default tab is marked as active
    expect(screen.getByText('Tab 1').closest('[data-state]')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Tab 2').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Tab 3').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
  });
  
  it('switches tab content when a tab is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
        <TabsContent value="tab3">Tab 3 Content</TabsContent>
      </Tabs>
    );
    
    // Initially, Tab 1 is active
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    
    // Click on Tab 2
    await user.click(screen.getByText('Tab 2'));
    
    // Now Tab 2 content should be shown
    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 3 Content')).not.toBeInTheDocument();
    
    // Tab 2 should now be marked as active
    expect(screen.getByText('Tab 1').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Tab 2').closest('[data-state]')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Tab 3').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
    
    // Click on Tab 3
    await user.click(screen.getByText('Tab 3'));
    
    // Now Tab 3 content should be shown
    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 3 Content')).toBeInTheDocument();
    
    // Tab 3 should now be marked as active
    expect(screen.getByText('Tab 1').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Tab 2').closest('[data-state]')).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Tab 3').closest('[data-state]')).toHaveAttribute('data-state', 'active');
  });
  
  it('properly handles controlled tabs with value and onValueChange', async () => {
    const user = userEvent.setup();
    const handleValueChange = jest.fn();
    
    function TestComponent() {
      const [activeTab, setActiveTab] = React.useState('tab1');
      
      return (
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value);
            handleValueChange(value);
          }}
        >
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 Content</TabsContent>
          <TabsContent value="tab2">Tab 2 Content</TabsContent>
        </Tabs>
      );
    }
    
    render(<TestComponent />);
    
    // Initially, Tab 1 is active
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    
    // Click on Tab 2
    await user.click(screen.getByText('Tab 2'));
    
    // Handler should have been called with 'tab2'
    expect(handleValueChange).toHaveBeenCalledWith('tab2');
    
    // Tab 2 content should be shown
    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });
  
  it('properly handles disabled tabs', async () => {
    const user = userEvent.setup();
    const handleValueChange = jest.fn();
    
    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
        <TabsContent value="tab3">Tab 3 Content</TabsContent>
      </Tabs>
    );
    
    // Check that Tab 2 is disabled
    expect(screen.getByText('Tab 2').closest('button')).toBeDisabled();
    
    // Try to click the disabled tab
    await user.click(screen.getByText('Tab 2'));
    
    // Handler should not have been called
    expect(handleValueChange).not.toHaveBeenCalled();
    
    // Content should still be Tab 1
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
  });
  
  it('handles keyboard navigation correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
        <TabsContent value="tab3">Tab 3 Content</TabsContent>
      </Tabs>
    );
    
    // Tab to focus the active tab
    await user.tab();
    expect(screen.getByText('Tab 1')).toHaveFocus();
    
    // Use arrow right to move to the next tab
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 2')).toHaveFocus();
    
    // Press Enter or Space to activate the tab
    await user.keyboard('{Enter}');
    
    // Tab 2 should now be active
    expect(screen.getByText('Tab 2').closest('[data-state]')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    
    // Use arrow right again to move to the next tab
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 3')).toHaveFocus();
    
    // Arrow right at the end should wrap to the first tab
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 1')).toHaveFocus();
    
    // Arrow left should move back to the last tab
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Tab 3')).toHaveFocus();
  });
  
  it('sets cursor text on hover and clears on leave', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger 
            value="tab1" 
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            Tab 1
          </TabsTrigger>
          <TabsTrigger 
            value="tab2"
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
      </Tabs>
    );
    
    // Hover Tab 1
    fireEvent.mouseEnter(screen.getByText('Tab 1'));
    expect(setCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(screen.getByText('Tab 1'));
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Hover Tab 2
    fireEvent.mouseEnter(screen.getByText('Tab 2'));
    expect(setCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(screen.getByText('Tab 2'));
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Project tabs">
          <TabsTrigger value="tab1">Description</TabsTrigger>
          <TabsTrigger value="tab2">Gallery</TabsTrigger>
          <TabsTrigger value="tab3">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Project description content...</TabsContent>
        <TabsContent value="tab2">Project gallery content...</TabsContent>
        <TabsContent value="tab3">Project details content...</TabsContent>
      </Tabs>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 