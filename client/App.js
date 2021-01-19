import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import { UserContextProvider, UserContext } from './src/context/userContext';
import { PostContextProvider } from './src/context/postContext';
import CreatePostPage from './src/screens/CreatePostPage';
import SplashScreen from './src/screens/SplashScreen';
import EditScreen from './src/screens/EditScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';




const HomeStack = createStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <HomeStack.Screen name="create" component={CreatePostPage} options={{headerShown: false}} />
      <HomeStack.Screen name="userprofile" component={UserProfileScreen} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator()

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="explore" component={ExploreScreen} options={{headerShown: false}}/>
      <ExploreStack.Screen name="userprofile" component={UserProfileScreen} options={{headerShown: false}}/>
    </ExploreStack.Navigator>
  )
}

const ActivityStack = createStackNavigator()

function ActivityStackScreen() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="activity" component={ActivityScreen} options={{headerShown: false}}/>
      <ActivityStack.Screen name="userprofile" component={UserProfileScreen} options={{headerShown: false}}/>
    </ActivityStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="profile" component={ProfileScreen} options={{headerShown: false}}/>
      <ProfileStack.Screen name="edit" component={EditScreen} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
  )
}


const Tab = createBottomTabNavigator()
function HomeTabs() {
  return (
    <Tab.Navigator
      
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
        } else if (route.name === 'explore') {
          iconName = focused ? 'search' : 'search-outline';
        }else if(route.name === 'activity'){
          iconName = focused ? 'ios-heart-sharp' : 'ios-heart-outline'
        }else if(route.name === 'profile'){
          iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline'
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false,
      keyboardHidesTabBar: true,

    }}
    
    
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="explore" component={ExploreStackScreen} />
      <Tab.Screen name="activity" component={ActivityStackScreen} />
      <Tab.Screen name="profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()
 function Jsx() {
  //const [] =  useState('')
  const {isSignedIn, pass, setPass} = useContext(UserContext)
  const [loading, setLoading] =  useState('')


  const getToken = async () => {
    try {
      setLoading(true)
      let auth
      auth = await AsyncStorage.getItem('insta_user')
      if(auth){
        setPass(auth)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getToken()
  }, [pass])

  if (loading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />
 }

  return (
      <NavigationContainer>
        
        <Stack.Navigator>
          {
            isSignedIn || pass ? (
              <>
                <Stack.Screen name="home" component={HomeTabs} options={{headerShown: false}}/>
              </>
            ): (
              <>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
              </>
            )
          }
          
         
        </Stack.Navigator>
      </NavigationContainer>
  )
}


const App = () => {
  return(
    <PostContextProvider>
    <UserContextProvider>
      <Jsx/>
    </UserContextProvider>
    </PostContextProvider>
  )
}

export default App

