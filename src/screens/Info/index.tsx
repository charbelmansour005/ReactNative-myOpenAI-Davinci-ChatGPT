import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Chat from '../../assets/chat.png';
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

const AboutUs = ({navigation}: MyScreenProps) => {
  const githubDescription = `charbelmansour005\ncraper16`;
  const emailDescription = `charbelmansour005@gmail.com\ngeorgio.saad@gmail.com`;

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
          icon={'menu'}
          onPress={() => navigation.toggleDrawer()}
          containerColor="#343541"
          iconColor="white"
        />
      ),
      headerShadowVisible: false,
      headerRight: () => (
        <Image
          source={Chat}
          style={{
            height: 25,
            width: 25,
            marginBottom: 0,
            borderRadius: 2,
            marginRight: '5%',
          }}
        />
      ),
    });
  });
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#343541'}}>
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <Title style={{color: 'white'}}>About Us</Title>
          <Divider style={styles.divider} />

          <List.Item
            title="Charbel Mansour"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description="Software Engineer"
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
            description={githubDescription}
            left={() => <List.Icon icon="github" color="white" />}
          />

          <List.Item
            title="Email"
            titleStyle={{color: 'white'}}
            descriptionStyle={{color: 'silver'}}
            description={emailDescription}
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
