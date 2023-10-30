import React, { useContext, useState, useRef,useEffect } from "react";
import {
  SafeAreaView, StatusBar, Text, View, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity,
  Animated, TextInput,Keyboard
} from "react-native";
import { Modal, NativeBaseProvider, Menu, Pressable, Radio, Skeleton } from "native-base"
import { SwipeListView } from "react-native-swipe-list-view";
import { AuthContext } from "../../navigation/AuthProvider";
import { AntDesign } from '@expo/vector-icons';
import TodayTodos from "../../TodayTodos";
import Todo from "../../Components/Todo";
import UpcomingTodos from "../../UpcomingTodos";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import To_DosScreenStyles from "../../Styles/To_DosScreenStyles";
import DueDate from '../../assets/Images/DueDate.png';
import Categories from '../../assets/Images/Categories.png';
import axios from "axios";
import moment from "moment";
import TodosLoader from "../../Components/TodosLoader";
import TasksLoader from "../../Components/TasksLoader";
import No_Task from "../../assets/Images/No_Task.png"



const images = [
  require("../../assets/Images/home3.png"),
  require("../../assets/Images/home1.png"),
  require("../../assets/Images/home2.png"),
];
const width = Dimensions.get("window").width

const useKeyboard=()=>{
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

const To_Dos = ({navigation}) => {


  
  const { user,syncedEmail} = useContext(AuthContext);
  console.log("asdkjfhaskjdf hskjdfh",syncedEmail)
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [imgActive, setImgActive] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const todaysTasksExpandAnimation = useRef(new Animated.Value(0)).current;
  const upcomingTasksExpandAnimation = useRef(new Animated.Value(0)).current;
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false); 
  const [searchSelected, setsearchSelected] = useState(false);
  const [sortValue, setSortValue] = useState("")
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [sortVisible, setSortVisible] = useState(false)
  const [category,setCategory]=useState("Personal")
  const [addTaskVisible,setAddTaskVisible]=useState(false)
  const isKeyboardOpen = useKeyboard();
  const [title,setTitle]=useState("");
  const [todaysTasks,setTodaysTasks]=useState([])
  const [upcomingTasks,setUpcomingTasks]=useState([])
  const [filteredUpcomingTasks, setFilteredUpcomingTasks] = useState([]);
  const [filteredTodaysTasks, setFilteredTodaysTasks] = useState([]);
  const [searchInput,setSearchInput]=useState("")
  const [loading,setLoading]=useState(true)
  const[id,setId]=useState("")
  const[categories,setCategories]=useState([])
  const[categoriesLoading,setCategoriesLoading]=useState([])
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.post('https://champagne-termite-fez.cyclic.app/getAllTasks', { email:syncedEmail });
      const tasks = response.data;

      const today = moment(new Date()).format('MM/DD/YYYY');

      const todaysTasks = tasks.filter(task => {
        return task.dueDate >= today && task.createdAt<=today;
      });

      const upcomingTasks = tasks.filter(task => {
        return task.createdAt > today;
      });

      setTodaysTasks(todaysTasks);
      setUpcomingTasks(upcomingTasks);
      setFilteredTodaysTasks(todaysTasks); 
    setFilteredUpcomingTasks(upcomingTasks);
    setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const fetchCategories = async () => {
    setCategoriesLoading(true)
    try {
      const response = await axios.post('https://champagne-termite-fez.cyclic.app/getCategories', {
        email: syncedEmail,
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch categories');
        setCategoriesLoading(false)
      }
  
      const fetchedCategories = response.data.categories;
      const updatedCategories = [{ category: 'All Tasks',color: "#3584EF" }, ...fetchedCategories];
      setCategories(updatedCategories);
      setCategoriesLoading(false)
    } catch (error) {
      console.error(error);
      setCategoriesLoading(false)
    }
  };
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    fetchData();
    fetchCategories()
    setSelectedButtonIndex(0)
  });
  return unsubscribe;
}, [navigation,syncedEmail]);

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  const handleButtonPress = (index) => {
    setSelectedButtonIndex(index);
  
    let filteredUpcomingTasks = [];
    let filteredTodaysTasks = [];
  
    switch (index) {
      case 0:
        filteredUpcomingTasks = [...upcomingTasks];
        filteredTodaysTasks = [...todaysTasks];
        break;
      default:
        const selectedCategory = categories[index].category;
        filteredUpcomingTasks = upcomingTasks.filter(task => task.category === selectedCategory);
        filteredTodaysTasks = todaysTasks.filter(task => task.category === selectedCategory);
        break;
    }
  
    setFilteredUpcomingTasks(filteredUpcomingTasks);
    setFilteredTodaysTasks(filteredTodaysTasks);
  };

  const handleExpandPress1 = () => {
    setIsExpanded1(!isExpanded1);
    Animated.timing(todaysTasksExpandAnimation, {
      toValue: isExpanded1 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleExpandPress2 = () => {
    setIsExpanded2(!isExpanded2);
    Animated.timing(upcomingTasksExpandAnimation, {
      toValue: isExpanded2 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderTodoItem = ({ item}) => (
    <Todo todo={item} email={syncedEmail}/>
  );

  const searchedTodaysTasks = filteredTodaysTasks.filter((task) =>
    task.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  const searchedUpcomingTasks = filteredUpcomingTasks.filter((task) =>
  task.title.toLowerCase().includes(searchInput.toLowerCase())
);
const handleDeleteTask = async (taskId) => {
  setId(taskId)
  setConfirmVisible(true)
};
const handleConfirmDelete=async()=>{
  setLoading(true)
  const apiUrl = "https://champagne-termite-fez.cyclic.app"; 

  axios.delete(`${apiUrl}/deleteTask/${id}`, {
    data: { email: syncedEmail },
  })
    .then((response) => {
      fetchData()
      console.log(response.data);
      setLoading(false)
      setConfirmVisible(false)
    })
    .catch((error) => {
      
      console.error(error);
      setLoading(false)
      setConfirmVisible(false)
    });
}

  const renderHiddenItem = ({item}) => (
    <View style={[To_DosScreenStyles.rowBack, { width: width * 0.89, }]}>
      <TouchableOpacity style={To_DosScreenStyles.selectButton}>
        <AntDesign name="checkcircleo" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.taskId)} style={[To_DosScreenStyles.backRightBtn, To_DosScreenStyles.backRightBtnRight]}>
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const searchBack = () => {
    setSearchInput("");
    setsearchSelected(false)
  };
  const sortTasks = (sortValue) => {
    if (sortValue === "Due Date") {
      setSortValue(sortValue)
   
      setFilteredTodaysTasks([...filteredTodaysTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate))]);
      setFilteredUpcomingTasks([...filteredUpcomingTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate))]);
      setSortVisible(false)
    } else if (sortValue === "Task Creation Time") {
      setSortValue(sortValue);
    
      setFilteredTodaysTasks([...filteredTodaysTasks.sort((a, b) => new Date(a.taskCreationTime) - new Date(b.taskCreationTime))]);
      setFilteredUpcomingTasks([...filteredUpcomingTasks.sort((a, b) => new Date(a.taskCreationTime) - new Date(b.taskCreationTime))]);
      setSortVisible(false)
    } else if (sortValue === "Alphabetical A-Z") {
      setSortValue(sortValue)
   
      setFilteredTodaysTasks([...filteredTodaysTasks.sort((a, b) => a.title.localeCompare(b.title))]);
      setFilteredUpcomingTasks([...filteredUpcomingTasks.sort((a, b) => a.title.localeCompare(b.title))]);
      setSortVisible(false)
    } else if (sortValue === "Alphabetical Z-A") {
      setSortValue(sortValue)
 
      setFilteredTodaysTasks([...filteredTodaysTasks.sort((a, b) => b.title.localeCompare(a.title))]);
      setFilteredUpcomingTasks([...filteredUpcomingTasks.sort((a, b) => b.title.localeCompare(a.title))]);
      setSortVisible(false)
    }
    else{
      setSortVisible(false)
    }
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
          <View style={To_DosScreenStyles.topContainer}>
            <View style={To_DosScreenStyles.welcomeContainer}>
              <Text style={To_DosScreenStyles.userNameText}>Hello {user.displayName} ,
              </Text>
              <Text style={To_DosScreenStyles.welcomeText}>
                We hope you are having a great day!
              </Text>
            </View>
            <View style={{ width: width * 0.9, height: height * 0.25 }}>
              <ScrollView
                onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={{ width: width * 0.9, height: height * 0.25 }}
              >
                {images.map((e, index) => (
                  <Image
                    key={e}
                    resizeMode="stretch"
                    style={{ width: width * 0.9, height: height * 0.25 }}
                    source={e}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              {images.map((e, index) => (
                <Text
                  key={e}
                  style={[
                    imgActive === index ? To_DosScreenStyles.dotActive : To_DosScreenStyles.dotInactive,
                    { fontSize: 20, fontWeight: 900 },
                  ]}
                >
                  .
                </Text>
              ))}
            </View>
          </View>



          <View>
            <View style={To_DosScreenStyles.taskContainer}>
              {searchSelected ? <View style={[To_DosScreenStyles.searchContainer, { width: width * 0.95, }]}><TouchableOpacity onPress={() => searchBack()}><Ionicons name="arrow-back-sharp" size={21} color="#808080" /></TouchableOpacity><TextInput placeholder="Search your Tasks" style={{ flex: 1, paddingLeft: 10 }} onChangeText={(text)=>setSearchInput(text)} /><Ionicons name="search-outline" size={20} color="#3584EF" /></View> :<>
              {(categoriesLoading||loading)?<View style={[To_DosScreenStyles.taskContainer,{ marginTop: 15,justifyContent:"space-evenly",flex:1}]}>
                  <Skeleton style={{height:35,width:70,borderRadius:20}}/>
                  <Skeleton style={{height:35,width:70,borderRadius:20}}/>
                  <Skeleton style={{height:35,width:70,borderRadius:20}}/>
                  <Skeleton style={{height:35,width:70,borderRadius:20}}/>
              </View>:
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }}>
                <View style={To_DosScreenStyles.taskCategoriesContainer}>
                  {categories.map((categoryObj, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        To_DosScreenStyles.button,
                        selectedButtonIndex === index && { backgroundColor: categoryObj.color },
                      ]}
                      onPress={() => handleButtonPress(index)}
                    >
                      <Text
                        style={[
                          To_DosScreenStyles.buttonText,
                          selectedButtonIndex === index && { color: "white" },
                        ]}
                      >
                        {categoryObj.category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
}
              </>
        
}

              <Menu w="175" mr="5" trigger={triggerProps => {
                return (
                  searchSelected ? null :
                    <Pressable accessibilityLabel="More options menu" {...triggerProps} style={{marginLeft:10}}>
                      <Entypo name="dots-three-vertical" size={20} color="#787777" style={{ marginTop: 15 }} />
                    </Pressable>

                )
              }}>
                <Menu.Item onPress={() => setsearchSelected(true)}>Search</Menu.Item>
                <Menu.Item onPress={() => navigation.navigate("ManageCategoriesScreen")}>Manage Categories</Menu.Item>
                <Menu.Item onPress={() => setSortVisible(true)} >Sort By</Menu.Item>
              </Menu>

            </View>
            <TouchableOpacity
              style={To_DosScreenStyles.tasksCollapsableContainer}
              onPress={handleExpandPress1}
            >
              <Text style={To_DosScreenStyles.collapsableContainerText}>Todays Tasks</Text>
              <AntDesign name={isExpanded1 ? "up" : "down"} size={14} color="#808080" style={{marginTop:11}}/>
            </TouchableOpacity>
            <Animated.View
              style={[
                To_DosScreenStyles.expandedView,
                {
                  height: todaysTasksExpandAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, isExpanded1 ? height * 0.4 : 0],
                  }),
                },
              ]}
            >
              {(loading||categoriesLoading)?<View style={{marginTop:10}}>

              <TodosLoader/>
                <TodosLoader/>
                <TodosLoader/>
              </View>:
              <View style={{alignItems:"center",justifyContent:"center"}}>
                {filteredTodaysTasks.length==0?<View><Image source={No_Task} style={{height:
              150,width:150,marginTop:70}} resizeMode="contain"/></View>:
              <SwipeListView
              nestedScrollEnabled={true}
                data={searchInput !== "" ? searchedTodaysTasks : filteredTodaysTasks}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                rightOpenValue={-112}
                disableRightSwipe
                renderHiddenItem={renderHiddenItem}
              />
                }
              </View>
}
            </Animated.View>
            <TouchableOpacity
              style={To_DosScreenStyles.tasksCollapsableContainer}
              onPress={handleExpandPress2}
            >
              <Text style={To_DosScreenStyles.collapsableContainerText}>Upcoming Tasks</Text>
              <AntDesign name={isExpanded2 ? "up" : "down"} size={14} color="#808080"  style={{marginTop:11}}/>
            </TouchableOpacity>
            <Animated.View
              style={[
                To_DosScreenStyles.expandedView,
                {
                  height: upcomingTasksExpandAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, isExpanded2 ? height * 0.4 : 0],
                  }),
                },
              ,{paddingBottom:20}]}
            >
              {(loading||categoriesLoading)?<View style={{marginTop:10}}>
                <TodosLoader/>
                <TodosLoader/>
                <TodosLoader/>
              </View>:
              <View style={{alignItems:"center",justifyContent:"center"}}>
              {filteredUpcomingTasks.length==0?<View><Image source={No_Task} style={{height:
              150,width:150,marginTop:70}} resizeMode="contain"/></View>:
              <SwipeListView
              nestedScrollEnabled={true}
                data={searchInput !== "" ? searchedUpcomingTasks:filteredUpcomingTasks}
                renderItem={renderTodoItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                rightOpenValue={-112}
                disableRightSwipe
                renderHiddenItem={renderHiddenItem}
              />
}
              </View>
              }
            </Animated.View>
          </View>
          </ScrollView>

       

        <Modal isOpen={confirmVisible} onClose={() => setConfirmVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={To_DosScreenStyles.modalConfirmationText}>Delete Task</Text>
              <Text>Are you sure you want to delete this task?</Text>
              <View style={To_DosScreenStyles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => handleConfirmDelete()}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setConfirmVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={sortVisible} onClose={() => setSortVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={{ paddingBottom: "10%", fontSize: 16, fontWeight: 600 }}>Sort By</Text>
              <Radio.Group name="myRadioGroup" accessibilityLabel="SortBy" value={sortValue} onChange={nextValue => {
                sortTasks(nextValue);
              }}
                space={7}>

                <Radio value="Due Date" my={1} size="sm">
                  Due Date
                </Radio>
                <Radio value="Task Creation Time" my={1} size="sm">
                  Task Creation Time
                </Radio>
                <Radio value="Alphabetical A-Z" my={1} size="sm">
                  Alphabetical A-Z
                </Radio>
                <Radio value="Alphabetical Z-A" my={1} size="sm">
                  Alphabetical Z-A
                </Radio>
              </Radio.Group>

            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Modal isOpen={addTaskVisible} onClose={() => setAddTaskVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} style={{justifyContent:isKeyboardOpen?"center":"flex-end"}}>
          <Modal.Content style={{ width: '100%' }}>
            <Modal.Body>
              <Text style={To_DosScreenStyles.modalTitle}>New task</Text>
              <View style={To_DosScreenStyles.modalContainer}>
                <View style={To_DosScreenStyles.modalTextInputContainer}>
                  <TextInput style={{ fontSize: 15, flex: 1 }} onChangeText={(text) => setTitle(text)}value={title} placeholder="Title"/>
                </View>
              </View>
              <View style={To_DosScreenStyles.menuContainer}>
              <Menu w="160" trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <View style={To_DosScreenStyles.addCategoryButton}>
                  <Image source={Categories} style={{ height: 17, width: 17 }} resizeMode="contain" />
                  <Text style={{ color: '#808080', paddingHorizontal: 3 }}>{category}</Text>
                </View>
            </Pressable>;
    }}>
        <Menu.Item onPress={()=>setCategory("New")}><AntDesign name="plus" size={20} color="#3584EF" /><Text style={{color:"#3584EF"}}>Create New</Text></Menu.Item>
        <Menu.Item onPress={()=>setCategory("Personal")}>Personal</Menu.Item>
        <Menu.Item onPress={()=>setCategory("Design")}>Design</Menu.Item>
        <Menu.Item onPress={()=>setCategory("Work")}>Work</Menu.Item>
        <Menu.Item onPress={()=>setCategory("Manage Categories")}>Birthday</Menu.Item>
      </Menu>
                <TouchableOpacity style={To_DosScreenStyles.dueDateContainer}>
                  <Image source={DueDate} style={{ height: 19, width: 19 }} resizeMode="contain" />
                  <Text style={{ color: '#808080', paddingHorizontal: 3 }}>Due Date</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity  style={To_DosScreenStyles.doneButton} onPress={()=>setAddTaskVisible(false)}>
                <Text style={{ color: 'white' }}>Done</Text>
              </TouchableOpacity>
            </Modal.Body>
          </Modal.Content>

        </Modal>





      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default To_Dos;
