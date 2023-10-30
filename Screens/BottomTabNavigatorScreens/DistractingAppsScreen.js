import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from "react-native";
import DistractingApp from "../../Components/DistractingApp";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DistractingAppsScreenStyles from "../../Styles/DistractingAppsScreenStyles";

const DistractingAppsScreen = () => {
  const initialApps = [
    {
      id: '1',
      appName: "Facebook",
      image: require("../../assets/Images/Facebook.png"),
    },
    {
      id: '2',
      appName: "Instagram",
      image: require("../../assets/Images/Instagram.png"),
    },
    {
      id: '3',
      appName: "Whatsapp",
      image: require("../../assets/Images/WhatsApp.png"),
    },
    {
      id: '4',
      appName: "LinkedIn",
      image: require("../../assets/Images/LinkedIn.png"),
    },
    {
      id: '5',
      appName: "Medium",
      image: require("../../assets/Images/Medium.png"),
    },
  ];
  const [selectedApps, setSelectedApps] = useState([]);
  const [allselected, setAllSelected] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadSelectedAppIds();
    loadAllSelectedState();
  }, []);

  useEffect(() => {
    saveSelectedAppIds();
    saveAllSelectedState();
  }, [selectedApps, allselected]);

  const loadSelectedAppIds = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@selectedAppIds");
      const selectedAppIds = JSON.parse(jsonValue) || [];

      const updatedApps = initialApps.map(app => ({
        ...app,
        selected: selectedAppIds.includes(app.id)
      }));

      setSelectedApps(updatedApps);
    } catch (error) {
      console.error("Error loading selected app IDs:", error);
    }
  };

  const saveSelectedAppIds = async () => {
    try {
      const selectedAppIds = selectedApps.filter(app => app.selected).map(app => app.id);
      await AsyncStorage.setItem("@selectedAppIds", JSON.stringify(selectedAppIds));
    } catch (error) {
      console.error("Error saving selected app IDs:", error);
    }
  };

  const loadAllSelectedState = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@allSelectedState");
      const savedAllSelectedState = JSON.parse(jsonValue);
      setAllSelected(savedAllSelectedState);
    } catch (error) {
      console.error("Error loading 'allselected' state:", error);
    }
  };

  const saveAllSelectedState = async () => {
    try {
      await AsyncStorage.setItem("@allSelectedState", JSON.stringify(allselected));
    } catch (error) {
      console.error("Error saving 'allselected' state:", error);
    }
  };

  const onSelectApp = (appId) => {
    setSelectedApps(prevApps => {
      const updatedApps = prevApps.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            selected: !app.selected
          };
        }
        return app;
      });
      return updatedApps;
    });
  };

  const selectAllApps = () => {
    setAllSelected(true);
    setSelectedApps(prevApps => {
      const updatedApps = prevApps.map(app => ({
        ...app,
        selected: true
      }));
      return updatedApps;
    });
  };

  const deselectAllApps = () => {
    setAllSelected(false);
    setSelectedApps(prevApps => {
      const updatedApps = prevApps.map(app => ({
        ...app,
        selected: false
      }));
      return updatedApps;
    });
  };

  return (
    <SafeAreaView style={DistractingAppsScreenStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

    
      <View style={DistractingAppsScreenStyles.header}>
        <View style={{flexDirection:"row",alignItems:"center",flex:0.99}}>
        <TouchableOpacity style={DistractingAppsScreenStyles.backButton} onPress={navigation.goBack}>
        <Ionicons name="chevron-back" size={24} color="#808080" />
        </TouchableOpacity>
        <Text style={DistractingAppsScreenStyles.headerTitle}>Distracting Apps</Text>
        </View>
        {allselected?
        <TouchableOpacity style={DistractingAppsScreenStyles.selectdeselectAllButton} onPress={deselectAllApps}>
        <MaterialCommunityIcons name="checkbox-multiple-marked" size={24} color="#3584EF" />
        </TouchableOpacity>:<TouchableOpacity style={DistractingAppsScreenStyles.selectdeselectAllButton} onPress={selectAllApps}>
        <MaterialCommunityIcons name="checkbox-multiple-outline" size={24} color="#3584EF"/>
        </TouchableOpacity>
}
      </View>

      <FlatList
        data={selectedApps}
        renderItem={({ item }) => <DistractingApp app={item} onSelectApp={onSelectApp} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};



export default DistractingAppsScreen;
