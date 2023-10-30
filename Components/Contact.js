import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity ,StyleSheet} from "react-native";
import ContactComponentStyles from "../Styles/ContactComponentStyles";

const Contact = ({ contact, onSelectContact }) => {
  const [selected, setSelected] = useState(false);

  const handleContactPress = () => {
    setSelected(!selected);
    onSelectContact(contact.id, !selected);
  };

  return (
    <TouchableOpacity onPress={handleContactPress} style={{ backgroundColor: selected ? "#F0F0F0" : "transparent"}}>    
            <View style={ContactComponentStyles.container}>
        <Image
          source={contact.image}
          style={ContactComponentStyles.image}
        />
        <View>
          <Text style={ContactComponentStyles.name}>{contact.name}</Text>
          <Text
            style={ContactComponentStyles.number}
          >
            {contact.number}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Contact;
