import React, { createContext, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/url';
import setToken from '../utils/setToken';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext()

export const UserContextProvider = (props) => {
    //states
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [auser, setAUser] = useState({})
    const [users, setUsers] = useState([])
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [pass, setPass] = useState('')
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [AUserFollowers, setAUserFollowers] = useState([])
    const [AUserFollowing, setAUserFollowing] = useState([])
    const [followed, setFollowed] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [searchedUsers, setSearchedUsers] = useState([])


    


    //functions

    const registerUser = async (dataToSubmit) => {
        try {
            const {data} = await axios.post(`${baseUrl}/createUser`, dataToSubmit)
            if(data){
                await AsyncStorage.setItem('insta_user', data.token)
            }

            setIsSignedIn(true)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const loginUser = async (dataToSubmit) => {
        try {
            setLoading(true)
            const {data} = await axios.post(`${baseUrl}/loginUser`, dataToSubmit)
            if(data) {
                await AsyncStorage.setItem('insta_user', data.token)
            }
            setIsSignedIn(true)
            setLoading(false)
            
        } catch (error) {
            console.log(error.message, 'login unsuccessful')
            setLoading(false)
        }
    }

    
    const getUser = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/getUser`)
            setUser(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getAUser = async (id) => {
        try {
            
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/getAUser/${id}`)
            //console.log(data)
            setAUser(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (dataToSubmit) => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            
            const {data} = await axios.put(`${baseUrl}/update`, dataToSubmit)
            console.log(data)
            setUpdated(true)
        } catch (error) {
            console.log(error)
        }
    }

    // const getUsers = async () => {
    //     try {
    //         let token = await AsyncStorage.getItem('insta_user')
    //         if(token){
    //             setToken(token)
    //         }
    //         setLoading(true)
    //         const {data} = await axios.get(`${baseUrl}/getUsers`)
    //         // const v = JSON.stringify(data, null, 2);
    //         // console.log(v)
    //         setUsers(data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const followUser = async (dataToSubmit) => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            const {data} = await axios.post(`${baseUrl}/follow`, dataToSubmit)
            setFollowed(true)
            setFollowed(false)
        } catch (error) {
            console.log(error.message, 'error happened')
        }
    }

    const unfollowUser = async (dataToSubmit) => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            const {data} = await axios.post(`${baseUrl}/unfollow`, dataToSubmit)
            setFollowed(true)
            setFollowed(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    const userFollowers = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            const {data} = await axios.get(`${baseUrl}/followers`)
            const v = JSON.stringify(data, null, 2);
            //console.log(v)
            setFollowers(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const userFollowing = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            const {data} = await axios.get(`${baseUrl}/following`)
            //const v = JSON.stringify(data, null, 2);
            //console.log(v)
            setFollowing(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const AuserFollowers = async (id) => {
        try {
           
            const {data} = await axios.get(`${baseUrl}/AUserfollowers/${id}`)
            // const v = JSON.stringify(data, null, 2);
            // console.log(v)
            setAUserFollowers(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const AuserFollowing = async (id) => {
        try {
            
            const {data} = await axios.get(`${baseUrl}/AUserfollowing/${id}`)
            // const v = JSON.stringify(data, null, 2);
            // console.log(v)
            setAUserFollowing(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const searchUsers = async (username) => {
        try {
            const {data} = await axios.get(`${baseUrl}/searchUser?username=` + username)
                if(username.length < 1){
                    setSearchedUsers([])
                    console.log('it is empty')
                }
                setSearchedUsers(data)
            //  const v = JSON.stringify(data, null, 2);
            //  console.log(v)
        } catch (error) {
            console.log(error.message)
        }
    }


    return(
        <UserContext.Provider
        
            value={{
                user,
                loading,
                isSignedIn,
                pass,
                users,
                followers,
                following,
                followed,
                updated,
                AUserFollowers,
                AUserFollowing,
                auser,
                searchedUsers,
                setUsers,
                setLoading,
                registerUser,
                loginUser,
                setIsSignedIn,
                getUser,
                //getUsers,
                setPass,
                followUser,
                unfollowUser,
                userFollowers,
                userFollowing,
                updateUser,
                getAUser,
                AuserFollowers,
                AuserFollowing,
                searchUsers,
                
                
                

            }}
        
        >
            {props.children}
        </UserContext.Provider>
    )
}