import React from "react";
import { SafeAreaView,Text,View,StatusBar,Image } from "react-native";
import MultiDeviceSupport from "../../assets/Images/MultiDeviceSupport.png"
import { TouchableOpacity } from "react-native";
import AddDevicesScreenStyles from "../../Styles/AddDevicesScreenStyles";
import DeviceComponent from "../../Components/DeviceComponent";
const AddDevicesScreen=()=>{
    return(
        <SafeAreaView style={AddDevicesScreenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={AddDevicesScreenStyles.header}>
        <Image source={MultiDeviceSupport} style={AddDevicesScreenStyles.image}/>
        <Text style={AddDevicesScreenStyles.text}>Use Ojinn on Desktop and Tablet</Text>
        <TouchableOpacity style={AddDevicesScreenStyles.addButton}>
            <Text style={AddDevicesScreenStyles.addButtonText}>Add Device</Text>
        </TouchableOpacity>
      </View>
      <View style={AddDevicesScreenStyles.addedDevicesHeader}>
        <View style={AddDevicesScreenStyles.addedDevicesTextContainer}>
        <Text style={[AddDevicesScreenStyles.addedDevicesTitle,{marginBottom:10}]}>Added Devices</Text>
        </View>
      </View>
      <DeviceComponent/>
      </SafeAreaView>
    )
}
export default AddDevicesScreen
