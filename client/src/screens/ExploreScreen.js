import React, {useContext, useEffect, useState} from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'
import AppBar from '../components/AppBar';
import {search} from 'react-native-vector-icons/FontAwesome'
import { UserContext } from '../context/userContext';
import UserSearchCard from '../components/UserSearchCard';

const ExploreScreen = ({navigation}) => {
    const {searchUsers, searchedUsers} = useContext(UserContext)
    const [value, onChangeText] = useState('');
    const [focus, setFocus] = useState(true);

    const searchAuser = () => {
        searchUsers(value)
    }

    useEffect(() => {
        setFocus(true)
        searchAuser()
    }, [value])

    console.log(searchedUsers && searchedUsers)

    return (
        <View style={{flex: 1}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                placeholder='search users'
                value={value}
                autoFocus={focus}
                inlineImageLeft={search}
                //onKeyPress={searchAuser}
            />


                    <View style={{marginTop: 10, marginHorizontal: 5}}>
                    {searchedUsers && searchedUsers == [] ? (<Text>searching</Text>): (
                        <FlatList
                         style={{marginBottom: 60}}
                         showsVerticalScrollIndicator = {false}
                         data={searchedUsers && searchedUsers}
                         renderItem={({ item }) => (
                             <UserSearchCard
                                 p_image={item.profile_image}
                                 name={item.name_of_user}
                                 username={item.username}
                                 onNavigate={() => navigation.navigate('userprofile', {id: item.user_id})}
                             />
                         )}
                         keyExtractor={item => item.user_id}
                     />
                    )}
                    
                </View>
        </View>
    )
}

export default ExploreScreen
