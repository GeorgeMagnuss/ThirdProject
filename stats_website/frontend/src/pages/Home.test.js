import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  test('renders vacation statistics dashboard title', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('📊 Vacation Statistics Dashboard')).toBeInTheDocument();
  });

  test('renders hero subtitle', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('Comprehensive analytics for your vacation management system')).toBeInTheDocument();
  });

  test('shows Admin Login button when not authenticated', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  test('shows View Statistics button when authenticated', () => {
    renderWithRouter(<Home isAuthenticated={true} />);
    expect(screen.getByText('View Statistics')).toBeInTheDocument();
  });

  test('renders vacation analytics card', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('📈 Vacation Analytics')).toBeInTheDocument();
    expect(screen.getByText('Track and analyze vacation trends including past, ongoing, and future vacation statistics.')).toBeInTheDocument();
  });

  test('renders user insights card', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('👥 User Insights')).toBeInTheDocument();
    expect(screen.getByText('Monitor user engagement and total registered users in the vacation management system.')).toBeInTheDocument();
  });

  test('renders popularity metrics card', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('❤️ Popularity Metrics')).toBeInTheDocument();
    expect(screen.getByText('Analyze vacation destination popularity through like counts and user preferences.')).toBeInTheDocument();
  });

  test('renders system features section', () => {
    renderWithRouter(<Home isAuthenticated={false} />);
    expect(screen.getByText('System Features')).toBeInTheDocument();
    expect(screen.getByText('Real-time Statistics')).toBeInTheDocument();
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Visual Analytics')).toBeInTheDocument();
    expect(screen.getByText('Distribution Analysis')).toBeInTheDocument();
  });
});