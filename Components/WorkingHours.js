import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const WorkingHours = ({ Hour }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>{Hour.start}</Text>
                <Text>{Hour.end}</Text>
            </View>
            <View style={[styles.colorBar,{backgroundColor:Hour.color}]}/>
          <Text style={styles.taskText}>{Hour.category}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#F5F5F5",
        paddingHorizontal: 10,
        marginVertical:10,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05,
        width: screenWidth * 0.9,
        alignItems:"center"
      },
      colorBar: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left:50,
        width: "1.5%",
      },
      taskText: {
        fontWeight: "500",
        fontSize: 14,
        marginLeft: "4%",
        paddingHorizontal:10,
        flex: 1,
      },
    });

export default WorkingHours;
