import {View, Text,Button } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Setting = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Setting</Text>
            <TouchableOpacity onPress={() => navigation.navigate("pdf")}>

                <Icon name="file-pdf-o" size={35} color="#900" />
            </TouchableOpacity>
            
        </View>
                            
            
        
    )
}

export default Setting