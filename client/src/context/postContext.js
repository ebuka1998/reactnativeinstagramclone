import React, { createContext, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/url';
import setToken from '../utils/setToken';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const PostContext = createContext()


export const PostContextProvider = (props) => {

    const [posts, setPosts] = useState([])
    const [userImages, setUserImages] = useState([])
    const [auserImages, setAUserImages] = useState([])
    const [created, setCreated] = useState(false)
    const [liked, setLiked] = useState(false)
    const [imageToUpload, setImageToUpload] = useState('')
    const [loading, setLoading] = useState(false)


    const createPost = async (dataToSubmit) => {
        try {
           
            await axios.post(`${baseUrl}/createPost`, dataToSubmit)
            setCreated(true)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getPosts = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/getPosts`)
            setPosts(data.rows)
            setLoading(false)
        } catch (error) {
            console.log(error.message)   
        }
    }

    const getUserPostsImages = async () => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            setLoading(true)
            const {data} = await axios.get(`${baseUrl}/getUserPostsImages`)
            //console.log(data)
            setUserImages(data)
            setLoading(false)
            setCreated(true)
        } catch (error) {
            console.log(error.message)   
        }
    }

    const getAUserPostsImages = async (id) => {
        try {
           
            const {data} = await axios.get(`${baseUrl}/getAUserPostsImages/${id}`)
            //console.log(data)
            setAUserImages(data)

        } catch (error) {
            console.log(error.message)   
        }
    }

    const likePost = async (dataToLike) => {
        try {
            let token = await AsyncStorage.getItem('insta_user')
            if(token){
                setToken(token)
            }
            const {data} = await axios.post(`${baseUrl}/likePost`, dataToLike)
            
            setLiked(true)
            console.log(data)
            setLiked(false)
           
        } catch (error) {
            console.log(error.message)
        }
    }

  



    return(
        <PostContext.Provider
            value={{
                posts,
                created,
                liked,
                imageToUpload,
                userImages,
                auserImages,
                loading,
                getPosts,
                createPost,
                getUserPostsImages,
                setImageToUpload,
                likePost,
                getAUserPostsImages
               
            }}
        
        >
            {props.children}
        </PostContext.Provider>
    )
}