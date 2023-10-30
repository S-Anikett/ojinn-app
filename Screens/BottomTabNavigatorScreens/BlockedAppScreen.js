import React from "react";
import {Text,View,StatusBar,SafeAreaView,StyleSheet, TouchableOpacity,Image} from "react-native"
import FocusMode from "../../assets/Images/FocusMode.png"
import Ojinn from "../../assets/Images/Ojinn.png"
import Instagram from "../../assets/Images/Instagram.png"
import { useNavigation, useRoute } from "@react-navigation/native";
const BlockedAppScreen=()=>{
    const {app}=useRoute().params
    const navigation=useNavigation()
    console.log(app)
    return(
        <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={{flex:0.4,width:"100%",alignItems:"center",justifyContent:"space-between",marginTop:"30%",marginBottom:"5%"}}>
            <Text style={{fontSize:18,fontWeight:600,color:"#3584EF"}}>OJINN</Text>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Image source={app.image} style={{height:35,width:35,position:"absolute",marginLeft:30,borderRadius:18}}/>
                <Image source={Ojinn} style={{height:40,width:40}}/>
                <Text style={{fontSize:16,fontWeight:600,marginLeft:30}}>{app.appName}</Text>
            </View>
            <Text style={{color:"#808080"}}>This app is blocked for focus mode</Text>
            <Text style={{textAlign:"center",paddingHorizontal:"10%",fontSize:18,fontWeight:600,fontStyle: 'italic',color:"#3584EF"}}>"Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus"</Text>
            <Text style={{color:"#808080"}}>Alexander Graham Bell</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}style={{width:"90%",backgroundColor:"#3584EF",height:"15%",borderRadius:9,alignItems:"center",justifyContent:"center"}}><Text style={{color:"white"}}>Dismiss for now</Text></TouchableOpacity>
        </View>
            <View style={{flex:0.45}}>
            <Image source={FocusMode} resizeMode="contain" style={{height:"100%",width:"100%"}}/>
            </View>
      </SafeAreaView>
    )
}
export default BlockedAppScreen
const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center"
    }
})