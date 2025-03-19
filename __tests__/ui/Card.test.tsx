import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/data-display/card';

describe('Card Component', () => {
  // Test main Card component
  it('renders Card correctly with default props', () => {
    render(<Card data-testid="card">Card Content</Card>);
    
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveTextContent('Card Content');
  });

  // Test CardHeader component
  it('renders CardHeader correctly', () => {
    render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
    
    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('p-6');
    expect(header).toHaveTextContent('Header Content');
  });

  // Test CardTitle component
  it('renders CardTitle correctly', () => {
    render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
    
    const title = screen.getByTestId('card-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveTextContent('Card Title');
  });

  // Test CardDescription component
  it('renders CardDescription correctly', () => {
    render(<CardDescription data-testid="card-description">Card Description</CardDescription>);
    
    const description = screen.getByTestId('card-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-muted-foreground');
    expect(description).toHaveTextContent('Card Description');
  });

  // Test CardContent component
  it('renders CardContent correctly', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    
    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
    expect(content).toHaveTextContent('Content');
  });

  // Test CardFooter component
  it('renders CardFooter correctly', () => {
    render(<CardFooter data-testid="card-footer">Footer Content</CardFooter>);
    
    const footer = screen.getByTestId('card-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
    expect(footer).toHaveTextContent('Footer Content');
  });

  // Test all Card components together
  it('renders a complete card with all subcomponents', () => {
    render(
      <Card data-testid="complete-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>Main content goes here</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('complete-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  // Test custom className
  it('applies custom classNames to all card components', () => {
    render(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-desc">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Title').parentElement).toHaveClass('custom-header');
    expect(screen.getByText('Title')).toHaveClass('custom-title');
    expect(screen.getByText('Description')).toHaveClass('custom-desc');
    expect(screen.getByText('Content')).toHaveClass('custom-content');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });
}); 