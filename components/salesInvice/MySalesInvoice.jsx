import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, RefreshControl, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Swipeable } from 'react-native-gesture-handler';
import { inrDateFormatNoTime, inrFormat } from '../../redux/constants';
import PendingSO from '../salesorder/statusWiseSO/PendingSO';
import DeliveredSO from '../salesorder/statusWiseSO/DeliveredSO';
import PartialSO from '../salesorder/statusWiseSO/PartialSO';
import CancelledSO from '../salesorder/statusWiseSO/CancelledSO';
import ClosedSO from '../salesorder/statusWiseSO/ClosedSO';

const { height, width } = Dimensions.get('window')
const Tab = createMaterialTopTabNavigator();

const MySalesInvoice = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    {/* <Button title="Create SI" color='#00a7e5' onPress={() => navigation.navigate("createSI")} /> */}
                </View>
            ),
        });
    }, [navigation]);
    const Card = ({ list }) => {
        const leftSwipe = () => {
            return <View style={styles.deleteBox}>
                <Icon name="file-invoice" size={30} color="#900" />
            </View>
        }
        return (
            <Swipeable renderLeftActions={leftSwipe} key={list.id}>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <View style={styles.container}>
                        <View style={styles.item}>
                            <Text style={{ fontWeight: '500' }}>Invoice No:<Text style={{ color: '#00a7e5' }}>{list.salesOrderId}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>Customers Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>SO Number:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>SO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>SO Amount:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>Invoice Amount:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            <Text><Text style={{ fontWeight: '500' }}>Invoice Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>

                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                            <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        );
    };

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

  

    const invoiceList = [
        { id: 1, value: '1' },
        { id: 2, value: '1' },
        { id: 3, value: '1' },
    ]
    return (
        <SafeAreaView style={{ height: height, flex: 1 }}>
            {invoiceList.length != 0 ? <FlatList
                data={invoiceList}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'red' }}>No Products Found...</Text>
            </View>}
            <Toast />
        </SafeAreaView>
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
    },

    deleteBox: {
        justifyContent: 'center',
        margin: 20
    }
});

export default MySalesInvoice