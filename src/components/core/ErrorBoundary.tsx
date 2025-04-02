import React, { Component, ReactNode } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { containerStyle } from '../../assets/styles/styles';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={containerStyle}>
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            Try Again
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
