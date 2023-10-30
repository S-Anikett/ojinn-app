import React from "react";
import {Text,View,Dimensions,StyleSheet} from "react-native"
import { Skeleton } from "native-base";
const screenWidth = Dimensions.get("window").width;

const WorkingHoursLoader=()=>{
    return(
        <View style={styles.container}>
            <View style={{flex:0.15}}>
            <Skeleton h="1" />
            <Skeleton h="1" mt="4"/>
            </View>
            <View style={{flex:0.2,marginLeft:30}}>
            <Skeleton.Text  lines={1}/>
            </View>
            </View>
    )
}
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
      width: screenWidth * 0.86,
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

export default WorkingHoursLoader