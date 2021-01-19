import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { UserContext } from '../context/userContext';

const LoginScreen = ({navigation}) => {
    const {loginUser, loading} = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login =  () => {
        let dataToSubmit = {
            username: username,
            user_password: password,
        }

        loginUser(dataToSubmit)

    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.header__text}>InstaClone</Text>
                <Text style={styles.header__subtext}>
                    Login to see phots and videos from your friends
                </Text>

               <View>
           
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
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
             
                <Button  mode="contained" onPress={login}  style={styles.button}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={styles.small__text}>not registered? </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('register')}>
                            <Text style={styles.small__text} >register</Text>
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
        marginTop: 150
    },

    header__text: {
        fontSize: 40,
        textAlign: 'center'
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

export default LoginScreen
