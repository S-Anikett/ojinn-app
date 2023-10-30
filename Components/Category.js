import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import TaskComponentStyles from "../Styles/TaskComponentStyles";

const screenWidth = Dimensions.get("window").width;

const Category = ({ category}) => {
  return (
    <View style={[TaskComponentStyles.container,{ marginLeft: screenWidth * 0.05,
      marginRight: screenWidth * 0.05,
      width: screenWidth * 0.9,}]}>
      <View style={[TaskComponentStyles.colorBar,{backgroundColor:category.color?category.color:"#3584EF"}]} />
      <Text style={TaskComponentStyles.taskText}>{category.category}</Text>

    </View>
  );
};



export default Category;