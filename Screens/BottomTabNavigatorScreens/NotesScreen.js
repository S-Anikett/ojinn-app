import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, SafeAreaView, TextInput, StyleSheet, TouchableOpacity,Keyboard,Alert} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider,Modal,Skeleton} from "native-base";
import axios from "axios";

const NotesScreen = () => {
    const navigation=useNavigation()
    const {title,taskId,email}=useRoute().params
    const [loading,setLoading]=useState(false)
    const[notesLoading,setNotesLoading]=useState(false)
    const [notes,setNotes]=useState(null)
    const [taskSaved,setTaskSaved]=useState(false)
    const addTaskNotes = ()=>{ 
      Keyboard.dismiss()
      setLoading(true)
      axios.post('https://champagne-termite-fez.cyclic.app/addTaskNotes', { email: email, taskId,notes})
    .then(response => {
      if(response.data.message=="Task notes updated successfully" ){
        setTaskSaved(true)
        setLoading(false)
      }
    })
    .catch(error => {
      setLoading(false)
      Alert.alert(`Error: ${error}`)
    });
  }
  useEffect(()=>{
    setNotesLoading(true)
    axios.post('https://champagne-termite-fez.cyclic.app/getTaskNotes',{email,taskId})
    .then((response)=>{
      setNotes(response.data.notes)
      setNotesLoading(false)
    }).catch((error)=>{
      Alert.alert(`Error ${error}`)
      setNotesLoading(false)
    })
  },[])

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notes</Text>
          </View>
          <TouchableOpacity disabled={loading} onPress={()=>addTaskNotes()}>
          <AntDesign name="save" size={24} color={loading?"#BBD5FA":"#3584EF" }/>
            </TouchableOpacity>
        </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesText}>{title}</Text>
      </View>
      <View style={styles.textInputContainer}>
        {notesLoading?<Skeleton.Text lines={20}/>:
        <TextInput style={styles.textInput} placeholder="Add Notes" placeholderTextColor="#808080" multiline={true} value={notes} onChangeText={(text)=>setNotes(text)}/>
}
      </View>



      <Modal isOpen={taskSaved} onClose={() => setTaskSaved(false)}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
  notesContainer: {
    flex: 0.05,
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  notesText: {
    fontSize: 16,
    fontWeight:600
  },
  textInputContainer: {
    flex: 0.95,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    textAlignVertical: 'top',
    borderColor:"black",    
    height:"100%",
    width:"100%",
    fontSize: 16,
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
});

export default NotesScreen;
