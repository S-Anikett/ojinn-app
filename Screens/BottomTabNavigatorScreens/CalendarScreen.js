import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, SafeAreaView, StatusBar, TextInput, Image, Keyboard, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider, Modal, Menu, Pressable, useSafeArea,Spinner } from 'native-base';
import DueDate from '../../assets/Images/DueDate.png';
import Categories from '../../assets/Images/Categories.png';
import Task from '../../Components/Task';
import WorkingHours from '../../Components/WorkingHours';
import Hours from '../../Hours';
import CalendarScreenStyles from '../../Styles/CalendarScreenStyles';
import { Entypo } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from "axios"
import { AuthContext } from "../../navigation/AuthProvider"
import OTPInput from '../../Components/OtpInput';
import TasksLoader from '../../Components/TasksLoader';
import WorkingHoursLoader from '../../Components/WorkingHoursLoader';
import No_Task from "../../assets/Images/No_Task.png"

      const currentT = new Date();
      const currentHour = currentT.getHours();
      const currentMinute = currentT.getMinutes();

      function getCurrentDate() {
        const currentDate = new Date();
        const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        return formattedDate;
      }
      const currentDate=getCurrentDate()
      const currentTime=`${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}
export default function CalendarScreen({navigation}) {
  const [syncVisible, setSyncVisible] = useState(false)
  const isKeyboardOpen = useKeyboard();
  const {syncedEmail,setSyncedEmail}=useContext(AuthContext)
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('MM/DD/YYYY'));
  const [expand, setExpand] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [autoScheduleVisible, setAutoScheduleVisible] = useState(false)
  const [category, setCategory] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [overlapAlertVisible, setOverlapAlertVisible] = useState(false)
  const [overlapErrorVisible, setOverlapErrorVisible] = useState(false)
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [dueDate, selectedDueDate] = useState();
  const [selectDuration, setSelectDurationVisible] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isAvailableTimePickerVisible, setAvailableTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [availableTime, setAvailableTime] = useState()
  const [viewedDate, setViewedDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [otpVisible, setOtpVisible] = useState(false)
  const [accountEmailSynced,setAccountEmailSynced]=useState("")
  const [otpValue, setOtpValue] = useState('');
  const [emailOTP,setEmailOTP]=useState("")
  const isSubmitDisabled = otpValue.length !== 4
  const isButtonDisabled = !title || !category || !startTime || !endTime||!dueDate
  const issubmitEmailDisabled = !accountEmailSynced
  const [updateDate,setUpdateDate]=useState(null);
  const [loading,setLoading]=useState(false)
  const [start,setStart]=useState(new Date())
  const[hour,setHour]=useState()
  const [minute,setMinute]=useState()
  const [availableHour,setAvailableHour]=useState()
  const [availableMinute,setAvailableMinute]=useState()
  const [createCategoryVisible,setCreateCategoryVisible]=useState(false)
  const [modalCategory,setModalCategory]=useState("")
  const[syncLoading,setSyncLoading]=useState(false)
console.log(syncedEmail)
function formatSchedule(minutes, hours, date, month) {
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedDate = date.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  return `${formattedMinutes} ${formattedHours} ${formattedDate} ${formattedMonth} *`;
}

const scheduleEmailNotification = (time, startt, endt) => {
  console.log(time)
  console.log("called");
  const startD = new Date(new Date(viewedDate).getFullYear(), new Date(viewedDate).getMonth(), new Date(viewedDate).getDate(), startt, endt);
  const endD = new Date(start.getFullYear(), start.getMonth(), start.getDate(), startt, endt);

  while (startD <= endD) {
    const minutes = startD.getMinutes();
    const hours = startD.getHours();
    const date = startD.getDate();
    const month = startD.getMonth() + 1;

    const schedule = formatSchedule(minutes, hours, date, month);
    console.log(schedule);
    axios
      .post("http://13.238.155.40:7001/schedule", {
        email: syncedEmail,
        schedule: schedule,
        title:title,
        time:time
      })
      .then((response) => console.log(response.data.message))
      .catch((error) => console.log(error));

    startD.setDate(startD.getDate() + 1);
  }
};
  const handleOtpChange = (value) => {
    setOtpValue(value);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  const showAvailableTimePicker = () => {
    setAvailableTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };
  const hideAvailableTimePicker = () => {
    setAvailableTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("MM/DD/YYYY")
    selectedDueDate(formattedDate)
    hideDatePicker();
    setStart(date)
    setSelectDurationVisible(true)
  };

  const handleStartTimeConfirm = (StartTime) => {
    const formattedTime = moment(StartTime).format("HH:mm");
    setStartTime(formattedTime);
    hideStartTimePicker();
    setHour(moment(formattedTime, "HH:mm").hour())
    setMinute(moment(formattedTime, "HH:mm").minute())
  };

  const handleEndTimeConfirm = (EndTime) => {
    const formattedTime = moment(EndTime).format("HH:mm");
    setEndTime(formattedTime);
    hideEndTimePicker();
  };
  const handleAvailableTimeConfirm = (AvailableTime) => {
    const formattedTime = moment(AvailableTime).format("HH:mm");
    setAvailableTime(formattedTime);
    hideAvailableTimePicker();
    setAvailableHour(moment(formattedTime, "HH:mm").hour())
    setAvailableMinute(moment(formattedTime, "HH:mm").minute())
  };
  const handleDayPress = (day) => {
    setViewedDate(day.dateString);
    const selectedDate = moment(day.dateString).format('MM/DD/YYYY');
    setSelectedDate(selectedDate);
  };
  const toggleExpand = () => {
    if (expand == true) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  const addTask = () => {
    setShowModal(false);
    setLoading(true)
    axios
      .post('https://champagne-termite-fez.cyclic.app/getCategories', { email: syncedEmail })
      .then(categoryResponse => {
        const categories = categoryResponse.data.categories;
        const defaultColor = '#3584EF';
  
        const foundCategory = categories.find(cat => cat.category === category);
        const color = foundCategory ? foundCategory.color : defaultColor;
        axios
          .post('https://champagne-termite-fez.cyclic.app/addTask', {
            email: syncedEmail,
            title: title,
            category: category,
            start: startTime,
            end: endTime,
            dueDate: dueDate,
            createdAt: selectedDate,
            color: color
          })
          .then(response => {
            console.log(response.data);
            if (response.data.message === 'New task overlaps with previously added tasks') {
              setLoading(false)
              setOverlapAlertVisible(true);
            } else {
              axios
                .post('https://champagne-termite-fez.cyclic.app/getTasks', { email: syncedEmail, selectedDate: selectedDate })
                .then(response => {
                  setTasks(response.data);
                  scheduleEmailNotification(startTime,hour,minute)
                  setLoading(false)
                  setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
                  
                })
                .catch(error => {
                  console.error(error);
                  setLoading(false)
                  setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
                });
            }
          })
          .catch(error => {
            Alert.alert("Something Went Wrong");
            setLoading(false)
            setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
          });
      })
      .catch(error => {
        console.log(error);
        setLoading(false)
      });
  };
  useEffect(() => {
    setLoading(true)
    axios.post('https://champagne-termite-fez.cyclic.app/getTasks', { email:syncedEmail, selectedDate: selectedDate })
      .then(response => {
        setTasks(response.data) 
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, [selectedDate])
  useEffect(() => {
    setLoading(true)
    const unsubscribe = navigation.addListener('focus', () => {
    setTasks(null)
    console.log(syncedEmail)
    setViewedDate(moment(new Date()).format('YYYY-MM-DD'))
    setSelectedDate(moment(new Date()).format('MM/DD/YYYY'))
     axios.post('https://champagne-termite-fez.cyclic.app/getTasks', { email:syncedEmail, selectedDate:moment(new Date()).format('MM/DD/YYYY')})
      .then(response => {
        console.log(syncedEmail,response.data)
        setTasks(response.data) 
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
    });
    return () => {
      unsubscribe();
    };
  }, [navigation,syncedEmail]);
  
  
  const handleOverlap = () => {
    setLoading(true)
  axios
    .post('https://champagne-termite-fez.cyclic.app/getCategories', { email: syncedEmail })
    .then(categoryResponse => {
      const categories = categoryResponse.data.categories;
      const defaultColor = '#3584EF'; 

      const foundCategory = categories.find(cat => cat.category === category);
      const color = foundCategory ? foundCategory.color : defaultColor;

      axios
        .post('https://champagne-termite-fez.cyclic.app/overlappingSchedule', {
          email: syncedEmail,
          title: title,
          category: category,
          start: startTime,
          end: endTime,
          scheduledStart: availableTime,
          dueDate: dueDate,
          createdAt: selectedDate,
          color: color
        })
        .then(response => {
          setOverlapErrorVisible(false);
          setShowModal(false);
          const endAvailableTime=response.data.endTime
          axios
            .post('https://champagne-termite-fez.cyclic.app/getTasks', { email: syncedEmail, selectedDate: selectedDate })
            .then(response => {
              setTasks(response.data);
              scheduleEmailNotification(availableTime,availableHour,availableMinute)
              setLoading(false)
            })
            .catch(error => {
              console.error(error);
              setLoading(false)
            });
            setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
        
          })
        .catch(error => {
          Alert(error);
          setLoading(false)
          setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
        });
    })
    .catch(error => {
      console.log(error);
      setLoading(false)
    });
};

 const handleOTPSubmit=()=>{
  setLoading(true)
      if(otpValue==emailOTP){
        setOtpValue("")
        Alert.alert("Verification Successful!")
        setSyncedEmail(accountEmailSynced)
        setOtpVisible(false)
        axios.post('https://champagne-termite-fez.cyclic.app/getTasks', { email:accountEmailSynced, selectedDate: selectedDate })
      .then(response => {
        setTasks(response.data) 
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
      }
      else{
        setLoading(false)
        Alert.alert("Invalid Verification Code")
        setOtpValue("")
      }
 }
 const handleAutoSchedule = () => {
  setLoading(true)
  axios
    .post('https://champagne-termite-fez.cyclic.app/getCategories', { email: syncedEmail })
    .then(categoryResponse => {
      const categories = categoryResponse.data.categories;
      const defaultColor = '#3584EF'; 

      const foundCategory = categories.find(cat => cat.category === category);
      const color = foundCategory ? foundCategory.color : defaultColor;

      axios
        .post('https://champagne-termite-fez.cyclic.app/autoSchedule', {
          email: syncedEmail,
          title: title,
          category: category,
          startSchedule: startTime,
          endSchedule: endTime,
          dueDate: dueDate,
          createdAt: selectedDate,
          currentTime:currentTime,
          currentDate:currentDate,
          color: color
        })
        .then(response => {
          if(response.data.message=="Error adding Task"){
            Alert.alert("Error adding Task")
            setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
          }
          else if(response.data.message=="No available slot found for scheduling"){
            Alert.alert("No available slot found for scheduling")
            setAutoScheduleVisible(false);
            setLoading(false)
            setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
          }
          else{
            const [h,m]=response.data.startTime.split(':')
          setAutoScheduleVisible(false);
          setShowModal(false);
          axios
            .post('https://champagne-termite-fez.cyclic.app/getTasks', { email: syncedEmail, selectedDate: selectedDate })
            .then(response => {
              setTasks(response.data);
              setLoading(false)
            })
            .catch(error => {
              console.error(error);
              setLoading(false)
            });
            scheduleEmailNotification(response.data.startTime,h,m)
            setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
          }
        })
        .catch(error => {
          setAutoScheduleVisible(false);
          setLoading(false)
          console.log(error);
          setTitle("")
                  setCategory("")
                  setStartTime("")
                  setEndTime("")
                  selectedDueDate("")
        });
    })
    .catch(error => {
      console.log(error);
      setLoading(false)
    });
};

  const handleSyncEmail = async () => {
    setSyncLoading(true)
    try {
      const response = await axios.post('https://champagne-termite-fez.cyclic.app/syncEmail', { email:accountEmailSynced });
      if(response.data.message=="Entered Email is either invalid or not registered with Ojinn")
      {
        Alert.alert(response.data.message)
        setSyncLoading(false)
        setAccountEmailSynced("")
      }
      else{
      setEmailOTP(response.data.verificationCode)
      setSyncLoading(false)
      setSyncVisible(false) 
      setOtpVisible(true) 
      setAccountEmailSynced("")

      }
      
      
    } catch (error) {
      setSyncLoading(false)
      console.error(error);
      setAccountEmailSynced("")
    }
  };
  handleDurationSubmit=()=>{
    if(startTime>endTime){
      Alert.alert("Either the task is extending to other date or Start is less than End")
    }
    else{
      setSelectDurationVisible(false)
    }
  }
  const today = moment(new Date()).format('YYYY-MM-DD');
  const selectDay=moment(new Date(viewedDate)).format('YYYY-MM-DD')
  return (
    <NativeBaseProvider>
      <SafeAreaView style={CalendarScreenStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View>
          <Menu w="100" mr="8" trigger={triggerProps => {
            return (
          
              <Pressable accessibilityLabel="Sync Calendar" {...triggerProps} style={{ alignSelf: "flex-end", width: 40, marginBottom: 10 }}>
                <Entypo name="dots-three-vertical" size={18} color="#787777" style={{ marginTop: 15 }} />
              </Pressable>
  


            )
          }}>
            <Menu.Item onPress={() => setSyncVisible(true)}>Sync</Menu.Item>
          </Menu>
          <Calendar

            onDayPress={handleDayPress}
            markedDates={{
              [viewedDate]: {
                selected: true,
                customStyles: {
                  container: {
                    backgroundColor: '#569AFF',
                    borderRadius: 50,
                  },
                  text: {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                },
              },
            }}
          />
        </View>
        <View style={expand ? CalendarScreenStyles.eventContainer2 : CalendarScreenStyles.eventContainer1}>
          <TouchableOpacity style={CalendarScreenStyles.eventContainerContent} onPress={() => toggleExpand()}>
            <Text style={CalendarScreenStyles.eventContainerTitle}>Todays Tasks</Text>
            {expand ? (
              <AntDesign name="down" size={18} color="#808080" />
            ) : (
              <AntDesign name="up" size={18} color="#808080" />
            )}
          </TouchableOpacity>
          <View>
           
            <View style={{ flex: 0.8, flexGrow: 1 }}>

             {loading?<View>
              {expand?<View>
              <TasksLoader/>
              <TasksLoader/>
              <TasksLoader/>
                </View>:<View>
              <TasksLoader/>
              <TasksLoader/>
              </View>
}
             </View>:<View>
              {tasks?.length>0?
                <FlatList
                  data={tasks}
                  renderItem={({ item }) => <Task task={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />:<View><Image source={No_Task} style={{height:
                  150,width:150,marginTop:70}} resizeMode="contain"/></View>
              }
                </View>
             }
            </View>
            
            {tasks?.length > 0 && (
              <View style={CalendarScreenStyles.workingHoursContainer}>
                <Text style={CalendarScreenStyles.workingHoursTitle}>Working Hours</Text>
{loading?<View>{expand?<View><WorkingHoursLoader/><WorkingHoursLoader/><WorkingHoursLoader/><WorkingHoursLoader/></View>:<View><WorkingHoursLoader/><WorkingHoursLoader/></View>}</View>:
                <FlatList
                  data={tasks}
                  renderItem={({ item }) => <WorkingHours Hour={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
}
              </View>
            )
            }
          </View>
        </View>
        {((selectDay>=today)) && (
          <TouchableOpacity style={CalendarScreenStyles.addTaskButton} onPress={() => setShowModal(true)}>
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} style={{ justifyContent: isKeyboardOpen ? "center" : "flex-end" }} size={"full"}>
          <Modal.Content>
            <Modal.Body>
              <Text style={CalendarScreenStyles.modalTitle}>New task</Text>
              <View style={CalendarScreenStyles.modalContainer}>
                <View style={CalendarScreenStyles.modalTextInputContainer}>
                  <TextInput style={{ fontSize: 15, flex: 1 }} onChangeText={(text) => setTitle(text)} value={title} placeholder="Title" />
                </View>
              </View>
              <View style={CalendarScreenStyles.menuContainer}>
                <Menu w="175" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <View style={CalendarScreenStyles.addCategoryButton}>
                      <Image source={Categories} style={{ height: 17, width: 17 }} resizeMode="contain" />
                      <Text style={{ color: '#808080', paddingHorizontal: 3 }}>{category?category:"Categories"}</Text>
                    </View>
                  </Pressable>;
                }}>
                  <Menu.Item onPress={() =>setCreateCategoryVisible(true)}><AntDesign name="plus" size={20} color="#3584EF" /><Text style={{ color: "#3584EF" }}>Add New</Text></Menu.Item>
                  <Menu.Item onPress={() => setCategory("Personal")}>Personal</Menu.Item>
                  <Menu.Item onPress={() => setCategory("Design")}>Design</Menu.Item>
                  <Menu.Item onPress={() => setCategory("Work")}>Work</Menu.Item>
                  <Menu.Item onPress={() => setCategory("Manage Categories")}>Manage Categories</Menu.Item>
                  <Menu.Item onPress={() => setCategory("Sort By")}>Sort By</Menu.Item>
                </Menu>
                <TouchableOpacity style={CalendarScreenStyles.dueDateContainer} onPress={() => showDatePicker()}>
                  <Image source={DueDate} style={{ height: 19, width: 19 }} resizeMode="contain" />
                  <Text style={{ color: '#808080', paddingHorizontal: 3 }}>{dueDate ? dueDate : "Due Date"}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => addTask()} style={[CalendarScreenStyles.doneButton,{backgroundColor:isButtonDisabled?"#BBD5FA":"#3584EF"}]} disabled={isButtonDisabled}>
                <Text style={{ color: 'white' }}>Done</Text>
              </TouchableOpacity>
            </Modal.Body>
          </Modal.Content>

        </Modal>

        <Modal isOpen={syncVisible} onClose={() => setSyncVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Confirm</Text>
              <Text style={{marginBottom:10}}>Currently Synced : {syncedEmail}</Text>
              <Text>Write your email synced with calender.</Text>
              <View style={styles.editCategoryModalContainer}>
                <TextInput placeholder="Email" style={{ marginLeft: 10, flex: 1 }} onChangeText={(text)=>setAccountEmailSynced(text)} />
              </View>
              <View style={styles.modalConfirmationOptionsContainer}>
                {syncLoading?<View style={{flexDirection:"row"}}><Spinner accessibilityLabel="Loading" color="#3584EF" size="sm" /><Text style={{marginLeft:5,color:"#3584EF"}}>Loading</Text></View>:
                <TouchableOpacity onPress={() =>handleSyncEmail()} disabled={issubmitEmailDisabled}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color:issubmitEmailDisabled?"#BBD5FA":"#3584EF" }}>Done</Text>
                </TouchableOpacity>
                }
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={overlapAlertVisible} onClose={() => setOverlapAlertVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Overlap alert</Text>
              <Text>Your newly added calender is overlapping your task, are you sure want to confirm it?</Text>
              <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => { setAutoScheduleVisible(true), setOverlapAlertVisible(false) }} style={{ paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Auto Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOverlapErrorVisible(true), setOverlapAlertVisible(false) }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Confirm Overlap</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>




        <Modal isOpen={overlapErrorVisible} onClose={() => setOverlapErrorVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Overlap error</Text>
              <Text>This schedule error is overlapping with excising task</Text>
              <View style={styles.overlapErrorContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <View style={{ flexDirection: "row", flex: 0.99, alignItems: "center" }}>
                    <AntDesign name="clockcircleo" size={14} color="#808080" style={{ paddingRight: 5 }} />
                    <Text>Select available time</Text>
                  </View>
                  <TouchableOpacity style={{ width: 65, height: 32, borderRadius: 20, backgroundColor: "#E8F1FD", alignItems: "center", justifyContent: "center" }} onPress={() => showAvailableTimePicker()}>
                    <Text>{availableTime ? availableTime : "HH : MM"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setOverlapErrorVisible(false)} style={{ paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOverlap()}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Confirm Overlap</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>



        <Modal isOpen={autoScheduleVisible} onClose={() => setAutoScheduleVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Auto schedule</Text>
              <Text>Sechdule this event with auto-sechdule feature.</Text>
              <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => { setAutoScheduleVisible(false), setOverlapAlertVisible(true) }} style={{ paddingHorizontal: 15 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Deny</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAutoSchedule()}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date(viewedDate)}

        />


        <Modal isOpen={selectDuration} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Select Duration</Text>
              <Text>Mention the Start and End time of the task</Text>
              <View style={styles.overlapErrorContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <View style={{ flexDirection: "row", flex: 0.99, alignItems: "center" }}>
                    <AntDesign name="clockcircleo" size={14} color="#808080" style={{ paddingRight: 5 }} />
                    <Text>Select Start time</Text>
                  </View>
                  <TouchableOpacity style={{ width: 65, height: 32, borderRadius: 20, backgroundColor: "#E8F1FD", alignItems: "center", justifyContent: "center" }} onPress={() => showStartTimePicker()}>
                    <Text>{startTime ? startTime : "Start"}</Text>
                  </TouchableOpacity>

                </View>

              </View>
              <View style={styles.overlapErrorContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <View style={{ flexDirection: "row", flex: 0.99, alignItems: "center" }}>
                    <AntDesign name="clockcircleo" size={14} color="#808080" style={{ paddingRight: 5 }} />
                    <Text>Select End time</Text>
                  </View>
                  <TouchableOpacity style={{ width: 65, height: 32, borderRadius: 20, backgroundColor: "#E8F1FD", alignItems: "center", justifyContent: "center" }} onPress={() => showEndTimePicker()}>
                    <Text>{endTime ? endTime : "End"}</Text>
                  </TouchableOpacity>

                </View>

              </View>

              <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={() => handleDurationSubmit()}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />

        <DateTimePickerModal
          isVisible={isAvailableTimePickerVisible}
          mode="time"
          onConfirm={handleAvailableTimeConfirm}
          onCancel={hideAvailableTimePicker}
        />


        <Modal isOpen={otpVisible} initialFocusRef={initialRef} onClose={()=>setOtpVisible(false)} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
            <OTPInput verificationCode={otpValue} onOtpChange={handleOtpChange} />
              <TouchableOpacity disabled={isSubmitDisabled}  style={[styles.nextButton,{backgroundColor:isSubmitDisabled?"#BBD5FA":"#3584EF"}]} onPress={()=>handleOTPSubmit()}>
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity>
            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={createCategoryVisible} onClose={() => setCreateCategoryVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Create New Category</Text>
              <View style={styles.editCategoryModalContainer}>
                <TextInput placeholder="Input Here" style={{marginLeft:10,flex:1}} onChangeText={(text)=>setModalCategory(text)}/>
            </View>
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() =>{setModalCategory(""),setCreateCategoryVisible(false)}}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{setCategory(modalCategory),setCreateCategoryVisible(false)}}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>

      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({


  modalHeader: {
    paddingBottom: "10%",
    fontSize: 16,
    fontWeight: 600
  },
  modalConfirmationOptionsContainer: {
    alignSelf: "flex-end",
    paddingTop: 20,
    flexDirection: "row"
  },
  editCategoryModalContainer: {
    flex: 1,
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 20
  },
  overlapErrorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    justifyContent: 'center',
    minWidth: 200,
    alignSelf:"center"
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  }
})