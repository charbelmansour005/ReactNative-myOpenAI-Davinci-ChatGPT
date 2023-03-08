import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OpenAI from './src/screens/openAI';
import {QueryClientProvider, QueryClient} from 'react-query';

type Props = {};

const App = (props: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <OpenAI />
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
