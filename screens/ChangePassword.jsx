import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword } from '../redux/action';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch()


    const changePasswordHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword))
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
                    <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                    </View>
                    <Button
                        style={styles.btn}
                        onPress={changePasswordHandler}
                        color="#fff"
                    >
                        Change
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

export default ChangePassword