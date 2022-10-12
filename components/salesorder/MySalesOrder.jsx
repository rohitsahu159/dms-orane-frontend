import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import PendingSO from './statusWiseSO/PendingSO';
import DeliveredSO from './statusWiseSO/DeliveredSO';
import PartialSO from './statusWiseSO/PartialSO';
import CancelledSO from './statusWiseSO/CancelledSO';
import ClosedSO from './statusWiseSO/ClosedSO';
const Tab = createMaterialTopTabNavigator();
 
const MySalesOrder = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button title="Create SO" color='#00a7e5' onPress={() => navigation.navigate("createSO")} />
                </View>
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName='pendingSO'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "#555",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarItemStyle: {
                    width: 100,
                    alignItems: 'center',
                },
                tabBarScrollEnabled: true
            })}
        >
            <Tab.Screen
                name='pendingSO'
                component={PendingSO}
                options={{
                    title: "Pending"
                }}
            />
            <Tab.Screen
                name='deliveredSO'
                component={DeliveredSO}
                options={{
                    title: "Delivered"
                }}
            />
            <Tab.Screen
                name='partialSO'
                component={PartialSO}
                options={{
                    title: "Partial"
                }}
            />
            <Tab.Screen
                name='cancelledSO'
                component={CancelledSO}
                options={{
                    title: "Cancelled"
                }}
            />
            <Tab.Screen
                name='closedSO'
                component={ClosedSO}
                options={{
                    title: "Closed"
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 1,
        elevation: 8,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        width: '80%' // is 50% of container width
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default MySalesOrder