import React, { useEffect } from 'react';
import { RefreshControl, View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView,BackHandler, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import PendingForAprovalPO from './statusWisePO/PendingForAprovalPO'
import ApprovedPO from './statusWisePO/ApprovedPO';
import RejectedPO from './statusWisePO/RejectedPO';
import InProgressPO from './statusWisePO/InProgressPO';
import SoCreatedPO from './statusWisePO/SoCreatedPO';
import DeliveredPO from './statusWisePO/DeliveredPO';
import PartialPO from './statusWisePO/PartialPO';
import PartialDeliveredPO from './statusWisePO/PartialDeliveredPO';
import CompletedPO from './statusWisePO/CompletedPO';

const Tab = createMaterialTopTabNavigator();

const MyPurchaseOrder = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button title="Create PO" color='#00a7e5' onPress={() => navigation.navigate("createPO")} />
                </View>
            ),
        });
    }, [navigation]);

    return (
            <Tab.Navigator
                initialRouteName='pendingForApprovalPO'
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "#555",
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    tabBarItemStyle: {
                        width: 'auto',
                        alignItems: 'flex-start',
                    },
                    tabBarScrollEnabled: true
                })}
            >
                <Tab.Screen
                    name='pendingForApprovalPO'
                    component={PendingForAprovalPO}
                    options={{
                        title: "Pending For Approval"
                    }}
                />
                <Tab.Screen
                    name='approvedPO'
                    component={ApprovedPO}
                    options={{
                        title: "Approved"
                    }}
                />
                <Tab.Screen
                    name='rejectedPO'
                    component={RejectedPO}
                    options={{
                        title: "Rejected"
                    }}
                />

                <Tab.Screen
                    name='inProgressPO'
                    component={InProgressPO}
                    options={{
                        title: "In Progress"
                    }}
                />
                <Tab.Screen
                    name='soCreatedPO'
                    component={SoCreatedPO}
                    options={{
                        title: "So Created"
                    }}
                />
                <Tab.Screen
                    name='deliveredPO'
                    component={DeliveredPO}
                    options={{
                        title: "Delivered"
                    }}
                />
                <Tab.Screen
                    name='partialPO'
                    component={PartialPO}
                    options={{
                        title: "Partial"
                    }}
                />
                <Tab.Screen
                    name='partialDeliveredPO'
                    component={PartialDeliveredPO}
                    options={{
                        title: "Partial Delivered"
                    }}
                />
                <Tab.Screen
                    name='completedPO'
                    component={CompletedPO}
                    options={{
                        title: "Completed"
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

export default MyPurchaseOrder