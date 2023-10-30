import React,{useState,useEffect} from "react";
import {Text,View} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
const DeviceComponent=()=>{
    const [deviceName, setDeviceName] = useState('');

    useEffect(() => {
      const getDeviceName = async () => {
        const name = Constants.deviceName;
        setDeviceName(name);
      };
  
      getDeviceName();
    }, []);
    return (
        <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:20,marginTop:10}}>
            <View style={{height:40,width:40,backgroundColor:"#F5F5F5",alignItems:"center",justifyContent:"center",borderRadius:20}}>
            <AntDesign name="mobile1" size={24} color="black" />
            </View>
            <View style={{marginLeft:10}}>
            <Text style={{fontSize:14,fontWeight:500}}>{deviceName}</Text>
            <Text style={{fontSize:12,fontWeight:400,color:"#808080"}}>Currently Logged In</Text>
            </View>
        </View>
    )
}
export default DeviceComponent