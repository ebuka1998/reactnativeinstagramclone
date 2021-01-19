import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

//"camera"
//""
const AppBar = ({headerTitle, iconName1, iconName2, onPress, goBack}) => {
    return (
        <View style= {styles.header}>
            <View style={styles.header__title}>
                <FontAwesome
                    name={iconName1} 
                    style={styles.header__icon1} size={24}
                    onPress = {goBack}
                />
                <Text style={styles.header__text}>{headerTitle}</Text>
            </View>

            
            <View>
                <FontAwesome 
                    name={iconName2} 
                    style={styles.header__icon2} 
                    size={28}  
                    onPress={onPress}
                />
            </View>
            
        </View>
    )
}




const styles = StyleSheet.create({
    header:{
        //position:"absolute",
        top:0,
        left:0,
        right:0,
        height: 60,
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-between",
        elevation:0,
    },

    header__title: {
        flexDirection: 'row',
        marginTop: 12,
    },

    header__text: {
        marginLeft: 10,
        fontSize: 24,
        fontFamily: 'DancingScript-Regular',
        color: "black",
    },

    header__icon1: {
        color: 'black',
        marginLeft: 10,
        marginTop: 8
    },  

    header__icon2: {
        color: 'black',
        marginRight: 10,
        marginTop: 20
    }
})
export default AppBar
