import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getPOList } from '../../redux/purchaseAction/action'
import { round } from 'lodash';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';

const Tab = createMaterialTopTabNavigator();

const ApprovedPO = ({ navigation }) => {
    // const { loading } = useSelector(state => state.auth)
    const { poList, loading } = useSelector(state => state.poList)

    let approvedPO = []
    if (poList) {
        approvedPO = poList.filter(function (li) {
            return li.status == "APPROVED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {approvedPO && approvedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center' }}>{round(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const PendingPO = ({ navigation }) => {
    // const { loading } = useSelector(state => state.auth)
    const { poList, loading } = useSelector(state => state.poList)

    let pendingPO = []
    if (poList) {
        pendingPO = poList.filter(function (li) {
            return li.status == "PENDING_FOR_APPROVAL"
        })
    }


    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {pendingPO && pendingPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center' }}>{round(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const RejectedPO = ({ navigation }) => {
    // const { loading } = useSelector(state => state.auth)
    const { poList, loading } = useSelector(state => state.poList)

    let rejectedPO = []

    if (poList) {
        rejectedPO = poList.filter(function (li) {
            return li.status == "REJECTED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {rejectedPO && rejectedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center' }}>{round(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


const MyPurchaseOrder = ({ navigation }) => {
    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button title="Create PO" color='#00a7e5' onPress={() => navigation.navigate("createPO")} />
                </View>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (user) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 99999,
                "sortArray": [],
                "searchCriteria": [
                    { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
                ]
            }
            dispatch(getPOList(bodyData))
        }

    }, [dispatch, loading])

    const { loading, user } = useSelector(state => state.auth)

    return (
        loading ? <Loader /> : <Tab.Navigator
            initialRouteName='approvedPO'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "#555",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen
                name='approvedPO'
                component={ApprovedPO}
                options={{
                    title: "Approved"
                }}
            />
            <Tab.Screen
                name='pendingPO'
                component={PendingPO}
                data="gggkgkgkghkg"
                options={{
                    title: "Pending"
                }}
            />
            <Tab.Screen
                name='rejectedPO'
                component={RejectedPO}
                options={{
                    title: "Rejected"
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
        margin: 1,
        elevation: 8,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        width: '80%' // is 50% of container width
    }
});

export default MyPurchaseOrder