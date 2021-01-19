import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const StatusImage = () => {
    return (
        <View style={styles.image__container}>
            <Image 
                style={styles.image} 
                source={require('../../assets/images/image.jpg')}
            />
            <Text style={styles.text__image}>hello react</Text>
        </View>

    )
}



const styles = StyleSheet.create({
    image__container: {
        width: 100,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#F08080',
        borderWidth: 5,
        borderWidth: 2,
        
    },

    text__image: {
        marginRight: 20,
        fontSize: 13,
        textAlign: 'center'
    }
})

export default StatusImage
