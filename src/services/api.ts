import {ToastOptions} from 'react-native-toast-notifications/lib/typescript/toast';

type Constants = {
  myToken: string;
  URL: string;
  openAiModel: string;
  toastOptions: ToastOptions;
  role: {user: string};
};

export const CONTANTS: Constants = {
  role: {user: 'user'},
  toastOptions: {
    placement: 'top',
    animationType: 'zoom-in',
    duration: 5000,
    type: 'danger',
  },
  openAiModel: 'gpt-3.5-turbo',
  myToken: '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',
  URL: 'https://api.openai.com/v1/chat/completions', // ChatGPT V1
  // URL: "https://api.openai.com/v1/engines/davinci/completions", // Completions Davinci
};
