import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const UserSearchCard = ({p_image, name, username, onNavigate}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={styles.image__container}>
                <Image 
                    style={styles.image} 
                    source={{uri: p_image}}
                />
            </View>
            <View style={styles.text_container}>

                <TouchableOpacity onPress={onNavigate}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}} numberOfLines={2} ellipsizeMode="tail">
                        {name}
                    </Text>
                </TouchableOpacity>
                
                <Text>{username}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    image__container: {
        width: 70,
        height: 70,
        display: 'flex',
        justifyContent: 'space-evenly',
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#F08080',
        borderWidth: 5,
        borderWidth: 2,
        
    },

    text_container: {
        marginTop: 10,
        marginLeft: 8
    },

})

export default UserSearchCard
