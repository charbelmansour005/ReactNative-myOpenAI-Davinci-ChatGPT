import { ToastOptions } from "react-native-toast-notifications/lib/typescript/toast"

type Constants = {
  myToken: string
  URL: string
  DavinciURL: string
  openAiModel: string
  toastOptions: ToastOptions
  welcomeToastOptions: ToastOptions
  role: { user: string }
}

export const CONTANTS: Constants = {
  role: { user: "user" },
  toastOptions: {
    placement: "top",
    animationType: "zoom-in",
    duration: 5000,
    type: "danger",
  },
  welcomeToastOptions: {
    type: "normal",
    duration: 12000,
    animationType: "zoom-in",
    placement: "center",
  },
  openAiModel: "gpt-3.5-turbo",
  myToken: "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",
  URL: "https://api.openai.com/v1/chat/completions", // ChatGPT V1
  DavinciURL: "https://api.openai.com/v1/engines/davinci/completions", // Completions Davinci
}
