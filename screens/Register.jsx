import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/action';
import mime from 'mime';

const Register = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    const handelImage = () => {
        navigation.navigate("camera", {
            updateProfile: false
        })
    }

    const registerHandler = async () => {
        if (avatar == null || avatar == undefined || avatar == '') {
            return alert("Please Add Profile Photo")
        }
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })

        dispatch(register(myForm))
    }

    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }
    }, [route])

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
                    <Avatar.Image
                        size={100}
                        source={{ uri: avatar ? avatar : null }}
                        style={{ backgroundColor: '#900' }}
                    />
                    <TouchableOpacity onPress={handelImage}>
                        <Text style={{ color: '#900' }}>Add Photo</Text>
                    </TouchableOpacity>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            secureTextEntry
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Button
                        disabled={!email || !password || !name}
                        style={styles.btn}
                        onPress={registerHandler}
                    >
                        <Text style={{ color: '#fff' }}>Register</Text>
                    </Button>
                    <TouchableOpacity onPress={() => navigation.navigate("login")}>
                        <Text style={{
                            color: '#900',
                            height: 30,
                            margin: 20
                        }}> Have an account, Login</Text>
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
        fontSize: 15
    },
    btn: {
        backgroundColor: '#900',
        padding: 5,
        width: '70%'
    }
})

export default Register