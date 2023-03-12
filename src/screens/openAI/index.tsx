import React, { useLayoutEffect, useRef, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  Image,
} from "react-native"
import { IconButton } from "react-native-paper"
import { styles } from "./styles"
import { CONTANTS } from "../../services/api"
import Chat from "../../assets/chat.png"
import { StatusBar } from "react-native"
import { useToast } from "react-native-toast-notifications"
import {
  Examples,
  InputSubmit,
  MessagesAndResponsesItem,
} from "../../components"
import { useMutation } from "@tanstack/react-query"
import { sendMessage, sentDataModel } from "../../services/sendMessage"
import LottieView from "lottie-react-native"
import { Message, MyScreenProps, ErrorResponseMessage } from "./types"

const OpenAI = ({ navigation }: MyScreenProps) => {
  const flatListRef = useRef<FlatList>(null)
  const toast = useToast()
  const [input, setInput] = useState("")
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
  const [prevContentVerticalOffset, setPrevContentVerticalOffset] = useState(0)
  const [sentMessagesAndResponses, setSentMessagesAndResponses] = useState<
    Message[]
  >([])
  const [base, setBase] = useState<string | null>(null)

  const { data, mutate, isLoading } = useMutation({
    mutationFn: ({ messages, model }: sentDataModel) =>
      sendMessage({ messages, model }),
    onSuccess: async (response) =>
      setSentMessagesAndResponses((prevSentMessagesAndResponses) => [
        ...prevSentMessagesAndResponses,
        response.choices[0].message,
      ]),
    onError: (error: ErrorResponseMessage) =>
      toast.show(
        error?.response?.data?.error?.message || error.message,
        CONTANTS.toastOptions
      ),
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerStyle: {
        backgroundColor: "#343541",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal",
        fontSize: 17,
      },
      headerLeft: () => (
        <IconButton
          icon={"menu-right-outline"}
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
            marginRight: "5%",
          }}
        />
      ),
    })
  })

  useLayoutEffect(() => {
    if (flatListRef.current && data) {
      flatListRef.current.scrollToEnd()
      setPrevContentVerticalOffset(contentVerticalOffset)
    }
  }, [data])

  const handleScrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }

  const handleSendMessage = () => {
    if (!input) return
    const message = {
      id: new Date().toISOString(),
      role: CONTANTS.role.user,
      content: input,
      timestamp: new Date(), // add timestamp property
    }
    setSentMessagesAndResponses((prevSentMessagesAndResponses) => [
      ...prevSentMessagesAndResponses,
      message,
    ])
    mutate({
      model: CONTANTS.openAiModel,
      messages: [{ content: input, role: CONTANTS.role.user }],
    })
    setInput("")
  }

  const handleRegenerateResponse = () => {
    setInput(base!)
    setBase(input)
    handleSendMessage()
  }

  const showLoader = () => (
    <View style={styles.center}>
      <LottieView
        speed={5.5}
        style={styles.animation}
        source={require("../../assets/json/customLoader.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  )

  return (
    <SafeAreaView
      style={{
        ...styles.container,
      }}
    >
      <StatusBar backgroundColor={"#343541"} barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        onScroll={(e) =>
          setContentVerticalOffset(e.nativeEvent.contentOffset.y)
        }
        overScrollMode={"never"}
        data={sentMessagesAndResponses}
        keyExtractor={({ timestamp }: Message) =>
          `${Math.random()}+${timestamp ? timestamp.getTime() : ""}`
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {sentMessagesAndResponses.length !== 0 && !isLoading ? (
              <View style={styles.footerWrapper}>
                <Pressable
                  disabled={isLoading}
                  style={styles.clearBtn}
                  android_ripple={{
                    color: "white",
                    borderless: true,
                    radius: 25,
                    foreground: false,
                  }}
                  onPress={() => {
                    setSentMessagesAndResponses([])
                  }}
                >
                  <Text style={{ color: "white" }}>Clear</Text>
                </Pressable>
                <Pressable
                  disabled={isLoading}
                  style={styles.regenRespBtn}
                  android_ripple={{
                    color: "white",
                    borderless: true,
                    radius: 25,
                    foreground: false,
                  }}
                  onPress={handleRegenerateResponse}
                >
                  <Text style={{ color: "white" }}>Regenerate response</Text>
                </Pressable>
              </View>
            ) : null}
          </>
        }
        renderItem={({ item }: { item: Message }) => (
          <MessagesAndResponsesItem item={item} />
        )}
      />
      {isLoading && showLoader()}

      {contentVerticalOffset < prevContentVerticalOffset &&
        sentMessagesAndResponses.length !== 0 && (
          <View style={styles.scrollToEndWrapper}>
            <IconButton
              onPress={handleScrollToEnd}
              icon="arrow-down-drop-circle"
              iconColor="silver"
              style={{ width: "95%" }}
            />
          </View>
        )}
      {sentMessagesAndResponses.length > 1 && !isLoading ? (
        <View style={{ marginBottom: 80 }}></View>
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
  )
}

export default OpenAI
