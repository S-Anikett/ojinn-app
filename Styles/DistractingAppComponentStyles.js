import { StyleSheet } from "react-native";
const DistractingAppComponentStyles = StyleSheet.create({
    container: {
      width: "100%",
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: "#F5F5F5",
      marginHorizontal: "5%",
      flexDirection: "row",
      alignItems: "center",
    },
    appInfo: {
      flexDirection: "row",
      flex: 0.9,
      alignItems: "center",
    },
    appImage: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    appName: {
      marginLeft: "5%",
      fontWeight: "500",
      fontSize: 14,
    },
  });
  export default DistractingAppComponentStyles