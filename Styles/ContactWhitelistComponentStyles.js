import { StyleSheet } from "react-native"
const ContactWhitelistComponentStyles=StyleSheet.create({
    container:{
      borderBottomWidth: 1,
      borderColor: "#F5F5F5",
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: "5%"
    },
    image:{
      
        height: 48,
        width: 48,
        borderRadius: 24,
        marginRight: "3%",
      
    },
    name:{
      fontSize: 14, 
      fontWeight: 500
    },
    number:{
        fontWeight: 400,
        fontSize: 12,
        color: "#808080",
    }
  
  })
  export default ContactWhitelistComponentStyles