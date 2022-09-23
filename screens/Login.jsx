import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions/userAction';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

const Login = () => {
    const dispatch = useDispatch()

    const { isAuthenticated, loading, message, error } = useSelector(state => state.auth)

    const navigation = useNavigation()
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [checked, setChecked] = React.useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const loginHandler = () => {
        let bodyData = {
            'userId': userName, 'password': password
        }
        dispatch(login(bodyData))
    }

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch({ type: "clearError" })
        }
    }, [alert, dispatch, error])

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', width: '100%' }}>
                <Image style={styles.icon} source={require("../assets/img/h.png")} />
            </View>
            <View style={{ width: '80%', marginVertical: 40 }}>
                <Text style={{ fontSize: 40, color: '#00a7e5' }}>LOGIN</Text>
            </View>
            <View style={{ width: '80%' }}>
                <TextInput
                    variant="standard" label="User Name"
                    placeholder="Enter User Name"
                    color='#00a7e5'
                    value={userName}
                    onChangeText={setUserName}
                    trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} name="account" {...props} />} {...props} />
                    )}
                />
                <View style={{ margin: 20 }}></View>
                <TextInput
                    variant="standard" label="Password"
                    color='#00a7e5'
                    placeholder="Enter User Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={passwordVisibility}
                    trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} onPress={() => { handlePasswordVisibility() }} name={rightIcon} {...props} />} {...props} />
                    )}
                />
            </View>
            <View style={{ flexDirection: 'row', width: '80%' }}>
                <View style={{ width: '30%', flexDirection: 'row' }}>
                    <Text style={{ marginTop: 10 }}>Remember me</Text>
                    <Checkbox
                        color='#00a7e5'
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                </View>
                <View style={{ width: '70%', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
                        <Text style={{ textAlign: 'right', color: 'red', right: 0 }}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 35, width: '80%' }}>
                <Button onPress={loginHandler} title="Login" color='#00a7e5' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width
    },
    icon: {
        height: 150,
        width: "100%",
    },
})

export default Login