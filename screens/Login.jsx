import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/action';

const Login = () => {
    const dispatch = useDispatch()

    const { isAuthenticated, loading, message, error } = useSelector(state => state.auth)

    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const loginHandler = () => {
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch({ type: "clearError" })
        }
    }, [alert, dispatch, error])

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
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Button
                        disabled={!email || !password}
                        style={styles.btn}
                        onPress={loginHandler}
                    >
                        <Text style={{ color: '#fff' }}>Login</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>Or</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("register")}>
                        <Text style={{
                            color: "#900",
                            height: 30,
                            margin: 20
                        }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
                        <Text>Forgot Password</Text>
                    </TouchableOpacity>
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
        fontSize: 15,
    },
    btn: {
        backgroundColor: '#900',
        padding: 5,
        width: '70%'
    }
})

export default Login