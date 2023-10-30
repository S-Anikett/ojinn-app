import { StyleSheet } from "react-native";
const AddContactsScreenStyles = StyleSheet.create({
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
      fontWeight: "500",
    },
    searchSelected:{
      flexDirection: "row", 
      alignItems: "center", 
      flex: 1, 
      justifyContent: "center" 
    },
    searchContent:{
      padding: 8,
      flexDirection: "row",
      width: "95%",
      backgroundColor: "#d9dbda",
      borderRadius: 10,
      alignItems: "center",
    },
    searchNotSelected:{ 
      flexDirection: "row", 
      alignItems: "center", 
      flex: 0.99 
    },
    backButton: {
      marginRight: 8,
    },
    selectAllButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    selectAllButtonText: {
      marginLeft: 4,
      fontSize: 16,
      fontWeight: "bold",
    },
    createContactButton: {
      backgroundColor: "#3584EF",
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      position: "absolute",
      bottom: 40,
      right: "6%",
      elevation: 10,
    },
    createContactIcon: {
      height: 24,
      width: 24,
    },
  });
export default AddContactsScreenStyles
  