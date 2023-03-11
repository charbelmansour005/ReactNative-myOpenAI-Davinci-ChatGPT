import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {IconButton, TextInput, Divider, Card} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {StatusBar} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Chat from '../../assets/chat.png';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootParamList} from '../../navigation/AppNavigation';
import LinearGradient from 'react-native-linear-gradient';

type MyScreenNavigationProp = DrawerNavigationProp<RootParamList>;

interface MyScreenProps {
  navigation: MyScreenNavigationProp;
}

const Davinci = ({navigation}: MyScreenProps) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const toast = useToast();

  const welcomeToast = (): void => {
    toast.show(
      `Welcome! You're now in the section where you can use the OpenAI Davinci engine for completions.\n\nThis state-of-the-art language model has been trained on a diverse range of internet text and can generate human-like responses to a variety of prompts.\n\nStart using it now and experience the power of AI-generated text!`,
      {
        type: 'normal',
        duration: 12000,
        animationType: 'zoom-in',
        placement: 'center',
      },
    );
  };

  useEffect(() => {
    welcomeToast();
  }, []);

  const ShowLoader = (): JSX.Element => (
    <View style={styles.center}>
      <LottieView
        speed={5.5}
        style={styles.animation}
        source={require('../../assets/json/customLoader.json')}
        autoPlay={true}
        loop={true}
      />
    </View>
  );

  const handleBusinessLogic = async () => {
    try {
      setBase(input);
      /*
       * @token the token needed for the API to function
       * you can get yours from -> 'https://platform.openai.com/account/api-keys'
       */
      const token = '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';
      const payload = {
        prompt: input,
        max_tokens: 300,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };
      const responseFromOpenAI = await fetch(
        'https://api.openai.com/v1/engines/davinci/completions',
        options,
      );
      const json = await responseFromOpenAI.json();
      setResponse(json.choices[0].text);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setResponse('');
    setInput('');
    handleBusinessLogic();
  };

  type Suggestions = {
    One: string;
    Two: string;
  };

  const Suggestions: Suggestions = {
    One: `I hate electric cars, but when it comes to Tesla`,
    Two: `Lebanon is an amazing country, however`,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#343541'} barStyle="light-content" />
      {/* if loading is true, we show the 'ShowApiBusy' function  */}
      {loading && ShowLoader()}
      {response && !loading ? (
        <ScrollView
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}>
          <Text selectable style={styles.response}>
            '{base}'
          </Text>
          <Divider style={{height: 1}} />
          {/* Image of OpenAI */}
          <Image
            source={Chat}
            style={{
              height: 25,
              width: 25,
              padding: 10,
              marginTop: 10,
              marginBottom: 0,
              marginLeft: 15,
              borderRadius: 2,
            }}
          />
          <Text selectable style={styles.response}>
            {base + response}
          </Text>
        </ScrollView>
      ) : null}
      {!response && !loading && (
        <Card mode="contained" style={styles.card}>
          <Text style={styles.response}>Clickable Examples:</Text>
          <Text
            onPress={() => setInput(Suggestions.One)}
            style={styles.example}>
            {Suggestions.One}
          </Text>
          <Text
            onPress={() => setInput(Suggestions.Two)}
            style={styles.example}>
            {Suggestions.Two}
          </Text>
        </Card>
      )}
      <LinearGradient
        colors={['#40414f', '#40414f', '#343541', '#343541']}
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder="Enter text to complete"
          mode="outlined"
          activeOutlineColor="#128C7E"
          textColor="white"
          placeholderTextColor="silver"
        />
        <>
          {loading ? (
            <LottieView
              speed={1}
              style={{height: 6, marginTop: '7%', marginLeft: '4.2%'}}
              source={require('../../assets/json/95076-loading-dots.json')}
              autoPlay={true}
              loop={true}
            />
          ) : (
            <IconButton
              icon={loading ? 'clock-time-eight-outline' : 'send'}
              iconColor="white"
              containerColor="#40414f"
              size={24}
              borderless={true}
              onPress={() => {
                setBase(input);
                handleSubmit();
              }}
              mode="contained"
              style={{marginTop: 10, marginRight: 3}}
              disabled={loading || !input}
            />
          )}
        </>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    padding: 5,
    backgroundColor: '#40414f',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343541',
  },
  input: {
    width: '85%',
    marginBottom: 5,
    marginLeft: 5,
    backgroundColor: '#40414f',
  },
  response: {
    color: 'white',
    marginVertical: 3,
    // fontFamily: 'sans-serif-condensed',
    fontSize: 15,
    padding: 15,
  },
  example: {
    color: '#24a37f',
    marginVertical: 3,
    fontFamily: 'sans-serif-condensed',
    fontSize: 16,
    padding: 5,
    textDecorationLine: 'underline',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  animation: {width: '100%', height: 35, aspectRatio: 0.5},
});

export default Davinci;
