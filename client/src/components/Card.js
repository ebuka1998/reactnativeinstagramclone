import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//dots-three-vertical
const Card = (props) => {
    const [lines, setLines] = useState(2)
    const [w, setW] = useState(55)
    return (
        <SafeAreaView>
            <View style={styles.card__header}>
               <View style={styles.card__headerImage}>
                    <Image 
                        source={{uri: props.user_image}}
                        style={styles.imageCardHeader}
                    />
                    <TouchableOpacity
                        onPress = {props.onNavigate}
                    
                    >
                        <Text style={styles.text1}>{props.username}</Text>
                    </TouchableOpacity>
                    
               </View>
                <Entypo name="dots-three-vertical" size={18} style={styles.header__icon}/>
            </View>
            <View >
                <Image 
                    source={{uri: props.post_image}}
                    style={styles.imageCard}
                />
            </View>
            <View style={styles.comments__section}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', margin: 10}}>
                    <Feather 
                        name="heart" 
                        size={25} 
                        style={{marginRight: 20}}
                        onPress={props.onLike}
                    />
                    <FontAwesome name="comment-o" size={25} style={{marginRight: 20}}/>
                    <Entypo name="share" size={25} style={{marginRight: 20}}/>
                </View>

                <View style={{margin: 10, marginTop: 5, flexDirection: 'row'}}> 
                    <Text style={{paddingRight: 10, fontWeight: 'bold'}}>{props.likes}</Text> 
                    <Text >likes</Text>
                </View>

                <View style={{margin: 10, marginTop: 1, flexDirection: 'row'}}>
                    <Text ellipsizeMode="tail" numberOfLines={lines} 
                        style={{width:Dimensions.get("screen").width-w,}}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 15, marginRight: 5}}>{props.username} {'  '}</Text>
                        <Text 
                            style={{    
                                width: Dimensions.get("screen").width,
                                fontSize: 16,
                                fontFamily: 'Roboto-Thin',
                                lineHeight: 23
                        
                            }}
                           >
                           {props.description}
                        </Text>
                       
                    </Text> 
                    {/* <TouchableOpacity onPress={() => {
                        setLines(120)
                        setW(0)
                    }}>
                      <Text style={{marginTop: 28}}> {lines === 2 ? 'more' : ''}</Text>
                    </TouchableOpacity> */}
                  
                </View>

                <View style={{margin: 10, marginTop: 5}}>
                    <Text style={{paddingRight: 10, color: 'grey'}}>
                        view all 1 comments
                    </Text> 
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    card__header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: 'white'
    },
    card__headerImage: {
        flexDirection: 'row',
        margin: 10
    },

    imageCardHeader: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#F08080',
        borderWidth: 3,
        borderWidth: 1,
        
    },
    text1: {
        marginLeft: 10,
        fontSize: 16,
        marginTop: 8
    },

    header__icon: {
        margin: 15,
        marginTop: 20
    },
    imageCard: {
        width: Dimensions.get('window').width,
        height: 400,
        resizeMode: "stretch",
        marginTop: 0

    },
    comments__section: {
        display: 'flex',
        backgroundColor: 'white'
    }
})

export default Card
