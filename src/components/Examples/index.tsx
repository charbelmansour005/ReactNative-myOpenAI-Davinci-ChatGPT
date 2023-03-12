import { Image, Pressable, Text, View } from "react-native"
import React, { Dispatch, SetStateAction } from "react"
import { Card } from "react-native-paper"
import Chat from "../../assets/sun.png"
import { Suggestions } from "../../helpers/suggestions"
import { styles } from "./styles"
import LinearGradient from "react-native-linear-gradient"

type Props = {
  setInput: Dispatch<SetStateAction<string>>
}

const Examples = ({ setInput }: Props) => {
  return (
    <LinearGradient
      colors={["#128C7E", "#343541", "#343541", "#343541", "#343541"]}
      style={styles.exampleWrapper}
    >
      <Card mode="elevated" style={styles.card}>
        <View style={styles.sonWrapper}>
          <Image source={Chat} style={styles.image} />
          <Text
            style={{
              textAlign: "center",
              ...styles.response,
            }}
          >
            Examples
          </Text>
        </View>
        <View style={{ marginBottom: "5%" }}>
          {Suggestions.map((suggestion) => (
            <Pressable
              key={suggestion.key}
              style={styles.pressable}
              android_ripple={{
                color: "white",
                borderless: true,
                radius: 25,
                foreground: false,
              }}
              onPress={() => setInput(suggestion.value)}
            >
              <Text style={styles.example}>{suggestion.value}</Text>
            </Pressable>
          ))}
        </View>
      </Card>
    </LinearGradient>
  )
}

export default Examples
