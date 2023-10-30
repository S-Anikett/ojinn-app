import { StyleSheet } from "react-native";
const To_DosScreenStyles = StyleSheet.create({
    topContainer:{
      marginHorizontal: 20, 
      marginTop:10,
      alignItems: "center"
    },
    welcomeContainer:{
      alignSelf: "flex-start", 
      paddingTop: 20,
      paddingBottom:50
    },
    userNameText:{
      color: "#E2B0FF", 
      fontSize: 18, 
      fontWeight: 600
    },
    welcomeText:{
      fontSize: 14, 
      fontWeight: 500
    },
    taskContainer:{
      paddingHorizontal:10,
      flexDirection:"row",
      alignItems:"center"
    },
    searchContainer:{
      paddingHorizontal: 15,
      paddingVertical: 7,
      marginTop:15,
      alignSelf:"center",
      flexDirection:"row",
      alignItems:"center"
    },
    dotActive: {
      margin: 3,
      color: "#3584EF",
    },
    dotInactive: {
      margin: 3,
      color: "#F5F5F5",
    },
    taskCategoriesContainer: {
      flexDirection: "row",
    },
    button: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      margin: 5,
      backgroundColor: "#F5F5F5",
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 12,
    },
    expandedView: {
      paddingHorizontal: 20,
      overflow: "hidden",
    },
    addTaskButton: {
      backgroundColor: "#3584EF",
      height: 60,
      width: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      position: "absolute",
      bottom: 20,
      right: "6%",
      elevation: 10,
    },
    rowBack: {
      height: 40,
      marginVertical: 12,
      flexDirection:"row",
      alignSelf:"center",
      flex:1,
      borderRadius:10,
      backgroundColor:"#F5F5F5"
    },
    
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 54,
      borderTopRightRadius:10,
      borderBottomRightRadius:10
  
    },
    backRightBtnRight: {
      backgroundColor: '#FF5F38',
      alignSelf:"center",
      right: 0,
    },
    backTextWhite: {
      color: 'white',
    },
    selectButton: {
      position: 'absolute',
      right: 54,
      justifyContent: 'center',
      paddingHorizontal: 15,
      height: '100%',
      backgroundColor: '#569AFF',
      width:54,
    },
    selectButtonText: {
      color: 'white',
    },
    tasksCollapsableContainer:{
      flexDirection: "row", 
      alignItems: "center", 
      marginTop: 10,
    },
    collapsableContainerText:{
      fontSize: 16, 
      fontWeight: 600, 
      marginHorizontal: "5%"
    },
    modalConfirmationText:{
      paddingBottom:"10%",
      fontSize:16,
      fontWeight:600
    },
    modalConfirmationOptionsContainer:{
      flexDirection:"row",
      alignSelf:"flex-end",
      paddingTop:20
    },
    modalTitle:{ 
      paddingBottom: '10%', 
      fontSize: 16, 
      fontWeight: 600 
    },
    modalContainer:{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 10 
    },
    modalTextInputContainer:{
      padding: 5,
      flexDirection: 'row',
      flex: 1,
      backgroundColor: '#F5F5F5',
      borderRadius: 5,
      alignItems: 'center',
    },
    menuContainer:{ 
      flexDirection: 'row', 
      paddingVertical: 15 
    },
    addCategoryButton:{
       width: 108, 
       height: 32, 
       backgroundColor: '#F5F5F5', 
       flexDirection: 'row', 
       alignItems: 'center', 
       justifyContent: 'center', 
       marginRight: 10, 
       borderRadius: 20,
       height:40 
      },
      dueDateContainer:{ 
        width: 108, 
        height: 32, 
        backgroundColor: '#F5F5F5', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 20,
        height:40 
      },
      doneButton:{ 
        padding: 8, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#3584EF' 
      }
  });
  export default To_DosScreenStyles