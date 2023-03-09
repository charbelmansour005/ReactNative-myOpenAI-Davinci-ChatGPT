import React from 'react';
import OpenAI from './src/screens/openAI';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastProvider} from 'react-native-toast-notifications';
type Props = {};

const queryClient = new QueryClient();

const App = (props: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <OpenAI />
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
