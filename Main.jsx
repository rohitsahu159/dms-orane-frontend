import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Setting from './screens/Setting';
import Login from './screens/Login';
import { loadUser } from './redux/action';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import CustomDrawer from './components/CustomDrawer';
import Loader from './components/Loader';
import CameraComponent from './screens/Camera';
import Verify from './screens/Verify';
import ResetPassword from './screens/ResetPassword';
import ChangePassword from './screens/ChangePassword';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

export default function Main() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    const { isAuthenticated, loading, isVerified } = useSelector(state => state.auth)
    // console.log(isVerified)
    return (
        loading ? <Loader /> : <NavigationContainer>
            {!isAuthenticated ?

                <Stack.Navigator initialRouteName='login'>
                    <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
                    {/* <Stack.Screen name='changePassword' component={ChangePassword} options={{ headerShown: false }} /> */}
                    <Stack.Screen name='forgotPassword' component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name='resetPassword' component={ResetPassword} options={{ headerShown: false }} />
                    <Stack.Screen name='camera' component={CameraComponent} options={{ headerShown: false }} />
                    {/* <Stack.Screen name='verify' component={Verify} options={{ headerShown: false }} /> */}
                </Stack.Navigator> :


                <Drawer.Navigator
                    drawerContent={props => <CustomDrawer {...props} />}
                    useLegacyImplementation={true}
                    initialRouteName={isVerified ? 'home' : 'profile'}
                    screenOptions={{ drawerLabelStyle: { marginLeft: -25 } }}
                >
                    <Drawer.Screen name="dashboard" component={Dashboard} options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={22} color={color} />
                        )
                    }} />
                    <Drawer.Screen name="setting" component={Setting} options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="settings-outline" size={22} color={color} />
                        )
                    }} />
                    <Drawer.Screen name="profile" component={Profile} options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color={color} />
                        )
                    }} />
                    <Drawer.Screen name="changePassword" component={ChangePassword} options={{
                        drawerItemStyle: { display: 'none' },
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color={color} />
                        )
                    }} />
                    <Drawer.Screen name="verify" component={Verify} options={{
                        drawerItemStyle: { display: 'none' },
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color={color} />
                        )
                    }} />
                </Drawer.Navigator>

            }
        </NavigationContainer>
    );
}
