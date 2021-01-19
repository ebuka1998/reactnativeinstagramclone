import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { UserContext } from '../context/userContext';
import AppBar from '../components/AppBar';
import UserFollowCard from '../components/UserFollowCard';
import Indicator from '../components/Indicator';
import setToken from '../utils/setToken';
import axios from 'axios'
import { baseUrl } from '../utils/url';
import Modaal from '../components/Modal';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityScreen = () => {
    const navigation = useNavigation()
    const {users, setUsers, followUser, unfollowUser, userFollowing,following, loading, setLoading, followed} = useContext(UserContext)
   
    const getUsers = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/getUsers`)
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

   //mapping through the the users user is following to get the user_id
   const m = following && following.map(x => x.user_id)

    useEffect(() => {
        getUsers()
    }, [])

   useEffect(() => {
        userFollowing()
   }, [followed])

   const [visible, setVisible] = useState(false);
   const [userToUnfollow, setUserToUnfollow] = useState({})

    const follow = (user_id) => {
        if(m.includes(user_id)){
            console.log('i am following')
            const filtered = following.filter(f => f.user_id === user_id)
            if(filtered){
                setUserToUnfollow(filtered[0])
                setVisible(true);
            }

        }else{
            let dataToSubmit = {
                user_id: user_id
            }
            followUser(dataToSubmit)
        }    
    }

    const unFollow = () => {
        let dataToSubmit = {
            user_id: userToUnfollow.user_id
        }
        
        unfollowUser(dataToSubmit)
        setVisible(false)
    }

    const hideModal = () => setVisible(false);

    return (
        <View style={{flex: 1}}>
            <AppBar headerTitle='Activity'/>
            {
                loading ? <Indicator/> : (
                    <View style={{marginTop: 10, marginHorizontal: 5}}>
                    {/* <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold'}}> 
                        Suggestions for you 
                    </Text> */}
                    <FlatList
                        style={{marginBottom: 60}}
                        showsVerticalScrollIndicator = {false}
                        data={users && users}
                        renderItem={({ item }) => (
                            <UserFollowCard
                                p_image={item.profile_image}
                                name={item.name_of_user}
                                username={item.username}
                                textToFollow={m.includes(item.user_id) ? 'following' : 'follow'}
                                follow = {() => follow(item.user_id)}
                                onNavigate={() => navigation.navigate('userprofile', {id: item.user_id})}
                            />
                        )}
                        keyExtractor={item => item.user_id}
                    />

                  
                    </View>
                    
                )
            }

            <Modaal 
                visible={visible} 
                hideModal={hideModal}
                cancle={hideModal}
                unFollow={unFollow}
                name={userToUnfollow.name_of_user}
                username={userToUnfollow.username}
                image={userToUnfollow.profile_image}            
            />    
        </View>
    )
}

export default ActivityScreen
