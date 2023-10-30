import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Text,View,StyleSheet,SafeAreaView,StatusBar,FlatList,TouchableOpacity,Image,TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Contacts from "../../Contacts";
import Contact from "../../Components/Contact";
import createcontact from "../../assets/Images/createcontact.png";
import { AntDesign } from "@expo/vector-icons";
import ContactWhitelist from "../../Components/ContactWhitelist";
import AddContactsScreenStyles from "../../Styles/AddContactsScreenStyles";

const AddContactsScreen = () => {
  const navigation = useNavigation();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchSelected, setSearchSelected] = useState(false);

  const searchBack = () => {
    setSearchInput("");
    setSelectedContacts([]);
    setSearchSelected(false);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const handleSelectContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const isContactSelected = (contactId) => {
    return selectedContacts.includes(contactId);
  };

  const filteredContacts = Contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={AddContactsScreenStyles.header}>
        {searchSelected ? (
          <View style={AddContactsScreenStyles.searchSelected}>
            <View style={AddContactsScreenStyles.searchContent}>
              <TouchableOpacity onPress={searchBack} style={{ paddingHorizontal: 10 }}>
                <Ionicons name="arrow-back" size={20} color="black" />
              </TouchableOpacity>
              <TextInput style={{ fontSize: 15, width: "95%" }} onChangeText={(text) => setSearchInput(text)} value={searchInput} placeholder="Search"/>
            </View>
          </View>
        ) : (
          <>
            <View style={AddContactsScreenStyles.searchNotSelected}>
              <TouchableOpacity style={AddContactsScreenStyles.backButton} onPress={goBack}>
                <Ionicons name="chevron-back" size={24} color="#808080" />
              </TouchableOpacity>
              <Text style={AddContactsScreenStyles.headerTitle}>Add Contacts</Text>
            </View>
            {selectedContacts.length > 0 ? null :
              <TouchableOpacity
                style={AddContactsScreenStyles.selectAllButton}
                onPress={() => setSearchSelected(true)}
              >
                <EvilIcons name="search" size={24} color="#808080" />
              </TouchableOpacity>
            }
          </>
        )}
      </View>

      <FlatList
        data={searchInput !== "" ? filteredContacts : Contacts}
        renderItem={({ item }) => {
          return (
            searchSelected ? <ContactWhitelist contact={item} /> :
              <Contact
                contact={item}
                onSelectContact={handleSelectContact}
                isSelected={isContactSelected(item.id)}
              />

          )
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {!searchSelected && (
        <TouchableOpacity style={AddContactsScreenStyles.createContactButton}>
          {selectedContacts.length > 0 ? (
            <AntDesign name="check" size={24} color="white" />
          ) : (
            <Image source={createcontact} style={AddContactsScreenStyles.createContactIcon} />
          )}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default AddContactsScreen;
