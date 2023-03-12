import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  dependencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    // paddingHorizontal: 24,
    backgroundColor: "#3e3f4b",
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "gray",
  },
  dependencyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginLeft: "2%",
  },
  dependencyVersion: {
    fontSize: 14,
    color: "#999999",
    marginRight: "2%",
  },
  card: {
    margin: 16,
    backgroundColor: "#3e3f4b",
  },
  divider: {
    marginVertical: 16,
  },
  avatar: {
    backgroundColor: "#1e88e5",
    marginRight: 16,
  },
  containerSheet: {
    flex: 1,
    padding: 24,
    backgroundColor: "#343541",
  },
  contentContainerSheet: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3e3f4b",
  },
})
