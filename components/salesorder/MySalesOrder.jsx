import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { DataTable, Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { round, inr } from 'lodash';
const Tab = createMaterialTopTabNavigator();



const NewSO = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text>Sales Order No:</Text>
                        <Text>Customer Name:</Text>
                        <Text>SO Date:</Text>
                        <Text>Total Line Items:</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Total Value</Text>
                        <Text style={{ textAlign: 'center' }}>{round(32278.2793, 2)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const DeliveredSO = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Kpi Analysis Page</Text>
        </View>
    )
}

const PendingSO = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Over View</Text>
        </View>
    )
}

const InvoicingSO = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Kpi Analysis Page</Text>
        </View>
    )
}


const MySalesOrder = () => {

    return (
        <Tab.Navigator
            initialRouteName='newSO'
        >
            <Tab.Screen
                name='newSO'
                component={NewSO}
                options={{
                    title: "New"
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
                name='pendingSO'
                component={PendingSO}
                options={{
                    title: "Pending"
                }}
            />
            <Tab.Screen
                name='invoicingSO'
                component={InvoicingSO}
                options={{
                    title: "Invoicing"
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        elevation: 8,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        width: '80%' // is 50% of container width
    }
});

export default MySalesOrder