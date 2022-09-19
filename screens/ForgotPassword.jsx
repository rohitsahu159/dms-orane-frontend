import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forgetPassword } from '../redux/action';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");

    // const forgotHandler = () => {
    //     dispatch(forgetPassword(email))
    //     navigation.navigate("resetPassword")
    // }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#00a7e5' }}>Forgot Password</Text>
            <Text style={{ fontWeight: '100', margin: 50 }}>Enter your username here and we will send you instruction on your
                email address to reset your Password.</Text>
            <View style={{ width: '80%' }}>
                <TextInput
                    variant="standard" label="User Name"
                    placeholder="Enter Username"
                    color='#00ae57'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 15, color: '#FF0000', right: 0, position: 'absolute' }}>Return Login?</Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Button title="Continue" color='#00a7e5' />
            </View>
        </View>
        // <View style={{ flex: 1 }}>
        //     {/* <ImageBackground source={require('../assets/img/login-bg.jpg')} style={{ flex: 1, alignItems: 'center' }}> */}
        //     <View style={{
        //         flex: 1,
        //         // backgroundColor: '#fff',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         width: '98%'
        //     }}>
        //         <Text style={{ fontSize: 20, margin: 10, color: '#00a7e5', alignItems: 'center', fontWeight:'bold' }}> Forget Password ?</Text>
        //         <Text style={{fontSize: 8, margin:10, color:'#000000',fontWeight:'50',}}>Enter your username here and we will send you instruction on your 
        //             email address to reset your Password.
        //         </Text>
        //         <View style={{ width: '70%',marginTop:50 }}>
        //             <TextInput
        //                 variant="standard" label="User Name"
        //                 placeholder="Enter Username"
        //                 color='#00ae57'
        //                 value={email}
        //                 onChangeText={setEmail}
        //             />
        //             <Text style={{fontSize:10, color:'#FF0000' , marginLeft: 200, }}>Return Login?</Text>
        //         </View>
        //     </View>
        //     <View style={{ marginBottom:100,alignItems:'center' }}>
        //         <Button title="Continue" color='#00a7e5'  />
        //     </View>
        //     {/* </ImageBackground> */}
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
    },
})

export default ForgotPassword