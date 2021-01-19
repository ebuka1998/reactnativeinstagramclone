import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import AppBar from '../components/AppBar';
import { TextInput, Button} from 'react-native-paper';
import { UserContext } from '../context/userContext';
import BottomPaper from '../components/BottomPaper';
import ImagePicker from 'react-native-image-crop-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import axios from 'axios'

const EditScreen = ({navigation, route}) => {
    const {user} = route.params
    const {updateUser} = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [name, setName] = useState(user.name_of_user)
    const [bio, setBio] = useState(user.bio)
    const [profile_image, setProfile_image] = useState(user.profile_image)

    //functions to get images from camera and gallery
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            //console.log(image);
            setLoading(true)
            let newFile = {
                uri: image.path,
                type: image.mime,
                name: `test/${image.path.split('.')[1]}`,
    
            }
            uploadImage(newFile)

            setLoading(false)
 
            sheetRef.current.snapTo(2)
            
        }).catch(err => console.log(err))
    }
 
    const takePhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            setLoading(true)
            let newFile = {
                uri: image.path,
                type: image.mime,
                name: `test/${image.path.split('.')[1]}`,
    
            }
            uploadImage(newFile)
            setLoading(false)
            sheetRef.current.snapTo(2)
        }).catch(err => console.log(err))
    }


     //function to upload image to cloudinary
     const uploadImage = async (image) => {
        try {
            const data = new FormData()

            data.append('file', image)

            data.append('upload_preset', 'bukason' )

            data.append('cloud_name', 'drfv9xqcl')

            const res = await axios.post('https://api.cloudinary.com/v1_1/drfv9xqcl/image/upload', data)

            const dataa = await res.data

            setProfile_image(dataa.url)

        } catch (error) {
            console.log(error.message)
        }
    }

    const update = () => {
        let dataTOSubmit = {
            name_of_user: name,
            username: username,
            bio: bio,
            profile_image: profile_image,
            
        }

        updateUser(dataTOSubmit)
        navigation.goBack()
    }

    const sheetRef = React.useRef(null);

    const renderContent = () => (
        <BottomPaper  
            onPress={() => sheetRef.current.snapTo(2)}
            onPressCamera={takePhotoFromCamera}
            onPressGallery={takePhotoFromGallery}
            
        />
     );

     const fall = new Animated.Value(1);
    return (
        <ScrollView style={{flex: 1}}>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                initialSnap={2}
                callbackNode={fall}
                renderContent={renderContent}
                enabledGestureInteraction={true}
            />

            <AppBar
                headerTitle="Edit Profile"
                iconName1="arrow-left"
                goBack = {() => navigation.goBack()}
            />

            <Animated.View  style={styles.view}>
                <View style={styles.image__container}>
                    <Image 
                        style={styles.image} 
                        source={{uri: profile_image}}
                    />
                </View>
                <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}>
                    <Text style={styles.text__image}>upload</Text>
                </TouchableOpacity>
                
               <View style={{paddingHorizontal: 20}}>
                <TextInput
                        label="Name"
                        mode="outlined"
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        label="Username"
                        mode="outlined"
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                
                    <TextInput
                        label="Bio"
                        mode="outlined"
                        style={styles.input}
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                    />
                    
                    <Button  mode="contained" style={styles.button} onPress={update}>
                        update
                    </Button>
                
               </View>  
            </Animated.View >
            
        </ScrollView>
    )
}

//Animated.View style={{opacity: Animated.add(0.01, Animated.multiply(fall, 1.0))}}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 80,
        //opacity: Animated.add(0.01, Animated.multiply(1.0))
    },

    header__text: {
        fontSize: 40,
        textAlign: 'center',
        fontStyle: 'italic'
    },

    header__subtext: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20,
        fontFamily: 'consolas',
        marginTop: 5,
        marginBottom: 20
    },
    input: {
        marginBottom: 10
    },
    button: {
        marginTop: 10,
        padding: 10,
        fontSize: 24
    },

    image__container: {
        width: Dimensions.get("screen").width,
        height: 160,
        display: 'flex'
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderColor: '#F08080',
        borderWidth: 5,
        borderWidth: 2,
        //flex:1,
        alignSelf: 'center',

        
    },

    text__image: {
        //marginRight: 20,
        fontSize: 13,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        color: 'blue'
    }
})

export default EditScreen



