import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutUs from '../../screens/Info';
import ChatGPT from '../../screens/openAI';
import Davinci from '../../screens/davinci';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

type DrawerNavigationParams = {
  ChatGPT: undefined;
  AboutUs: undefined;
  Davinci: undefined;
};

const Drawer = createDrawerNavigator<DrawerNavigationParams>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="ChatGPT"
      screenOptions={({route}) => ({
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#343541'},
        drawerStyle: {backgroundColor: '#343541'},
        drawerIcon: ({color, focused, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'ChatGPT':
              iconName = focused ? 'head-snowflake-outline' : 'head-snowflake';
              break;
            case 'AboutUs':
              iconName = focused ? 'information-outline' : 'information';
              break;
            case 'Davinci':
              iconName = focused ? 'head-snowflake-outline' : 'head-snowflake';
              break;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        drawerLabel: ({color, focused}) => {
          let children = '';
          switch (route.name) {
            case 'ChatGPT':
              children = 'OpenAI ChatGPT engine';
              break;
            case 'AboutUs':
              children = 'About Us';
              break;
            case 'Davinci':
              children = 'OpenAI Davinci engine';
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
        name="ChatGPT"
        component={ChatGPT}
        options={{headerTitle: 'ChatGPT'}}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerTitle: ''}}
      />

      <Drawer.Screen
        name="Davinci"
        component={Davinci}
        options={{headerTitle: 'Davinci'}}
      />
    </Drawer.Navigator>
  );
}
