import React,{useState,useContext} from "react"
import {SafeAreaView, StatusBar, Text,View,Image,StyleSheet, TouchableOpacity,ActivityIndicator} from "react-native"
import GoogleImg from "../assets/Images/Google.png"
import TaskManagement from "../assets/Images/TaskManagement.png"
import { AuthContext } from "../navigation/AuthProvider"
import LoginScreenStyles from "../Styles/LoginScreenStyles"
const LoginScreen=()=>{
    const {googleLogin}=useContext(AuthContext)

    return (

        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"}/>
           <View style={{flex:0.8}}>
        <Text  style={LoginScreenStyles.title}>Welcome to Ojinn,{'\n'}your smart task manager!</Text>
        <Image source={TaskManagement} style={LoginScreenStyles.image}></Image>
            </View>
            <View style={LoginScreenStyles.bottomContainer}>
                <TouchableOpacity onPress={()=>googleLogin()} style={LoginScreenStyles.subBottomContainer}>
                    <Image source={GoogleImg} resizeMode="contain" style={LoginScreenStyles.subBottomContainerImage}></Image>
                    <Text style={{fontWeight:600,fontSize:16}}>Continue with Google</Text>
                </TouchableOpacity>
                <Text style={LoginScreenStyles.subBottomContainerText1}>By continuing, you agree to our</Text>
                <Text style={LoginScreenStyles.subBottomContainerText2}>Terms & conditions and Privacy Policy</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen