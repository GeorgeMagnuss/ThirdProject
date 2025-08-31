import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock the entire api service module
jest.mock('../services/api', () => ({
  authService: {
    login: jest.fn()
  }
}));

const { authService } = require('../services/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders admin login title', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    expect(screen.getByText('🔐 Admin Login')).toBeInTheDocument();
  });

  test('renders email and password input fields', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('renders login button', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('renders demo credentials', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
    expect(screen.getByText(/admin@example\.com/)).toBeInTheDocument();
    expect(screen.getByText(/adminpass/)).toBeInTheDocument();
  });

  test('allows user to type in email field', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows user to type in password field', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    expect(passwordInput.value).toBe('testpass');
  });

  test('shows loading state when submitting', async () => {
    authService.login.mockImplementation(() => new Promise(() => {}));
    
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'adminpass' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Logging in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('calls onLogin with user data on successful login', async () => {
    const mockUser = { id: 1, email: 'admin@example.com', role: 'admin' };
    authService.login.mockResolvedValue({ success: true, user: mockUser });
    
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'adminpass' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith(mockUser);
    });
  });

  test('displays error message on login failure', async () => {
    authService.login.mockRejectedValue({
      response: { status: 401 }
    });
    
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials or insufficient permissions/)).toBeInTheDocument();
    });
  });

  test('form inputs are required', () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});