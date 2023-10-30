import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Contacts from "../../SelectedContacts";
import ContactWhitelist from "../../Components/ContactWhitelist";
import WhitelistContactsScreenStyles from "../../Styles/WhitelistContactsScreenStyles";

const WhitelistContactsScreen = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />


      <View style={WhitelistContactsScreenStyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 0.99 }}>
          <TouchableOpacity style={WhitelistContactsScreenStyles.backButton} onPress={goBack}>
            <Ionicons name="chevron-back" size={24} color="#808080" />
          </TouchableOpacity>
          <Text style={WhitelistContactsScreenStyles.headerTitle}>Whitelist Contacts</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("AddContactsScreen")} style={WhitelistContactsScreenStyles.selectAllButton}>
          <AntDesign name="plus" size={20} color="#808080" />
        </TouchableOpacity>
      </View>

      <FlatList data={Contacts} renderItem={({ item }) => { return <ContactWhitelist contact={item} /> }} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};
export default WhitelistContactsScreen;
