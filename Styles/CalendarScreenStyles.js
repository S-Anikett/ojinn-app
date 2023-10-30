import { StyleSheet } from 'react-native';
const CalendarScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    eventContainer1: {
      marginTop: 20,
      alignItems: 'center',
      paddingBottom: 350,
      alignItems:"center",
    },
    eventContainer2: {
      marginTop: 20,
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      top:200,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    eventContainerContent:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
      
    },
    eventContainerTitle:{ 
      fontSize: 16, 
      fontWeight: 600, 
      paddingHorizontal: '5%' 
    },
    selectedDateText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    eventText: {
      fontSize: 16,
      marginBottom: 5,
    },
    workingHoursContainer:{
      flex:0.8,
      flexGrow:1,
      backgroundColor:"red",
      paddingBottom:"4%",
      marginBottom:"7%",
      margin:"2%",
      backgroundColor:"#E96D711A",
      borderRadius:10,
    },
    workingHoursTitle:{ 
      fontSize: 16, 
      fontWeight: 600, 
      paddingTop: '5%',
      paddingLeft:"5%"
  
    }
    ,
    addButton: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'blue',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    addButtonText: {
      color: 'white',
      marginLeft: 5,
    },
    addTaskButton: {
      backgroundColor: '#3584EF',
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      position: 'absolute',
      bottom: 20,
      right: '6%',
      elevation: 10,
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
      }
  });
  
  export default CalendarScreenStyles
  