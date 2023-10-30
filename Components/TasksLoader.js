import React from "react";
import {View,Text,StyleSheet,Dimensions} from "react-native"
import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
const width = Dimensions.get("window").width;

const TasksLoader = () => {
  return (
    <View activeOpacity={1} onPress={()=>navigation.navigate("TaskDetailsScreen")}style={styles.container}>
    <HStack  space={4} rounded="md">
        <Skeleton style={styles.iconContainer} alignSelf="center" startColor="coolGray.100" />
        <VStack flex="2" space="1">
          <Skeleton startColor="coolGray.100"/>
        </VStack>
      </HStack>
  </View>
    )
};
const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "#F5F5F5",
      height: 50,
      marginVertical: 10,
      flexDirection: "row",
      width: width * 0.9,
      alignSelf: "center",
      alignItems: "center",
      padding: 15,
      borderRadius: 15,
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
  
export default TasksLoader
    