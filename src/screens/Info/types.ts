import { DrawerNavigationProp } from "@react-navigation/drawer"
import { RootParamList } from "../../navigation/AppNavigation"

type MyScreenNavigationProp = DrawerNavigationProp<RootParamList>

export interface MyScreenProps {
  navigation: MyScreenNavigationProp
}
