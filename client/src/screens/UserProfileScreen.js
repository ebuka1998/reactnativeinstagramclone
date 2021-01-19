import React, {useContext, useEffect} from 'react'
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, FlatList } from 'react-native'
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/userContext';
import AppBar from '../components/AppBar';
import UserPostImages from '../components/UserPostImages';
import { PostContext } from '../context/postContext';
import Indicator from '../components/Indicator';

const UserProfileScreen = ({navigation, route}) => {
    const {id} = route.params
    const {getAUser, auser, loading, AUserFollowers, AUserFollowing, AuserFollowers, AuserFollowing} = useContext(UserContext)
    const {getAUserPostsImages, auserImages} = useContext(PostContext)


    useEffect(() => {
        getAUser(id)
        AuserFollowing(id)
        AuserFollowers(id)
        getAUserPostsImages(id)
    }, [])


    const HeaderComponent = () => (
        <View style={styles.jumbotron}>
            <View style={styles.profile__header}>
                <View>
                    <Image
                        source={{uri: auser && auser.profile_image}}
                        style={styles.profile_image}
                    />
                </View>

                <View style={styles.view__text}>
                    <Text style={styles.header__text}>{auserImages && auserImages.length}</Text>
                    <Text>posts</Text>
                </View>

                <View style={styles.view__text}>
                    <Text style={styles.header__text}>{AUserFollowers && AUserFollowers.length}</Text>
                    <Text>Followers</Text>
                </View>

                <View style={styles.view__text}>
                    <Text style={styles.header__text}>{AUserFollowing && AUserFollowing.length}</Text>
                    <Text>Following</Text>
                </View>

            </View>

            <View style = {styles.bio__text}>
                <Text style={styles.name}>{auser && auser.name_of_user}</Text>
                <Text 
                    ellipsizeMode="tail" 
                    numberOfLines={2} 
                    style={{width:Dimensions.get("screen").width,}}
                >
                    {auser && auser.bio}
                </Text>
            </View>

            <View style={{marginHorizontal: 20, marginBottom: 35}}>
                {/* <Button  mode="contained" style={styles.button}>
                   FOLLOW
                </Button> */}
            </View>
        </View>
    )


    return (
        <SafeAreaView style={styles.container}>
            {
                loading ? <Indicator/> : (
                    <>
                         <AppBar
                            headerTitle={auser && auser.username} 
                            iconName1="camera"
                            iconName1="arrow-left"
                            goBack = {() => navigation.goBack()}
                        />
            
                        <View>
               
                            <FlatList
                                style={{marginBottom: 60}}
                                showsVerticalScrollIndicator = {false}
                                data={auserImages && auserImages}
                                key={'#'}
                                renderItem={({ item }) => (
                                    auserImages && auserImages.length === 0 ? (<View style={{flex: 1}}><Text>no images</Text></View>) :
                                    <UserPostImages
                                        images_of_user = {item.post_image}
                                
                                    />  
                                )}
                                numColumns={3}
                                keyExtractor={item => '#' + item.post_id}
                                ListHeaderComponent={HeaderComponent}
                            />      
                                
                            
                        </View>
                    
                    
                    </>
                )
            }
           
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    jumbotron: {
        borderBottomWidth: 0.7,
        borderBottomColor: 'grey'
    },

    profile__header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8
    },

    profile_image: {
        height: 100,
        width: 100,
        borderRadius: 50
    },

    view__text: {
        marginTop: 25
    },

    header__text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },

    bio__text: {
        marginHorizontal: 20
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    button: {
        marginTop: 20,
        padding: 3,
        fontSize: 24
    },

   image__container: {
        flex: 1,
        display: 'flex', 
        flexDirection: 'row', 
        width:Dimensions.get("screen").width, 
        marginTop: 10, 
        flexWrap: 'wrap'
   }
})
export default UserProfileScreen
