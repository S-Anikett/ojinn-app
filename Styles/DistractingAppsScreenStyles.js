import { StyleSheet } from "react-native";
const DistractingAppsScreenStyles = StyleSheet.create({
        container:{
            flex: 1, 
            backgroundColor: "white"
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ECECEC",
        },
        headerTitle: {
          fontSize: 18,
          fontWeight: 500,
        },
        backButton: {
          marginRight: 8,
        },
        selectdeselectAllButton: {
          flexDirection: "row",
          alignItems: "center",
        },
        selectAllButtonText: {
          marginLeft: 4,
          fontSize: 16,
          fontWeight: "bold",
        },
      });
      
  
export default DistractingAppsScreenStyles