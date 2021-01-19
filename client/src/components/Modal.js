import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal, Portal, Provider } from 'react-native-paper';

const Modaal = ({visible, hideModal, cancle, unFollow, image, name, username}) => {

    const containerStyle = {
        backgroundColor: 'white', 
        //padding: 60,
        width: Dimensions.get("screen").width/1.5,
        height: 300,
        marginLeft: Dimensions.get("screen").width- 340
 
        //marginTop: 40

    };
    return (
        <Provider>
            <Portal>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                       <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={styles.image__container}>
                                <Image 
                                    style={styles.image} 
                                    source={{uri: image}}
                                />
                            </View>
                            <View>
                                <Text  style={{textAlign: 'center'}}>{name}</Text>
                                <Text style={{textAlign: 'center'}}>{username}</Text>
                            </View>
                       </View>
                       <View style={{marginTop: 40}}>
                            <TouchableOpacity onPress={unFollow}>
                                <View style={{marginBottom: 5}}>
                                    <Text style={{textAlign: 'center', color: 'blue'}}>unfollow</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={cancle}>
                                <View style={{marginTop: 10}}>
                                    <Text style={{textAlign: 'center', color:'red'}}>cancle</Text>
                                </View>
                            </TouchableOpacity>
        
                       </View>
                    </Modal>
                </View>
            </Portal>
        </Provider>
    )
}


const styles = StyleSheet.create({
    image__container: {
        width: 100,
        height: 100,
       
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#F08080',
        borderWidth: 5,
        borderWidth: 2,
        marginLeft:10
        
    }
})

export default Modaal
