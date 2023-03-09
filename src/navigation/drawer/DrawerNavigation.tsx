import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutUs from '../../screens/Info';
import OpenAI from '../../screens/openAI';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

type DrawerNavigationParams = {
  OpenAi: undefined;
  AboutUs: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigationParams>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="OpenAi"
      screenOptions={({route}) => ({
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#343541'},
        drawerStyle: {backgroundColor: '#343541'},
        drawerIcon: ({color, focused, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'OpenAi':
              iconName = focused ? 'head-snowflake-outline' : 'head-snowflake';
              break;
            case 'AboutUs':
              iconName = focused ? 'information-outline' : 'information';
              break;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        drawerLabel: ({color, focused}) => {
          let children = '';
          switch (route.name) {
            case 'OpenAi':
              children = 'Open AI';
              break;
            case 'AboutUs':
              children = 'About Us';
              break;
            default:
              children = '';
          }
          return (
            <Text style={{color: focused ? 'white' : 'gray'}}>{children}</Text>
          );
        },
      })}>
      <Drawer.Screen
        name="OpenAi"
        component={OpenAI}
        options={{headerTitle: 'Open AI'}}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerTitle: 'About Us'}}
      />
    </Drawer.Navigator>
  );
}
