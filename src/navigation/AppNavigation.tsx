import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './drawer/DrawerNavigation';

export type RootParamList = {
  Drawer: undefined;
};

const RootStack = createStackNavigator<RootParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Drawer"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
