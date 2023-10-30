import React from "react"
import {Text,View,Image,useWindowDimensions,StyleSheet} from "react-native"
import OnBoardingScreenItemComponentStyles from "../Styles/OnBoardingScreenItemComponentStyles"

const OnBoardingScreenItem=({item})=>{
    const {width}=useWindowDimensions()
   
return(
<View style={[OnBoardingScreenItemComponentStyles.container,{width}]}>
   <Image source={item.image} style={[OnBoardingScreenItemComponentStyles.image,{width,resizeMode:"contain"}]}></Image>
   <View style={{flex:0.2}}>
    <Text style={OnBoardingScreenItemComponentStyles.title}>{item.title}</Text>
    <Text style={OnBoardingScreenItemComponentStyles.description}>{item.description}</Text>
   </View>
</View>
)
}

export default OnBoardingScreenItem