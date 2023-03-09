import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const AboutUs = () => {
  return (
    <View style={styles.screen}>
      <View>
        <Text>Charbel Mansour</Text>
        <Text>Software Engineer</Text>
        <View>
          <Text>Links: </Text>
          <View>
            <Text>Github: </Text>
          </View>
          <View>
            <Text>LinkedIn: </Text>
          </View>
          <View>
            <Text>Email: </Text>
          </View>
        </View>
      </View>
      <View>
        <Text>Georgio Saad</Text>
        <Text>Software Engineer</Text>
        <View>
          <Text>Links: </Text>
          <View>
            <Text>Github: </Text>
          </View>
          <View>
            <Text>LinkedIn: </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#343541',
  },
});

export default AboutUs;
