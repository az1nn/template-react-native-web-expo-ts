import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-background justify-center items-center p-8">
          <Text className="text-5xl mb-4">⚠️</Text>
          <Text className="text-2xl font-bold text-foreground mb-3">Something went wrong</Text>
          <Text className="text-sm text-muted-foreground text-center mb-8 leading-5">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button onPress={this.handleRetry}>
            <Text>Try Again</Text>
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
