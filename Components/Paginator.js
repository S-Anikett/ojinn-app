import React from "react"
import {Text,View,StyleSheet,Animated,useWindowDimensions} from "react-native"
const Paginator=({data,scrollx})=>{
    const {width}=useWindowDimensions()
return(
<View style={{flexDirection:"row",height:64}}>
    {data.map((_, i)=>{
        const inputRange=[(i-1)*width,i*width,(i+1)*width]
        const dotWidth=scrollx.interpolate({
            inputRange,
            outputRange:[10,20,10],
            extrapolate:"clamp"
        })
        const opacity=scrollx.interpolate({
            inputRange,
            outputRange:[0.1,1,0.1],
            extrapolate:"clamp"
        })
        return <Animated.View style={[styles.dot,{width:dotWidth,opacity}]} key={i.toString()}/>
    })}

</View>
)


}
const styles=StyleSheet.create({
    dot:{
        height:10,
        borderRadius:5,
        backgroundColor:"#3584EF",
        marginHorizontal:8
    }
})
export default Paginator