import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getPOList } from '../../redux/actions/purchaseAction'
import { round } from 'lodash';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { inrFormat } from '../../redux/constants';

const Tab = createMaterialTopTabNavigator();

const ApprovedPO = ({ navigation }) => {
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
                {approvedPO.length != 0 ? approvedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
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
                {rejectedPO.length != 0 ? rejectedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

const PendingForApprovalPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let pendingForApprovalPO = []
    if (poList) {
        pendingForApprovalPO = poList.filter(function (li) {
            return li.status == "PENDING_FOR_APPROVAL"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {pendingForApprovalPO.length != 0 ? pendingForApprovalPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

const InProgressPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let inProgressPO = []
    if (poList) {
        inProgressPO = poList.filter(function (li) {
            return li.status == "IN_PROGRESS"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {inProgressPO.length != 0 ? inProgressPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const SoCreatedPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let soCreatedPO = []
    if (poList) {
        soCreatedPO = poList.filter(function (li) {
            return li.status == "SO_CREATED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {soCreatedPO.length != 0 ? soCreatedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}


const DeliveredPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let deliveredPO = []
    if (poList) {
        deliveredPO = poList.filter(function (li) {
            return li.status == "DELIVERED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {deliveredPO.length != 0 ? deliveredPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}


const PartialdPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let partialdPO = []
    if (poList) {
        partialdPO = poList.filter(function (li) {
            return li.status == "PARTIAL"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {partialdPO.length != 0 ? partialdPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}


const PartialDeliveredPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let partialDeliveredPO = []
    if (poList) {
        partialDeliveredPO = poList.filter(function (li) {
            return li.status == "PARTIALLY_DELIVERED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {partialDeliveredPO.length != 0 ? partialDeliveredPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}


const CompletedPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    let completedPO = []
    if (poList) {
        completedPO = poList.filter(function (li) {
            return li.status == "COMPLETED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    return (
        loading ? <Loader /> : <SafeAreaView>
            <ScrollView>
                {completedPO.length != 0 ? completedPO.map((list, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={{ fontWeight: '500' }}>Purchase Order No: <Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                                <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                                <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )) :
                    <View style={styles.container}>
                        <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
                    </View>}
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
        loading ? <Loader /> :
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
                    component={PendingForApprovalPO}
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
                    name='partialdPO'
                    component={PartialdPO}
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