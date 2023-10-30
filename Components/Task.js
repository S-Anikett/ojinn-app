import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import TaskComponentStyles from "../Styles/TaskComponentStyles";

const screenWidth = Dimensions.get("window").width;

const Task = ({ task }) => {
  return (
    <View style={[TaskComponentStyles.container,{ marginLeft: screenWidth * 0.05,
      marginRight: screenWidth * 0.05,
      width: screenWidth * 0.9,}]}>
      <View style={[TaskComponentStyles.colorBar,{backgroundColor:task.color}]} />
      <Text style={TaskComponentStyles.taskText}>{task.title}</Text>
    </View>
  );
};



export default Task;