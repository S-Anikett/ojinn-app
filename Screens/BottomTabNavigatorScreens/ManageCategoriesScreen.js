import React, { useRef, useState,useEffect, useContext } from "react";
import {Text,View,StatusBar,SafeAreaView,TouchableOpacity,StyleSheet, FlatList,Dimensions, TextInput} from "react-native"
import {Modal,NativeBaseProvider} from "native-base"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Task from "../../Components/Task"
import { SwipeListView } from "react-native-swipe-list-view";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../navigation/AuthProvider";
import axios from 'axios';
import Category from "../../Components/Category";
const width = Dimensions.get("window").width
const ManageCategoriesScreen=()=>{
    const navigation=useNavigation()
    const [categories, setCategories] = useState([]);
    const{syncedEmail}=useContext(AuthContext)
    const[chooseColor,setChooseColor]=useState(false)
    const [confirmVisible,setConfirmVisible]=useState(false)
    const [createCategoryVisible,setCreateCategoryVisible]=useState(false)
    const [categoryEditVisible,setCategoryEditVisible]=useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const[selectedColor,setSelectedColor]=useState(null)
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const fetchCategories = async () => {
      try {
        const response = await axios.post('https://champagne-termite-fez.cyclic.app/getCategories', {
          email: syncedEmail,
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const editCategories = async (email, category, color) => {
      try {
        const response = await axios.post('https://champagne-termite-fez.cyclic.app/editCategories', {
          email: email,
          category: category,
          color: color
        });
    
        if (response.status !== 200) {
          throw new Error('Failed to edit categories');
        }
    
        console.log(response.data.message); // Categories updated successfully
        fetchCategories();
        setCategoryEditVisible(false)

      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    const handleEdit=(item)=>{
      setCategoryEditVisible(true)
      setSelectedCategory(item.category)
      setSelectedColor(item.color)
    }
    const renderCategoryItem = ({ item }) => (
        <Category category={item} />
      );
    
      const renderHiddenItem = ({item}) => (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.selectButton} onPress={()=>handleEdit(item)}>
          <Feather name="edit-2" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setConfirmVisible(true)} style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    
    return(
        <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Manage Categories</Text>
          </View>
          <TouchableOpacity onPress={()=>setCreateCategoryVisible(true)}>
            <AntDesign name="plus" size={24} color="#3584EF" style={styles.plusButton}/>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <SwipeListView
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                rightOpenValue={-110}
                disableRightSwipe
                renderHiddenItem={renderHiddenItem}
              />
        </View>


        <Modal isOpen={confirmVisible} onClose={() => setConfirmVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Delete Category</Text>
              <Text>Are you sure you want to delete this Category?</Text>
              <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setConfirmVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setConfirmVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Delete</Text>
                </TouchableOpacity>
              </View>

            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={categoryEditVisible} onClose={() => setCategoryEditVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
            <Text style={styles.modalHeader}>Edit Category</Text>
            <View style={styles.editCategoryModalContainer}>
                <Text style={{paddingHorizontal:10}}>{selectedCategory}</Text>
            </View>

            <View style={styles.chooseColorContainer}>
                <Text style={styles.chooseColorText}>Category Color</Text>
                <TouchableOpacity style={[styles.colorView,{backgroundColor:selectedColor}]} onPress={()=>setChooseColor(true)}/>
            </View>
            <Text style={{marginTop:10}}>This color will be displayed in interface</Text>
            {chooseColor?
            <View style={styles.categoryColorsView}>
            
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#0396FF"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#0396FF")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#D3449A"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#D3449A")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#3CC531"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#3CC531")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#E96D71"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#E96D71")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#0396FF"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#0396FF")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#D3449A"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#D3449A")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#E96D71"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#E96D71")}}/>
            <TouchableOpacity style={[styles.colorView,{backgroundColor:"#3CC531"}]} onPress={()=>{setChooseColor(false),setSelectedColor("#3CC531")}}/>
            </View>:null
            }
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setCategoryEditVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editCategories(syncedEmail, selectedCategory,selectedColor)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>


        <Modal isOpen={createCategoryVisible} onClose={() => setCreateCategoryVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>

            <Modal.Body>
              <Text style={styles.modalHeader}>Create New Category</Text>
              <View style={styles.editCategoryModalContainer}>
                <TextInput placeholder="Input Here" style={{marginLeft:10,flex:1}}/>
            </View>
            <View style={styles.modalConfirmationOptionsContainer}>
                <TouchableOpacity onPress={() => setCreateCategoryVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, paddingHorizontal: 20, color: "#3584EF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateCategoryVisible(false)}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#3584EF" }}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        </SafeAreaView>
        </NativeBaseProvider>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
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
    plusButton:{
        alignSelf:"flex-end",
        alignItems:"center"
    },
    rowBack: {
        height: 40,
        marginVertical: 12,
        alignItems: "center",
        alignSelf:"center",
        justifyContent: "center",
        flex:1,
        borderRadius: 15,
        backgroundColor:"#F5F5F5",
        width: width * 0.89
      },
      
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 54,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    
      },
      backRightBtnRight: {
        backgroundColor: '#FF5F38',
        alignSelf:"center",
        right: 0,
      },
      backTextWhite: {
        color: 'white',
      },
      selectButton: {
        position: 'absolute',
        right: 54,
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: '100%',
        backgroundColor: '#569AFF',
        width:54,
      },
      selectButtonText: {
        color: 'white',
      },
      modalHeader:{
        paddingBottom:"10%",
        fontSize:16,
        fontWeight:600
      },
      modalConfirmationOptionsContainer:{
        flexDirection:"row",
        alignSelf:"flex-end",
        paddingTop:20
      },
      editCategoryModalContainer:{
        flex:1,
        flexDirection:"row",
        height:44,
        alignItems:"center",
        backgroundColor:"#F5F5F5",
        borderRadius:10
      },
      chooseColorContainer:{
        flexDirection:"row",
        paddingTop:20,
        alignItems:"center"
      },
      chooseColorText:{
        fontSize:14,
        fontWeight:500,
        flex:1
      },
      colorView:{
        height:20,
        width:20,
        borderRadius:10
      },
      categoryColorsView:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:width*0.6,
        marginTop:20
      }
})
export default ManageCategoriesScreen
