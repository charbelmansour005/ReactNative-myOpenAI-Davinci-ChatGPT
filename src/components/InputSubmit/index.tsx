import { styles } from "./styles"
import React, { Dispatch, SetStateAction } from "react"
import { IconButton, TextInput } from "react-native-paper"
import LottieView from "lottie-react-native"
import LinearGradient from "react-native-linear-gradient"

type Props = {
  input: string
  loading: boolean
  setInput: Dispatch<SetStateAction<string>>
  setBase: Dispatch<SetStateAction<string | null>>
  handleSubmit: () => void
}

const InputSubmit = ({
  handleSubmit,
  input,
  loading,
  setBase,
  setInput,
}: Props) => (
  // below view gives us the chat look
  <LinearGradient
    colors={["#40414f", "#40414f", "#343541", "#343541"]}
    style={styles.inputSubmitWrapper}
  >
    <TextInput
      style={{ width: loading ? "86%" : "85.5%", ...styles.input }}
      value={input}
      onChangeText={(text) => setInput(text)}
      mode="outlined"
      activeOutlineColor="gray"
      cursorColor={"white"}
      textColor="white"
      placeholderTextColor="gray"
      outlineColor="gray"
      disabled={loading}
    />
    <>
      {loading ? (
        <LottieView
          speed={1}
          style={{ height: 6, marginTop: "7%", marginLeft: "4.2%" }}
          source={require("../../assets/json/95076-loading-dots.json")}
          autoPlay={true}
          loop={true}
        />
      ) : (
        <IconButton
          icon={loading ? "clock-time-eight-outline" : "send"}
          iconColor="white"
          containerColor="#40414f"
          size={24}
          borderless={true}
          onPress={() => {
            setBase(input)
            handleSubmit()
          }}
          mode="contained"
          style={{ marginTop: 10, marginRight: 3 }}
          disabled={loading || !input}
        />
      )}
    </>
  </LinearGradient>
)

export default InputSubmit
