import React, {useLayoutEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {styles} from './styles';
import {CONTANTS} from '../../helpers/api';
import {StatusBar} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

import {Examples, InputSubmit, Loading} from '../../components';
import {useMutation} from '@tanstack/react-query';
import {sendMessage, sentDataModel} from '../../helpers/sendMessage';
import MessagesAndResponsesItem from '../../components/OpenAi/MessagesAndResponsesItem';

export type Message = {
  id: string;
  role: string;
  content: string;
  timestamp: Date;
};

interface ErrorResponseMessage extends Error {
  response: {data: {error: {message: string}}};
}

const OpenAI = () => {
  const flatListRef = useRef<FlatList>(null);
  const toast = useToast();
  const [input, setInput] = useState('');
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const [prevContentVerticalOffset, setPrevContentVerticalOffset] = useState(0);
  const [sentMessagesAndResponses, setSentMessagesAndResponses] = useState<
    Message[]
  >([]);
  const [base, setBase] = useState<string | null>(null);

  const {data, mutate, isLoading} = useMutation({
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
        error?.response?.data?.error?.message || error.message,
        CONTANTS.toastOptions,
      );
    },
  });

  useLayoutEffect(() => {
    if (flatListRef.current && data) {
      flatListRef.current.scrollToEnd();
      setPrevContentVerticalOffset(contentVerticalOffset);
    }
  }, [data]);

  const handleScrollToEnd = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const handleSendMessage = () => {
    if (!input) return;
    const message = {
      id: new Date().toISOString(),
      role: CONTANTS.role.user,
      content: input,
      timestamp: new Date(), // add timestamp property
    };
    setSentMessagesAndResponses(prevSentMessagesAndResponses => [
      ...prevSentMessagesAndResponses,
      message,
    ]);
    mutate({
      model: CONTANTS.openAiModel,
      messages: [{content: input, role: CONTANTS.role.user}],
    });
    setInput('');
  };

  const handleRegenerateResponse = () => {
    setInput(base!);
    setBase(input);
    handleSendMessage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#343541'} barStyle="light-content" />
      {isLoading && Loading()}
      <FlatList
        ref={flatListRef}
        onScroll={e => setContentVerticalOffset(e.nativeEvent.contentOffset.y)}
        data={sentMessagesAndResponses}
        keyExtractor={({timestamp}: Message) =>
          `${Math.random()}+${timestamp ? timestamp.getTime() : ''}`
        } // use timestamp property as part of the key
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: Message}) => (
          <MessagesAndResponsesItem item={item} />
        )}
      />
      {contentVerticalOffset < prevContentVerticalOffset && (
        <View style={{width: '100%'}}>
          <IconButton
            onPress={handleScrollToEnd}
            icon="arrow-down-drop-circle"
            style={{width: '90%'}}
          />
        </View>
      )}
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
