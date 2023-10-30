import React,{useContext,useState} from "react"
import { SafeAreaView, StatusBar, Text, View,Image } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "./BottomTabNavigatorScreens/Profile";
import To_Dos from "./BottomTabNavigatorScreens/To_Dos";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CalendarScreen from "./BottomTabNavigatorScreens/CalendarScreen";
import { AuthContext } from "../navigation/AuthProvider"
const HomeScreen = () => {
  const {user}=useContext(AuthContext)
  
  const Tab = createBottomTabNavigator();
  const CustomTabLabel = ({ label, focused }) => (
    <Text style={{ fontSize: 12, fontWeight: focused ? 600 : 500, color: focused ? "#3584EF" : "#808080" }}>
      {label}
    </Text>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarStyle: { elevation: 0, borderTopWidth: 0, shadowOpacity: 0, height: 60, paddingBottom: 7 },
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel
              label={route.name}
              focused={focused}
            />
          )

        })}
      >
        <Tab.Screen name="To-Dos" component={To_Dos} options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
          
        }} 
        />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }} 
        />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color }) => (
            <Image source={{uri:user.photoURL}} style={{height:30,width:30,borderRadius:15}}/>
          ),
        }} />
      </Tab.Navigator>
    </SafeAreaView>
  )

}
export default HomeScreen