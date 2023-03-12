import { DrawerNavigationProp } from "@react-navigation/drawer"
import { RootParamList } from "../../navigation/AppNavigation"

export type Message = {
  id: string
  role: string
  content: string
  timestamp: Date
}

export interface ErrorResponseMessage extends Error {
  response: { data: { error: { message: string } } }
}

type MyScreenNavigationProp = DrawerNavigationProp<RootParamList>

export interface MyScreenProps {
  navigation: MyScreenNavigationProp
}
