import React from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
const width = Dimensions.get("window").width;
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Todo = ({ todo,email }) => {
  function calculateDuration(start, end) {
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);

    const differenceMs = endTime - startTime;
    const durationMinutes = Math.round(differenceMs / 60000)/60;
  
    return durationMinutes.toFixed(2);
  }
  const duration=calculateDuration(todo.start,todo.end)
  const navigation=useNavigation()
  return (
    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate("TaskDetailsScreen",{todo:todo,duration:duration,email:email})}style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: todo.color }]}>
        <Feather name="gift" size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.activity}>{todo.title}</Text>
        <View style={styles.detailsContainer}>
          {todo.dueDate && (
            <View style={styles.detailItem}>
              <AntDesign name="calendar" size={18} color="#808080" />
              <Text style={styles.detailText}>{todo.dueDate}</Text>
            </View>
          )}
          {duration && (
            <View style={styles.detailItem}>
              <AntDesign name="clockcircleo" size={18} color="#808080" />
              <Text style={styles.detailText}>{duration}h</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#F5F5F5",
    height: 70,
    marginVertical: 10,
    flexDirection: "row",
    width: width * 0.9,
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  iconContainer: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  textContainer: {
    paddingHorizontal: 15,
  },
  activity: {
    fontSize: 14,
    fontWeight: "500",
    paddingBottom: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    paddingHorizontal: 5,
  },
});

export default Todo;
