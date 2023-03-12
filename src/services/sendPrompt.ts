import axios, { AxiosResponse } from "axios"
import { CONTANTS } from "./api"

// const API_TOKEN = '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';

interface Choice {
  text: string
  index: number
  logprobs?: any
  finish_reason: string
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

export interface SentDataDavinciModel {
  prompt: string
  temperature?: number
  max_tokens?: number
  n?: number
  stop?: string | string[]
  length?: number
  echo?: boolean
  presence_penalty?: number
  frequency_penalty?: number
  best_of?: number
  logprobs?: number
}

export async function sendPrompt(
  sentData: SentDataDavinciModel
): Promise<Completion> {
  const response: AxiosResponse<Completion> = await axios.post(
    CONTANTS.DavinciURL,
    sentData,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  )

  const data: Completion = response.data

  console.log(response)

  return data
}
