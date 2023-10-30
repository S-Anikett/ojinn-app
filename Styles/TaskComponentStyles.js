import { StyleSheet } from "react-native";
const TaskComponentStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#F5F5F5",
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginVertical: 10,
      backgroundColor:"white"
    },
    colorBar: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      borderTopLeftRadius:15,
      borderBottomLeftRadius:15,
      width: "4%",
    },
    taskText: {
      fontWeight: "500",
      fontSize: 14,
      marginLeft: "1.5%",
      paddingHorizontal:10,
      flex: 1,
    },
  });
  export default TaskComponentStyles