import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import ContactWhitelistComponentStyles from "../Styles/ContactWhitelistComponentStyles";

const ContactWhitelist = ({contact}) => {
 

  return (    
            <View
        style={ContactWhitelistComponentStyles.container}
      >
        <Image
          source={contact.image}
          style={ContactWhitelistComponentStyles.image}
        />
        <View>
          <Text style={ContactWhitelistComponentStyles.name}>{contact.name}</Text>
          <Text
            style={ContactWhitelistComponentStyles.number}
          >
            {contact.number}
          </Text>
        </View>
      </View>
  );
};


export default ContactWhitelist;
