import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Divider, List, Title} from 'react-native-paper';

const AboutUs = () => {
  const githubDescription = `charbelmansour005\ncraper16`;
  const emailDescription = `charbelmansour005@gmail.com\ngeorgio.saad@gmail.com`;
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: '#343541'}}>
      <Card style={styles.card}>
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
