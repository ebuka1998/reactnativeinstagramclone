import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Indicator = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default Indicator
