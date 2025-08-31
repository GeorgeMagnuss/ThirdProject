import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Statistics from './Statistics';

// Mock the entire api service module
jest.mock('../services/api', () => ({
  statsService: {
    getVacationStats: jest.fn(),
    getTotalUsers: jest.fn(),
    getTotalLikes: jest.fn(),
    getLikesDistribution: jest.fn()
  }
}));

// Mock recharts to avoid rendering issues
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />
}));

const { statsService } = require('../services/api');

describe('Statistics Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    statsService.getVacationStats.mockImplementation(() => new Promise(() => {}));
    statsService.getTotalUsers.mockImplementation(() => new Promise(() => {}));
    statsService.getTotalLikes.mockImplementation(() => new Promise(() => {}));
    statsService.getLikesDistribution.mockImplementation(() => new Promise(() => {}));

    render(<Statistics />);
    expect(screen.getByText('Loading Statistics...')).toBeInTheDocument();
  });

  test('displays total users stat', async () => {
    statsService.getVacationStats.mockResolvedValue({ pastVacations: 5, ongoingVacations: 3, futureVacations: 7 });
    statsService.getTotalUsers.mockResolvedValue({ totalUsers: 25 });
    statsService.getTotalLikes.mockResolvedValue({ totalLikes: 42 });
    statsService.getLikesDistribution.mockResolvedValue([]);

    render(<Statistics />);
    
    await waitFor(() => {
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('Total Users')).toBeInTheDocument();
    });
  });

  test('displays total likes stat', async () => {
    statsService.getVacationStats.mockResolvedValue({ pastVacations: 5, ongoingVacations: 3, futureVacations: 7 });
    statsService.getTotalUsers.mockResolvedValue({ totalUsers: 25 });
    statsService.getTotalLikes.mockResolvedValue({ totalLikes: 42 });
    statsService.getLikesDistribution.mockResolvedValue([]);

    render(<Statistics />);
    
    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Total Likes')).toBeInTheDocument();
    });
  });

  test('displays error message when API fails', async () => {
    statsService.getVacationStats.mockRejectedValue(new Error('Network error'));
    statsService.getTotalUsers.mockRejectedValue(new Error('Network error'));
    statsService.getTotalLikes.mockRejectedValue(new Error('Network error'));
    statsService.getLikesDistribution.mockRejectedValue(new Error('Network error'));

    render(<Statistics />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load statistics/)).toBeInTheDocument();
    });
  });

  test('renders chart components', async () => {
    statsService.getVacationStats.mockResolvedValue({ pastVacations: 5, ongoingVacations: 3, futureVacations: 7 });
    statsService.getTotalUsers.mockResolvedValue({ totalUsers: 25 });
    statsService.getTotalLikes.mockResolvedValue({ totalLikes: 42 });
    statsService.getLikesDistribution.mockResolvedValue([]);

    render(<Statistics />);
    
    await waitFor(() => {
      expect(screen.getAllByTestId('responsive-container')).toHaveLength(2);
    });
  });
});