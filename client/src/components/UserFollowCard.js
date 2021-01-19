import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';

const UserFollowCard = ({p_image, name, username, textToFollow, follow, onNavigate}) => {
    return (
        <View style={styles.container}>
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
            
           
            <View style={styles.button_container}>
                <Button  mode="contained" onPress = {follow}>
                    {textToFollow}
                </Button> 
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
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

    button_container: {
        //marginLeft: 80,
        marginTop: 10,
        width: 150
    }

})

export default UserFollowCard
