import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, SafeAreaView } from 'react-native'
import { Button } from 'react-native-paper';
import AppBar from '../components/AppBar';
import Status from '../components/Status';
import Card from '../components/Card';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { PostContext } from '../context/postContext';
import BottomPaper from '../components/BottomPaper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import { UserContext } from '../context/userContext';
import Indicator from '../components/Indicator';



const HomeScreen = ({navigation}) => {
  
    const sheetRef = React.useRef(null);

    const {posts, getPosts, created, imageToUpload, setImageToUpload, liked, likePost, loading} = useContext(PostContext)

    const {user, getUser, followed} = useContext(UserContext)
    useEffect(() => {
        getPosts()
    }, [created, liked, followed])

    useEffect(() => {
        getUser()
    }, [])
   // const [] = useState('')
    const [setLoading] = useState(false)

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

            if(imageToUpload) {
                navigation.navigate('create')
            }
            
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

            navigation.navigate('create', {imageTaken: imageToUpload})
            
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

            setImageToUpload(dataa.url)

        } catch (error) {
            console.log(error.message)
        }
    }


    const renderContent = () => (
        <BottomPaper  
            onPress={() => sheetRef.current.snapTo(2)}
            onPressCamera={takePhotoFromCamera}
            onPressGallery={takePhotoFromGallery}
            loading={loading}
        
        />
     );

    const fall = new Animated.Value(1)

    return (
        <SafeAreaView style={{flex: 1}}>
            
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
                headerTitle="insta-clone" 
                iconName1="camera"
                iconName2="plus-square-o" 
                onPress={() => sheetRef.current.snapTo(1)}
                goBack={() => navigation.navigate('create')}
            />
             {
                 loading ? <Indicator/> : posts && posts == [] ? (<Text>Follow people</Text>) : (

                    <Animated.View style={{opacity: Animated.add(0.01, Animated.multiply(fall, 1.0))}}>
                        
                        <FlatList
                        style={{marginBottom: 60}}
                        showsVerticalScrollIndicator = {false}
                        data={posts && posts}
                        renderItem={({ item }) => (
                            <Card 
                                user_image={item.profile_image}
                                username = {item.username}
                                post_image={item.post_image}
                                description={item.post_description}
                                likes={item.likescount}
                                onNavigate = {() => navigation.navigate('userprofile', {id: item.user_id})}
                                onLike={() => {
                                    likePost({
                                            post_id: item.post_id,
                                            user_id: user && user.user_id,
                                            username: user && user.username
                                        })
                                    }
                                }
                                    
                                />
                            )}
                            keyExtractor={item => item.post_id}
                            ListHeaderComponent={Status}
                        />
     
                            
                        
                    </Animated.View>
                    
                 )
             }
        </SafeAreaView>
    )
}

export default HomeScreen
