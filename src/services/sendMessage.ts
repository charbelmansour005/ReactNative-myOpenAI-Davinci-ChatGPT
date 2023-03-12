import axios from "axios"
import { CONTANTS } from "./api"
import { Message } from "../screens/openAI/types"
// const API_TOKEN = "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"
// KLi4jhIw7McQSKdAcPfKT3BlbkFJFLniIGspi45iqskh0L2q works

interface Choice {
  message: Message
  index: number
}

interface Completion {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: Choice[]
}

export interface sentDataModel {
  model: string
  messages: { role: string; content: string }[]
}

export async function sendMessage(sentData: sentDataModel) {
  const response = await axios.post(CONTANTS.URL, sentData, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  })

  const data: Completion = response.data

  return data
}
