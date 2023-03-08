import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Chat from '../../assets/chat.png';
import {CONTANTS} from '../../helpers/api';
import {StatusBar} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

import {Examples, InputSubmit, Loading} from '../../components';
import {useMutation} from '@tanstack/react-query';
import {sendMessage, sentDataModel} from '../../helpers/sendMessage';

export type Message = {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
};

interface ErrorResponseMessage {
  response: {data: {error: {message: string}}};
}

const OpenAI = () => {
  const toast = useToast();
  const [input, setInput] = useState('');
  const [sentMessagesAndResponses, setSentMessagesAndResponses] = useState<
    Message[]
  >([]);
  const [base, setBase] = useState<any>(null);

  const {mutate, isLoading} = useMutation({
    mutationFn: ({messages, model}: sentDataModel) =>
      sendMessage({messages, model}),
    onSuccess: async response => {
      setSentMessagesAndResponses(prevSentMessagesAndResponses => [
        ...prevSentMessagesAndResponses,
        response.choices[0].message,
      ]);
    },
    onError: (error: ErrorResponseMessage) => {
      toast.show(
        (error as ErrorResponseMessage)?.response?.data?.error?.message,
        CONTANTS.toastOptions,
      );
    },
  });

  const handleSendMessage = () => {
    if (!input) return;
    const message = {
      id: new Date().toISOString(),
      role: 'user',
      content: input,
      timestamp: new Date(), // add timestamp property
    };
    setSentMessagesAndResponses(prevSentMessagesAndResponses => [
      ...prevSentMessagesAndResponses,
      message,
    ]);
    mutate({
      model: CONTANTS.openAiModel,
      messages: [{content: input, role: 'user'}],
    });
    setInput('');
  };

  const handleRegenerateResponse = () => {
    setInput(base);
    setBase(input);
    handleSendMessage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#343541'} barStyle="light-content" />
      {isLoading && Loading()}
      <FlatList
        data={sentMessagesAndResponses}
        keyExtractor={(item: Message) =>
          `${Math.random()}+${item.timestamp ? item.timestamp.getTime() : ''}`
        } // use timestamp property as part of the key
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: Message}) => (
          <View
            style={{
              backgroundColor: item.role === 'user' ? '#343541' : '#444654',
              padding: 0,
              borderRadius: 0,
              margin: 0,
              borderBottomColor: '#202123',
              borderBottomWidth: 1,
            }}>
            <>
              {item.role !== 'user' ? (
                <Image source={Chat} style={styles.image} />
              ) : null}
            </>
            <Text
              style={{
                color: item.role === 'user' ? '#fff' : '#fff',
                marginLeft: '1%',
                marginRight: '2%',
                marginBottom: '4%',
                paddingHorizontal: '2%',
                marginTop: item.role === 'user' ? '4%' : '2%',
              }}>
              {item.content}
            </Text>
          </View>
        )}
      />
      {sentMessagesAndResponses.length > 1 && !isLoading ? (
        <View style={{marginBottom: 80}}>
          {/* <Divider style={{height: 0.5}} /> */}
          {/* <Text selectable style={styles.baseFont}>
            You: {base}
          </Text>
          <Divider style={{height: 0.5}} /> */}
          {/* <Image source={Chat} style={styles.image} /> */}
          {/* <Text selectable style={styles.response}>
            {response}
          </Text> */}
          {/* <Divider /> */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              marginTop: '6%',
              marginBottom: '2%',
              width: '100%',
            }}>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#343541',
                borderRadius: 2,
                borderColor: '#848590',
                borderWidth: 1,
              }}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setSentMessagesAndResponses([]);
              }}>
              <Text style={{color: 'white'}}>Clear</Text>
            </Pressable>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#343541',
                borderRadius: 2,
                // marginHorizontal: 20,
                borderColor: '#848590',
                borderWidth: 1,
              }}
              android_ripple={{
                color: 'white',
                borderless: true,
                radius: 25,
                foreground: false,
              }}
              onPress={handleRegenerateResponse}>
              <Text style={{color: 'white'}}>Regenerate response</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      {sentMessagesAndResponses.length === 0 && !isLoading && (
        <Examples setInput={setInput} />
      )}
      <InputSubmit
        input={input}
        setInput={setInput}
        loading={isLoading}
        setBase={setBase}
        handleSubmit={handleSendMessage}
      />
    </SafeAreaView>
  );
};

export default OpenAI;
