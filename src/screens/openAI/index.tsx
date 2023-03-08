import React, {useState} from 'react';
import {View, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#ffffff'} barStyle="dark-content" />
      {isLoading && Loading()}
      <FlatList
        data={sentMessagesAndResponses}
        keyExtractor={(item: Message) =>
          `${Math.random()}+${item.timestamp ? item.timestamp.getTime() : ''}`
        } // use timestamp property as part of the key
        renderItem={({item}: {item: Message}) => (
          <View
            style={{
              backgroundColor: item.role === 'user' ? '#e6e6e6' : '#2f95dc',
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}>
            <Text style={{color: item.role === 'user' ? '#333' : '#fff'}}>
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
          <Divider />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#28a47c',
                borderRadius: 2,
                marginHorizontal: 20,
              }}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setInput('');
              }}>
              <Text style={{color: 'white'}}>Clear</Text>
            </Pressable>
            <Pressable
              style={{
                padding: 8,
                backgroundColor: '#28a47c',
                borderRadius: 2,
                marginHorizontal: 20,
              }}
              android_ripple={{color: 'white'}}
              onPress={() => {
                setInput(base);
                setBase(input);
                handleSendMessage();
              }}>
              <Text style={{color: 'white'}}>Regenerate response</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      {sentMessagesAndResponses.length === 0 && !isLoading && <Examples setInput={setInput} />}
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
