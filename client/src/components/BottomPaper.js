import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';

const BottomPaper = ({onPress, onPressCamera, onPressGallery, loading}) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        
        >
            
            <Text style={{textAlign: 'center', paddingTop: 20, fontSize: 20}}>Choose image</Text>

            <View style={{marginTop: 50}}>
                <Button onPress={onPressCamera} mode="contained" style={{padding: 8, marginBottom: 10}}>
                    {loading ? 'processing' : 'camera'}
                </Button>

                <Button onPress={onPressGallery} mode="contained" style={{padding: 8, marginBottom: 10}}>
                    gallery
                </Button> 

                <Button onPress={onPress} mode="contained" style={{padding: 5, marginBottom: 20, backgroundColor: 'red'}}>
                    cancle
                </Button>            
            </View>
            
        </View>
    )
}

export default BottomPaper
