import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState ,useRef} from "react";
import {Text,View,SafeAreaView,StatusBar,StyleSheet,TouchableOpacity, TextInput, Image,KeyboardAvoidingView, Platform,Alert,Keyboard } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Calendar from "../../assets/Images/Calendar.png"
import warning from "../../assets/Images/Alert.png"
import RepeatAll from "../../assets/Images/RepeatAll.png"
import Note from "../../assets/Images/Note.png"
import Glance from "../../assets/Images/Glance.png"
import Clock from "../../assets/Images/Clock.png"
import CalendarCheckmark from "../../assets/Images/CalendarCheckmark.png"
import { NativeBaseProvider,Modal,Menu,Pressable,Switch, ScrollView} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import axios from "axios";
const TaskDetailsScreen=()=>{
    const {todo,duration,email}=useRoute().params
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [repeatTaskVisible,setRepeatTaskVisible]=useState(false)
    const navigation=useNavigation()
    const [selectedRepeatOption, setSelectedRepeatOption] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [dailyRepeat,setDailyRepeat]=useState("1 Day")
    const [weeklyRepeat,setWeeklyRepeat]=useState("1 Week")
    const [monthlyRepeat,setMonthlyRepeat]=useState("1 Month")
    const [yearlyRepeat,setYearlyRepeat]=useState("1 Year")
    const [monthlyDayRepeat,setMonthlyDayRepeat]=useState("Day 1")
    const [scheduleTaskVisible,setScheduleTaskVisible]=useState(false)
    const [taskAlreadyScheduled,setTaskAlreadyScheduled]=useState(false)
    const [taskDescription,setTaskDescription]=useState(todo.description)
    const [taskSaved,setTaskSaved]=useState(false)
    const [loading,setLoading]=useState(false)

    const addTaskDescription = ()=>{ 
      Keyboard.dismiss()
      setLoading(true)
      axios.post('https://champagne-termite-fez.cyclic.app/addTaskDescription', { email: email, taskId:todo.taskId,description:taskDescription})
    .then(response => {
      if(response.data.message=="Task description updated successfully" ){
        setTaskSaved(true)
        setLoading(false)
      }
    })
    .catch(error => {
      setLoading(false)
      Alert.alert(`Error: ${error}`)
    });
  }


    const handleRepeatOptionPress = (option) => {
        setSelectedRepeatOption(option);
      };
    return(
        <NativeBaseProvider>        
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Task Details</Text>
          </View>
          <TouchableOpacity disabled={loading} onPress={()=>addTaskDescription()}>
          <AntDesign name="save" size={24} color={loading?"#BBD5FA":"#3584EF" }/>
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{flex:0.3,marginTop:20}}>
        <View style={{height:50,backgroundColor:"#F5F5F5",margin:15,justifyContent:"center",padding:10,borderRadius:10}}>
            <Text style={{fontSize:14,fontWeight:500}}>{todo.title}</Text>
        </View>


        <View style={{height:90,backgroundColor:"#F5F5F5",margin:15,justifyContent:"center",padding:10,borderRadius:10}}>
            <TextInput placeholder="Task Description" multiline={true} style={{flex:1}} placeholderTextColor={"#808080"}value={taskDescription} onChangeText={(text)=>setTaskDescription(text)}/>
        </View>
        </View>
        <View style={{flex:0.7,margin:15}}>
            <Text style={{fontSize:16,fontWeight:600,paddingBottom:10}}>Other Details</Text>

            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={Glance} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Category</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:"#E8F1FD",padding:10,alignItems:"center",justifyContent:"center",borderRadius:20,paddingHorizontal:15,paddingVertical:10}}>
                <Text>{todo.category}</Text>
            </TouchableOpacity>
            </View>

            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={Calendar} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Due Date</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:"#E8F1FD",paddingHorizontal:15,paddingVertical:10,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                <Text>{moment(new Date()).format('DD.MM.YYYY')}</Text>
            </TouchableOpacity>
            </View>

            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={Calendar} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Do Date</Text>
            </View>
            <TouchableOpacity>
            <Text style={{color:"#3584EF"}}>Add</Text>
            </TouchableOpacity>
            </View>


            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={Clock} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Time Required</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:"#E8F1FD",paddingHorizontal:15,paddingVertical:10,alignItems:"center",justifyContent:"center",borderRadius:20}}>
                <Text>{duration} hours</Text>
            </TouchableOpacity>
            </View>

            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={RepeatAll} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Repeat Task</Text>
            </View>
            <TouchableOpacity onPress={()=>setRepeatTaskVisible(true)}>
            <Text style={{color:"#3584EF"}}>Add</Text>
            </TouchableOpacity>
            </View>

            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={warning} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Reminder Task</Text>
            </View>
            <TouchableOpacity>
            <Text style={{color:"#3584EF"}}>Add</Text>
            </TouchableOpacity>
            </View>


            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
            <Image source={CalendarCheckmark} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Schedule Task</Text>
            </View>
            <Switch size="sm" onToggle={()=>setScheduleTaskVisible(true)} />
            </View>




            <View style={{borderBottomWidth:1,borderBottomColor:"#F5F5F5",flex:0.12,flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:0.95,flexDirection:"row",alignItems:"center"}}>
            <Image source={Note} style={{height:20,width:20}}/>
            <Text style={{padding:10}}>Notes</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("NotesScreen",{title:todo.title,taskId:todo.taskId,email:email})}>
            <Text style={{color:"#3584EF"}}>Add</Text>
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
            <Modal isOpen={repeatTaskVisible} onClose={() =>setRepeatTaskVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Repeat Task</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <TouchableOpacity onPress={() => handleRepeatOptionPress("daily")} style={[styles.repeatOption, selectedRepeatOption === "daily" && styles.selectedRepeatOption]}>
                    <Text style={[styles.repeatText, selectedRepeatOption === "daily" && styles.selectedRepeatText]}>Daily</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRepeatOptionPress("weekly")} style={[styles.repeatOption, selectedRepeatOption === "weekly" && styles.selectedRepeatOption]}>
                    <Text style={[styles.repeatText, selectedRepeatOption === "weekly" && styles.selectedRepeatText]}>Weekly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRepeatOptionPress("monthly")} style={[styles.repeatOption, selectedRepeatOption === "monthly" && styles.selectedRepeatOption]}>
                    <Text style={[styles.repeatText, selectedRepeatOption === "monthly" && styles.selectedRepeatText]}>Monthly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRepeatOptionPress("yearly")} style={[styles.repeatOption, selectedRepeatOption === "yearly" && styles.selectedRepeatOption]}>
                    <Text style={[styles.repeatText, selectedRepeatOption === "yearly" && styles.selectedRepeatText]}>Yearly</Text>
                  </TouchableOpacity>
                </View>


           {selectedRepeatOption=="daily"&&<View style={{flexDirection:"row",marginTop:40}}>
            <Text style={{flex:1}}>Repeat Every</Text>
            <Menu w="100" trigger={triggerProps => {
      return <Pressable accessibilityLabel="dailyRepetition" {...triggerProps}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{paddingHorizontal: 3,fontWeight:500 }}>{dailyRepeat}</Text>
                <AntDesign name="down" size={15} color="#808080" />
                </View>
            </Pressable>
    }}>
        <Menu.Item onPress={()=>setDailyRepeat("1 Day")}>1 Day</Menu.Item>
        <Menu.Item onPress={()=>setDailyRepeat("2 Days")}>2 Days</Menu.Item>
        <Menu.Item onPress={()=>setDailyRepeat("10 Days")}>10 Days</Menu.Item>
        <Menu.Item onPress={()=>setDailyRepeat("15 Days")}>15 Days</Menu.Item>
        <Menu.Item onPress={()=>setDailyRepeat("20 Days")}>20 Days</Menu.Item>
      </Menu>

            </View>}


            {selectedRepeatOption=="weekly"&&<View>           
            <View style={{flexDirection:"row",marginTop:40}}>
            <Text style={{flex:1}}>Repeat Every</Text>
            <Menu w="110" trigger={triggerProps => {
      return <Pressable accessibilityLabel="weeklyRepetition" {...triggerProps}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{paddingHorizontal: 3,fontWeight:500 }}>{weeklyRepeat}</Text>
                <AntDesign name="down" size={15} color="#808080" />
                </View>
            </Pressable>
    }}>
        <Menu.Item onPress={()=>setWeeklyRepeat("1 Week")}>1 Week</Menu.Item>
        <Menu.Item onPress={()=>setWeeklyRepeat("2 Weeks")}>2 Weeks</Menu.Item>
        <Menu.Item onPress={()=>setWeeklyRepeat("10 Weeks")}>10 Weeks</Menu.Item>
        <Menu.Item onPress={()=>setWeeklyRepeat("15 Weeks")}>15 Weeks</Menu.Item>
        <Menu.Item onPress={()=>setWeeklyRepeat("20 Weeks")}>20 Weeks</Menu.Item>
      </Menu>
            </View>

        <View style={{marginTop:30}}>
        <Text>Repeat on</Text>  
        <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Sun"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Sun")}>
                <Text style={{color:selectedDay=="Sun"?"white":"black"}}>S</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Mon"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Mon")}>
                <Text style={{color:selectedDay=="Mon"?"white":"black"}}>M</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Tue"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Tue")}>
                <Text style={{color:selectedDay=="Tue"?"white":"black"}}>T</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Wed"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Wed")}>
                <Text style={{color:selectedDay=="Wed"?"white":"black"}}>W</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Thu"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Thu")}>
                <Text style={{color:selectedDay=="Thu"?"white":"black"}}>T</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Fri"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Fri")}>
                <Text style={{color:selectedDay=="Fri"?"white":"black"}}>F</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{height:24,width:24,borderRadius:12,backgroundColor:selectedDay=="Sat"?"#3584EF":null,alignItems:"center",justifyContent:"center"}} onPress={()=>setSelectedDay("Sat")}>
                <Text style={{color:selectedDay=="Sat"?"white":"black"}}>S</Text>
            </TouchableOpacity>

        </View>
        </View>


            </View>
 }




            {selectedRepeatOption=="monthly"&&<View>
            <View style={{flexDirection:"row",marginTop:40}}>
            <Text style={{flex:1}}>Repeat Every</Text>
            <Menu w="120" trigger={triggerProps => {
      return <Pressable accessibilityLabel="dailyRepetition" {...triggerProps}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{paddingHorizontal: 3,fontWeight:500 }}>{monthlyRepeat}</Text>
                <AntDesign name="down" size={15} color="#808080" />
                </View>
            </Pressable>
    }}>
        <Menu.Item onPress={()=>setMonthlyRepeat("1 Month")}>1 Month</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyRepeat("2 Months")}>2 Months</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyRepeat("10 Months")}>10 Months</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyRepeat("15 Months")}>15 Months</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyRepeat("20 Months")}>20 Months</Menu.Item>
      </Menu>

            </View>
            
            <View style={{flexDirection:"row",marginTop:30}}>
            <Text style={{flex:1}}>Repeat on</Text>
            <Menu w="120" trigger={triggerProps => {
      return <Pressable accessibilityLabel="dailyRepetition" {...triggerProps}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{paddingHorizontal: 3,fontWeight:500 }}>{monthlyDayRepeat}</Text>
                <AntDesign name="down" size={15} color="#808080" />
                </View>
            </Pressable>
    }}>
        <Menu.Item onPress={()=>setMonthlyDayRepeat("Day 1")}>Day 1</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyDayRepeat("Day 2")}>Day 2</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyDayRepeat("Day 10")}>Day 10</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyDayRepeat("Day 15")}>Day 15</Menu.Item>
        <Menu.Item onPress={()=>setMonthlyDayRepeat("Day 20")}>Day 20</Menu.Item>
      </Menu>

            </View>
            </View> 
            }





            {selectedRepeatOption=="yearly"&&<View style={{flexDirection:"row",marginTop:40}}>
            <Text style={{flex:1}}>Repeat Every</Text>
            <Menu w="120" trigger={triggerProps => {
      return <Pressable accessibilityLabel="dailyRepetition" {...triggerProps}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{paddingHorizontal: 3,fontWeight:500 }}>{yearlyRepeat}</Text>
                <AntDesign name="down" size={15} color="#808080" />
                </View>
            </Pressable>
    }}>
        <Menu.Item onPress={()=>setYearlyRepeat("1 Year")}>1 Year</Menu.Item>
        <Menu.Item onPress={()=>setYearlyRepeat("2 Years")}>2 Years</Menu.Item>
        <Menu.Item onPress={()=>setYearlyRepeat("10 Years")}>10 Years</Menu.Item>
        <Menu.Item onPress={()=>setYearlyRepeat("15 Years")}>15 Years</Menu.Item>
        <Menu.Item onPress={()=>setYearlyRepeat("20 Years")}>20 Years</Menu.Item>
      </Menu>

            </View>}




            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => {setRepeatTaskVisible(false),setSelectedRepeatOption(null)}} style={{paddingHorizontal:15}}>
                <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                {selectedRepeatOption==null?
            <Text style={{ fontSize: 14, fontWeight: 600, color: "#BBD5FA" }}>Done</Text>:
                <TouchableOpacity onPress={()=>{setRepeatTaskVisible(false),setSelectedRepeatOption(null)}}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Done</Text> 
            </TouchableOpacity>
}
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={scheduleTaskVisible} onClose={() => setScheduleTaskVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Schedule Task</Text>
              <View style={styles.editCategoryModalContainer}>
                <Text>Your task will be scheduled in your Calendar</Text>
            </View>
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setScheduleTaskVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setScheduleTaskVisible(false),setTaskAlreadyScheduled(true)}}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Schedule</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>



        <Modal isOpen={taskAlreadyScheduled} onClose={() => setTaskAlreadyScheduled(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Schedule Task</Text>
              <View style={styles.editCategoryModalContainer}>
                <Text>Your task has already been scheduled :)</Text>
            </View>
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setTaskAlreadyScheduled(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>setTaskAlreadyScheduled(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Schedule</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={taskSaved} onClose={() => setTaskSaved(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Alert</Text>
              <View style={styles.editCategoryModalContainer}>
                <Text>Your task is saved successfully :)</Text>
            </View>
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setTaskSaved(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>



        
        </SafeAreaView>
        </NativeBaseProvider>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
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
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 0.99
    },
    backButton: {
        marginRight: 8,
    },
    modalHeader:{
        paddingBottom:"10%",
        fontSize:16,
        fontWeight:600
    },
    modalConfirmationOptionsContainer:{
        alignSelf:"flex-end",
        paddingTop:30,
        flexDirection:"row"
    },
    repeatOption: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#F5F5F5"
      },
      selectedRepeatOption: {
        backgroundColor: "#3584EF",
      },
      repeatText:{
        color:"black"
      },
      selectedRepeatText:{
        color:"white"
      },
      chosenDay:{
        backgroundColor:"#3584EF",
      }

})
export default TaskDetailsScreen