import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { forgetPassword } from '../redux/action';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const forgotHandler = () => {
        dispatch(forgetPassword(email))
        navigation.navigate("resetPassword")
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/img/login-bg.jpg')} style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                    flex: 1,
                    // backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80%'
                }}>
                    <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <Button
                        style={styles.btn}
                        onPress={forgotHandler}
                        color="#fff"
                    >
                        Send Email
                    </Button>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15
    },
    btn: {
        backgroundColor: '#900',
        padding: 5,
        width: '70%'
    }
})

export default ForgotPassword