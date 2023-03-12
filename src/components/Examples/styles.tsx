import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  pressable: {
    padding: 5,
    backgroundColor: "#343541",
    borderRadius: 2,
    margin: "2%",
    borderColor: "gray",
    borderWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  card: {
    borderRadius: 5,
    backgroundColor: "#343541",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  response: {
    color: "#fff",
    marginBottom: "10%",
  },
  example: {
    color: "#fff",
    padding: 2,
    textAlign: "center",
  },
  exampleWrapper: { height: "100%", width: "100%", marginTop: "0%" },
  sonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
})
