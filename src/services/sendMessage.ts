import axios from 'axios';
// import {API_TOKEN} from '@env';
import {CONTANTS} from './api';
import {Message} from '../screens/openAI';
const API_TOKEN = 'sk-';
// KLi4jhIw7McQSKdAcPfKT3BlbkFJFLniIGspi45iqskh0L2q

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
