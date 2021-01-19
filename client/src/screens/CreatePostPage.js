import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import AppBar from '../components/AppBar';
import { TextInput, Button } from 'react-native-paper';
import { UserContext } from '../context/userContext';
import { PostContext } from '../context/postContext';

const CreatePostPage = ({ navigation }) => {

    const {user, getUser} = useContext(UserContext)

    const {createPost, imageToUpload} = useContext(PostContext)
    
    const [caption, setCaption] = useState('')

    useEffect(() => {
        getUser()
    }, [])

    const share = () => {
        let dataToSubmit = {
            post_image: imageToUpload && imageToUpload,
            created_by: user && user.user_id,
            post_description: caption
        }
        createPost(dataToSubmit)
        navigation.goBack()   
    }
    
    return (
        <View style={{flex: 1}}>
             <AppBar
                headerTitle="Create post"
                iconName1="arrow-left"
                goBack = {() => navigation.goBack()}
            />

            <View style={styles.image__container}>
                {imageToUpload === ''  ? (<Text>loading...</Text>) : (
                    <Image
                        style={styles.image}
                        source={{uri: imageToUpload && imageToUpload}}
                    />
                )}

            </View>

            <View style={{marginHorizontal: 20}}>
                <TextInput
                    label="add caption"
                    value={caption}
                    onChangeText={(text) => setCaption(text)}
                    mode="outlined"
                    style={styles.input}
                    multiline={true}
                />

                <Button  mode="contained" style={styles.button} onPress={share}>
                   Share
                </Button>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    image__container: {
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40
    },

    image: {
        width: 200,
        height: 200,
        marginLeft: 100
    },

    input: {
        marginBottom: 10,
        marginTop: 10
    },
    button: {
        marginTop: 10,
        padding: 5,
        fontSize: 24
    },
})

export default CreatePostPage
