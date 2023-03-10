import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  Title,
} from 'react-native-paper';
import {RootParamList} from '../../navigation/AppNavigation';

type MyScreenNavigationProp = DrawerNavigationProp<RootParamList>;

interface MyScreenProps {
  navigation: MyScreenNavigationProp;
}

const descriptions = {
  githubDescription: `charbelmansour005\ncraper16`,
  emailDescription: `charbelmansour005@gmail.com\ngeorgio.saad@gmail.com`,
};

const AboutUs = ({navigation}: MyScreenProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#343541',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 17,
      },
      headerLeft: () => (
        <IconButton
          icon={'menu-right-outline'}
          onPress={() => navigation.toggleDrawer()}
          containerColor="#343541"
          iconColor="white"
        />
      ),
      headerShadowVisible: false,
    });
  });
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#343541'}}>
      <Card mode="outlined" style={styles.card}>
        <Card.Content>
          <Title style={{color: 'white'}}>About Us</Title>
          <Divider style={styles.divider} />

          <List.Item
            title="Charbel Mansour"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description="Software Developer"
            left={() => (
              <Avatar.Image
                size={40}
                source={require('../../assets/private/charbel.jpeg')}
                style={styles.avatar}
              />
            )}
          />

          <List.Item
            title="Georgio Saad"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description="Software Engineer"
            left={() => (
              <Avatar.Image
                size={40}
                source={require('../../assets/private/georgio.jpeg')}
                style={styles.avatar}
              />
            )}
          />

          <Divider style={styles.divider} />

          <List.Item
            title="Github"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description={descriptions.githubDescription}
            left={() => <List.Icon icon="github" color="white" />}
          />

          <List.Item
            title="Email"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description={descriptions.emailDescription}
            left={() => <List.Icon icon="email" color="white" />}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: '#3e3f4b',
  },
  divider: {
    marginVertical: 16,
  },
  avatar: {
    backgroundColor: '#1e88e5',
    marginRight: 16,
  },
});

export default AboutUs;
