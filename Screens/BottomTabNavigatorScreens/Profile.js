import {React,useState,useRef, useContext} from "react"
import {SafeAreaView, StatusBar, Text,View,Image,TouchableOpacity,StyleSheet} from "react-native"
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {NativeBaseProvider,Switch,Radio ,Modal} from "native-base";
import TargetArrow from "../../assets/Images/TargetArrow.png"
import ArchiveTasks from "../../assets/Images/ArchiveTasks.png"
import AnalysisPage from "../../assets/Images/AnalysisPage.png"
import ConnectDevices from "../../assets/Images/ConnectDevices.png"
import FAQS from "../../assets/Images/FAQS.png"
import SignOut from "../../assets/Images/SignOut.png"
import OjinnProfileImage from "../../assets/Images/OjinnProfileImage.png"
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../navigation/AuthProvider"
import ProfileScreenStyles from "../../Styles/ProfileScreenStyles";
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

const Profile=()=>{
    const navigation=useNavigation()
    const {logout}=useContext(AuthContext)
    const {user}=useContext(AuthContext)
    const[visible,setVisible]=useState(false)
    const [value, setValue] =useState("1 hour")
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [switchOn, setSwitchOn] = useState(false);
  const handleToggleSwitch = (value) => {
    if (value) {
      setVisible(true);
      setSwitchOn(true);
    } else {
      if (!switchOn) {
        setVisible(false);
      }
      setSwitchOn(false);
    }
  };
    return (
        <NativeBaseProvider>
        <SafeAreaView style={ProfileScreenStyles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"}/>
            <View style={ProfileScreenStyles.profileContainer}>
                <View style={ProfileScreenStyles.profileImageContainer}>
                <Image source={{uri:user.photoURL}} style={ProfileScreenStyles.profileImage} resizeMode="contain"/>
                <View>
                <Text style={ProfileScreenStyles.profileName}>{user.displayName}</Text>
                <Text style={ProfileScreenStyles.profileEmail}>{user.email}</Text>
                </View>
                </View>
                <TouchableOpacity style={{height:40,width:40,alignItems:"center",justifyContent:"center"}} onPress={()=>startActivityAsync(ActivityAction.MANAGE_APPLICATIONS_SETTINGS)}>
                <Ionicons name="notifications" size={20} color="#3584EF"  />
                </TouchableOpacity>
                
                </View>
                <TouchableOpacity style={ProfileScreenStyles.focusMode} onPress={()=>navigation.navigate("FocusScreen")}>
                    <View style={ProfileScreenStyles.focusModeItemContainer}>
                    <Image source={TargetArrow} style={{width:32,height:32}} resizeMode="contain"/>
                    <View style={{paddingLeft:"10%"}}>
                    <Text style={{fontSize:14,fontWeight:500,color:"#020E1E"}}>Focus Mode</Text>
                    </View>
                    </View>
                    <View style={{flex:0.1,justifyContent:"center",alignItems:"center"}}>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity style={ProfileScreenStyles.focusItem}>
                    <Image source={AnalysisPage} style={ProfileScreenStyles.focusItemImage}/>
                    <Text style={ProfileScreenStyles.focusItemText}>Analysis Page</Text>

                </TouchableOpacity>
                <TouchableOpacity style={ProfileScreenStyles.focusItem}>
                    <Image source={ArchiveTasks} style={ProfileScreenStyles.focusItemImage}/>
                    <Text style={ProfileScreenStyles.focusItemText}>Archive Tasks</Text>

                </TouchableOpacity>
                <TouchableOpacity style={ProfileScreenStyles.focusItem} onPress={()=>navigation.navigate("AddDevicesScreen")}>
                    <Image source={ConnectDevices} style={ProfileScreenStyles.focusItemImage}/>
                    <Text style={ProfileScreenStyles.focusItemText}>Connect Devices</Text>

                </TouchableOpacity>
                <TouchableOpacity style={ProfileScreenStyles.focusItem}>
                    <Image source={FAQS} style={ProfileScreenStyles.focusItemImage}/>
                    <Text style={ProfileScreenStyles.focusItemText}>FAQs</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={()=>logout()} style={ProfileScreenStyles.focusItem}>
                    <Image source={SignOut} style={ProfileScreenStyles.focusItemImage}/>
                    <Text style={ProfileScreenStyles.focusItemTextSignOut}>Sign Out</Text>

                </TouchableOpacity>
                <View style={{flex:0.3,paddingTop:72}}>
                    <Image source={OjinnProfileImage} style={{height:"100%",width:"100%"}}resizeMode="stretch"/>
                    </View>

                    <Modal isOpen={visible} onClose={() => setVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          
          <Modal.Body>
          <Text style={{paddingBottom:"10%",fontSize:16,fontWeight:600}}>For how long?</Text>
          <Radio.Group name="myRadioGroup" accessibilityLabel="Duration" value={value} onChange={nextValue => {
    setValue(nextValue);
  }}
  space={7}>
    
      <Radio value="1 hour" my={1} size="sm">
        1 hour
      </Radio>
      <Radio value="2 hours" my={1} size="sm">
        2 hours
      </Radio>
      <Radio value="3 hours" my={1} size="sm">
        3 hours
      </Radio>
      <Radio value="4 hours" my={1} size="sm">
        4 hours
      </Radio>
      <Radio value="Until I turn it off" my={1} size="sm">
      Until I turn it off
      </Radio>
      <Radio value="Set for Task" my={1} size="sm">
      Set for Task
      </Radio>
    </Radio.Group>
           
          </Modal.Body>
        </Modal.Content>
      </Modal>
        </SafeAreaView>
        </NativeBaseProvider>
    )
}

export default Profile

