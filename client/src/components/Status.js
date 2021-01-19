import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import StatusImage from './StatusImage';

const Status = () => {
    return (
       <View style={{marginTop: 1, backgroundColor: 'white'}}>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 10, marginHorizontal: 4}}

        >
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
            <StatusImage/>
        
        </ScrollView>
       </View>
    )
}

export default Status
