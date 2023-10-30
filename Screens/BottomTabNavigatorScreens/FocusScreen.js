import React from "react"
import { StatusBar, TouchableOpacity } from "react-native"
import { SafeAreaView, Text, View, Image, StyleSheet,Linking } from "react-native"
import { NativeBaseProvider, Modal, Radio, Switch } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useRef } from "react"
import Focus_type from "../../assets/Images/Focus_type.png"
import { AntDesign } from '@expo/vector-icons';
import ConnectDevices from "../../assets/Images/ConnectDevices.png"
import DistractingApps from "../../assets/Images/DistractingApps.png"
import WhitelistContacts from "../../assets/Images/WhitelistContacts.png"
import AutoFocus from "../../assets/Images/AutoFocus.png"
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FocusScreenStyles from "../../Styles/FocusScreenStyles"
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';


const FocusScreen = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState("Default Mode")
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView style={FocusScreenStyles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <View style={FocusScreenStyles.header}>
          <View style={FocusScreenStyles.headerContainer}>
            <TouchableOpacity style={FocusScreenStyles.backButton} onPress={goBack}>
              <Ionicons name="chevron-back" size={24} color="#808080" />
            </TouchableOpacity>
            <Text style={FocusScreenStyles.headerTitle}>Focus Mode</Text>
          </View>
        </View>
        <View style={FocusScreenStyles.focusContainer}>
          <View style={FocusScreenStyles.focusHeader}>
            <Text style={FocusScreenStyles.focusHeading}>
              Focus Mode
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={FocusScreenStyles.focusDescription}>
              When you need time to focus on particular task, you can block/ pause distracting apps and hide their notifications
            </Text>
          </View>
        </View>

        <TouchableOpacity style={FocusScreenStyles.focusTypes} onPress={() => setVisible(true)}>
          <View style={FocusScreenStyles.focusMode}>
            <Image source={Focus_type} style={FocusScreenStyles.focusImage} />
            <View style={{ paddingLeft: "10%" }}>
              <Text style={FocusScreenStyles.focusTitle}>Type of Focus Mode</Text>
            </View>
          </View>
          <View style={{ flex: 0.05 }}>
            <AntDesign name="down" size={16} color="black" />
          </View>

        </TouchableOpacity>
        <TouchableOpacity style={FocusScreenStyles.focusItem} onPress={() => navigation.navigate("DistractingAppsScreen")}>
          <View style={FocusScreenStyles.focusMode}>
            <Image source={DistractingApps} style={FocusScreenStyles.focusImage} />
            <View style={{ paddingLeft: "10%" }}>
              <Text style={FocusScreenStyles.focusTitle}>Distracting Apps</Text>
            </View>
          </View>
          <View style={{ flex: 0.05 }}>
            <Feather name="info" size={18} color="#808080" />
          </View>

        </TouchableOpacity>
        <TouchableOpacity style={FocusScreenStyles.focusItem} onPress={() => navigation.navigate("WhitelistContactsScreen")} >
          <View style={FocusScreenStyles.focusMode}>
            <Image source={WhitelistContacts} style={FocusScreenStyles.focusImage} resizeMode="contain" />
            <View style={{ paddingLeft: "10%" }}>
              <Text style={FocusScreenStyles.focusTitle}>Whitelist Contacts</Text>
            </View>
          </View>

        </TouchableOpacity>
        <TouchableOpacity style={FocusScreenStyles.focusItem} onPress={() => navigation.navigate("AddDevicesScreen")} >
          <View style={FocusScreenStyles.focusMode}>
            <Image source={ConnectDevices} style={FocusScreenStyles.focusImage} />
            <View style={{ paddingLeft: "10%" }}>
              <Text style={FocusScreenStyles.focusTitle}>Connect Devices</Text>

            </View>
          </View>

        </TouchableOpacity>
        <TouchableOpacity style={FocusScreenStyles.focusItem} >
          <View style={FocusScreenStyles.focusMode}>
            <Image source={AutoFocus} style={FocusScreenStyles.focusImage} />
            <View style={{ paddingLeft: "10%" }}>
              <Text style={FocusScreenStyles.focusTitle}>Schedule Auto Focus</Text>

            </View>
          </View>

        </TouchableOpacity>
        <Modal isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <View style={{flexDirection:"row"}}>
              <Text style={{ paddingBottom: "10%", fontSize: 16, fontWeight: 600,flex:1 }}>Select focus mode</Text>
              <AntDesign name="setting" size={18} color="black" />
              </View>
              <TouchableOpacity style={{height:30,borderBottomWidth:1,borderBottomColor:"#F5F5F5"}} onPress={()=>{startActivityAsync(ActivityAction.AIRPLANE_MODE_SETTINGS),setVisible(false)}}>
                <Text> No Call Mode</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{height:30,marginTop:10}}onPress={()=>{startActivityAsync(ActivityAction.ZEN_MODE_SETTINGS),setVisible(false)}}>
                <Text> No Notification Mode</Text>
              </TouchableOpacity>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </NativeBaseProvider>

  )
}

export default FocusScreen