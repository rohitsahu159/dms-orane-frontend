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
import MySalesOrder from './components/salesorder/MySalesOrder';
import MyPurchaseOrder from './components/purchaseorder/MyPurchaseOrder';
import PurchaseDetail from './components/purchaseorder/PurchaseDetail';
import SalesOrderDetail from './components/salesorder/salesOrderDetails';
import CreatePO from './components/purchaseorder/CreatePO';
import CreateSO from './components/salesorder/createSO';
import PreviewPO from './components/purchaseorder/PreviewPO';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import MyReport from './components/reports/MyReport';
import CompanyProfile from './components/Company/CompanyProfile';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function Main() {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(login({userName:'',password:''}))
    // }, [dispatch])


    const { isAuthenticated, loading } = useSelector(state => state.auth)
    return (
        loading ? <Loader /> : <NavigationContainer>
            {!isAuthenticated ?

                <Stack.Navigator initialRouteName='login'>
                    <Stack.Screen name='login' component={Login} options={{ headerShown: false, title: 'Log In' }} />
                    <Stack.Screen name='register' component={Register} options={{ headerShown: false, title: 'Register' }} />
                    {/* <Stack.Screen name='changePassword' component={ChangePassword} options={{ headerShown: false }} /> */}
                    <Stack.Screen name='forgotPassword' component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name='resetPassword' component={ResetPassword} options={{ headerShown: false }} />
                    <Stack.Screen name='camera' component={CameraComponent} options={{ headerShown: false, title: 'Camera' }} />
                    {/* <Stack.Screen name='purchaseDetail' component={PurchaseDetail} options={{ headerShown: false }} /> */}
                </Stack.Navigator> :


                <Drawer.Navigator
                    drawerContent={props => <CustomDrawer {...props} />}
                    useLegacyImplementation={true}
                    initialRouteName='dashboard'
                    screenOptions={{ drawerLabelStyle: { marginLeft: -25 } }}
                >

                    <Drawer.Screen name="dashboard" component={Dashboard} options={{
                        swipeEnabled: true,
                        drawerLabel: 'Dashboard',
                        title: 'Dashboard',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="myPurchaseOrder" component={MyPurchaseOrder} options={{
                        swipeEnabled: true,
                        drawerLabel: 'My Purchase Order',
                        title: 'My Purchase Order',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-list-sharp" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="mySalesOrder" component={MySalesOrder} options={{
                        swipeEnabled: true,
                        drawerLabel: 'My Sales Order',
                        title: 'My Sales Order',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-list-sharp" size={22} color='blue' />
                        )
                    }} />
                    {/* <Drawer.Screen name="setting" component={Setting} options={{
                        drawerLabel: 'Setting',
                        title: 'Setting',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="settings-outline" size={22} color='blue' />
                        )
                    }} /> */}
                    {/* <Drawer.Screen name="profile" component={Profile} options={{
                        drawerLabel: 'Profile',
                        title: 'Profile',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color='blue' />
                        )
                    }} /> */}
                    <Drawer.Screen name="changePassword" component={ChangePassword} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="verify" component={Verify} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="camera" component={CameraComponent} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-person-outline" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="purchaseDetail" component={PurchaseDetail} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        title: "Purchase Detail"
                    }} />
                    <Drawer.Screen name="createPO" component={CreatePO} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        title: "Create PO"
                    }} />
                    <Drawer.Screen name="createSO" component={CreateSO} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        title: "Create SO"
                    }} />
                    <Drawer.Screen name="salesOrderDetail" component={SalesOrderDetail} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        title: "Sales Order Detail"
                    }} />
                    <Drawer.Screen name="previewPO" component={PreviewPO} options={{
                        swipeEnabled: true,
                        drawerItemStyle: { display: 'none' },
                        title: "Preview PO"
                    }} />
                    <Drawer.Screen name="productList" component={ProductList} options={{
                        swipeEnabled: true,
                        drawerLabel: 'Products',
                        title: 'Products',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="ios-fast-food-outline" size={22} color='blue' />
                        )
                    }} />
                    <Drawer.Screen name="productDetail" component={ProductDetail} options={{
                        drawerItemStyle: { display: 'none' },
                        title: 'Product Detail',
                    }} />
                    <Drawer.Screen name="reportList" component={MyReport} options={{
                        swipeEnabled: true,
                        drawerLabel: 'Reports',
                        title: 'Reports',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="newspaper-outline" size={22} color='blue' />
                        )
                    }} />
                     <Drawer.Screen name="Company profile" component={CompanyProfile} options={{
                        swipeEnabled: true,
                        drawerLabel: 'Company Profile',
                        title: 'Company Profile',
                        drawerIcon: ({ color }) => (
                            <Ionicons name="md-people-sharp" size={22} color='blue' />
                        )
                    }} />
                </Drawer.Navigator>

            }
        </NavigationContainer>
    );
}
