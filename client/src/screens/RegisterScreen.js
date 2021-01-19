import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { UserContext } from '../context/userContext';

const RegisterScreen = ({navigation}) => {
    const {registerUser, loading} = useContext(UserContext)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
  //name_of_user, username, user_password, bio
    const register = () => {
        let dataToSubmit = {
            name_of_user: name,
            username: username,
            user_password: password,
            bio: bio
        }

        registerUser(dataToSubmit)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.header__text}>InstaClone</Text>
                <Text style={styles.header__subtext}>
                    Sign up to see phots and videos from your friends
                </Text>

               <View>
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
                    label="Password"
                    mode="outlined"
                    value={password}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    
                />
                <TextInput
                    label="Bio"
                    mode="outlined"
                    value={bio}
                    style={styles.input}
                    onChangeText={(text) => setBio(text)}
                />

                
                <Button  mode="contained" onPress={register} style={styles.button}>
                    Register
                </Button>
                
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={styles.small__text}>already registered? </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.small__text} >login</Text>
                    </TouchableOpacity> 
                </View>
            
               </View>  
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },

    view: {
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 80
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

    small__text: {
        color: 'blue',
        fontSize: 16,
        marginTop: 8,
        marginRight: 5,
        fontSize: 18
    }

})

export default RegisterScreen
