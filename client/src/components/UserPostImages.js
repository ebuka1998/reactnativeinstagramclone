import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

const UserPostImages = ({images_of_user}) => {
    return (
        <View style={{flexBasis: '33.333333%'}}>
            <Image 
                style={styles.image} 
                source={{uri: images_of_user}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("screen").width/3,
        height: 130,
        borderColor: 'grey',
        borderWidth: 1,
        
    },
    
})

export default UserPostImages
