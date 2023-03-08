import axios from 'axios';
// import {API_TOKEN} from '@env';
const API_TOKEN = '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';
import {CONTANTS} from './api';
import {Message} from '../screens/openAI';

interface Choice {
  message: Message;
  index: number;
}

interface Completion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Choice[];
}

export interface sentDataModel {
  model: string;
  messages: {role: string; content: string}[];
}

export async function sendMessage(sentData: sentDataModel) {
  const response = await axios.post(CONTANTS.URL, sentData, {
    headers: {Authorization: `Bearer ${API_TOKEN}`},
  });

  const data: Completion = response.data;

  return data;
}
