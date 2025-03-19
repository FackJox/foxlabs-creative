import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Test Badge</Badge>);
    
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-primary');
  });

  it('renders with the correct variant class', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    
    const badgeElement = screen.getByText('Secondary Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-secondary');
  });

  it('applies custom className correctly', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    
    const badgeElement = screen.getByText('Custom Badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('custom-class');
  });
}); 