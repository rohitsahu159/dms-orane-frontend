import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/userAction/action';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const dispatch = useDispatch()

    const { isAuthenticated, loading, message, error } = useSelector(state => state.auth)

    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [checked, setChecked] = React.useState(false);

    const loginHandler = () => {
        let bodyData ={
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

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', width: '100%' }}>
                <Image style={styles.icon} source={require("../assets/img/h.png")} />
            </View>
            <View style={{ paddingRight: '50%',marginVertical:50 }}>
                <Text style={{  fontSize: 50, color: '#00a7e5' }}>LOG IN</Text>
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
                <View style={{margin:20}}></View>
                <TextInput
                    variant="standard" label="Password"
                    color='#00a7e5'
                    placeholder="Enter User Password"
                    value={password}
                    onChangeText={setPassword}
                    trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} name="lock" {...props} />} {...props} />
                    )}
                />
            </View>
            
              <View>
                <Text style={{marginRight:200,top:5,}}>Remember me</Text>
              </View>
                 <View style={{top:-20,marginRight:70}}>
                   <Checkbox 
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setChecked(!checked);
                            }}
                    />
                 </View>
                 

                 
              <View>
                <Text style={{marginLeft:180,top:-48,}}>Forgot Password ?</Text>
              </View>
            <View style={{margin:10}}>
                <Button onPress={loginHandler} title="Log In" color='#00a7e5' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:100
    },
    icon: {
        height: 150,
        width: "100%",
    },
})

export default Login