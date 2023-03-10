import React, {useEffect, useState} from 'react';
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

const Davinci = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [base, setBase] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * @toast - initalizing the usage of useToast() inside a constant named 'toast'
   */
  const toast = useToast();

  /**
   * @welcomeToast
   * This toast message gets called when the user first enters the screen
   * because it is put below inside the @useEffect Hook
   */
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

  /**
   * @useEffect is a hook that activates the function(s) inside it
   * whenever the screen is first loaded or reloaded
   */
  useEffect(() => {
    welcomeToast();
  }, []);

  /**
   * @ShowLoader
   * This function gets called when the data from the API is being loaded and it displays a loading
   * animation from LottieFiles
   */
  const ShowLoader = (): JSX.Element => (
    <View style={styles.center}>
      <LottieView
        speed={5.5}
        style={styles.animation}
        source={{
          uri: 'https://assets10.lottiefiles.com/packages/lf20_rwq6ciql.json',
        }}
        autoPlay={true}
        loop={true}
      />
    </View>
  );

  /**
   * @handleBusinessLogic is where we do the POST request and send OpenAI our prompt,
   * inside it we handle all of our business logic, like Loading, success and error
   */
  const handleBusinessLogic = async () => {
    try {
      let id = toast.show('Loading...', {
        placement: 'center',
        duration: 12000,
      });
      /*
       * @setBase
       * Storing the input inside a constant using the setBase function
       * so that we can display it along side the full response
       */
      setBase(input);
      /*
       * @token the token needed for the API to function
       * you can get yours from -> 'https://platform.openai.com/account/api-keys'
       */
      const token = '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';
      // 0FPijJ6lsV2BANZJRiQ6T3BlbkFJghVbr5hhNlfmFb1Q7FvT
      /**
       * @payload
       * the 'payload' which is sent along with the POST request.
       * the 'prompt' which is accepted on the server side of the API is our input
       * and 'max_tokens' is The maximum number of tokens to generate
       *  in the completion. The token count of your prompt plus max_tokens cannot
       *  exceed the model's context length. Most models have a context length of
       * 2048 tokens (except for the newest models, which support 4096)
       */
      const payload = {
        prompt: input,
        max_tokens: 300,
      };
      /**
       * @options is where we send all our configuration which will be sent with the
       * request, it includes the method, which is either created, read, update or delete.
       * the headers, which usually are of  "Content-Type": "application/json".
       * some apps use Authorization such as this one. which is why we are using 'Authorization'
       * and passing the `Bearer ${token}`.
       * this request has a body because it is a POST request.
       */
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };
      /**
       * @response Initializing the response inside a constant, so then we can extract
       * the data from it using setResponse.
       */
      const responseFromOpenAI = await fetch(
        'https://api.openai.com/v1/engines/davinci/completions',
        options,
      );
      /**
       * @fetch requires us to transform the response data from json to text strings,
       * which explains the line of code below.
       */
      const json = await responseFromOpenAI.json();
      /**
       * @setResponse - storing the response (json) in 'response'
       */
      setResponse(json.choices[0].text);
      /**
       * @setLoading - at this point, the API has done its job, so we stop loading
       */
      setLoading(false);
      /**
       * @toast - updating the toast from 'Loading...' to -> 'Loading successful'
       */
      toast.update(id, 'Loading successful.\n\n300 token response generated.', {
        type: 'success',
        placement: 'center',
        duration: 4000,
      });
    } catch (error: any) {
      /**
       * @setLoading - if there is an ERROR - we STOP loading, because we
       * have recieved a response which is an error
       */
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = () => {
    /**
     * @setLoading - the API work beings, so Loading -> true
     */
    setLoading(true);
    /**
     * @setResponse - clear any previous response
     */
    setResponse('');
    /**
     * @setInput - clearing the input
     */
    setInput('');
    /**
     * @handleBusinessLogin - calling the function which does the API request
     */
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
      {/* <StatusBar translucent={false} backgroundColor="#128C7E" style="light" /> */}
      {/* if loading is true, we show the 'ShowApiBusy' function  */}
      {loading && ShowLoader()}
      {response && !loading ? (
        <ScrollView style={{marginBottom: 70}}>
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
        <Card mode="elevated" style={styles.card}>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
        }}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder="Enter text to complete"
          mode="outlined"
          activeOutlineColor="#128C7E"
          textColor="black"
          placeholderTextColor="silver"
        />
        <IconButton
          icon={loading ? 'close-circle' : 'send'}
          iconColor="white"
          containerColor="#128C7E"
          size={24}
          onPress={handleSubmit}
          mode="contained"
          style={{marginTop: 10, marginRight: 3}}
          disabled={loading || !input}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    padding: 5,
    backgroundColor: '#f7f7f8',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f8',
  },
  input: {
    width: '85%',
    marginBottom: 5,
    marginLeft: 5,
    backgroundColor: '#f7f7f8',
  },
  response: {
    color: 'black',
    marginVertical: 3,
    fontFamily: 'sans-serif-condensed',
    fontSize: 16,
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
  animation: {width: '100%', height: 50, aspectRatio: 0.5},
});

export default Davinci;
