import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { fetchProjects } from '../api/client';

// Test component to fetch data
function TestComponent() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching projects');
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} data-testid={`project-${project.id}`}>
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('MSW Setup Tests', () => {
  it('fetches and displays projects from the mocked API', async () => {
    render(<TestComponent />);
    
    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for the projects to be loaded
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
    
    // Check that some projects from our mock data are rendered
    expect(screen.getByTestId('project-1')).toHaveTextContent('BRUTALIST COMMERCE');
    expect(screen.getByTestId('project-2')).toHaveTextContent('RAW INTERFACE');
  });
}); 