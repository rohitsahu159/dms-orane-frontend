import React, { useEffect } from 'react';
import { RefreshControl, View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getPOList } from '../../redux/actions/purchaseAction'
import { round } from 'lodash';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { inrFormat } from '../../redux/constants';

const Tab = createMaterialTopTabNavigator();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ApprovedPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let approvedPO = []
    if (poList) {
        approvedPO = poList.filter(function (li) {
            return li.status == "APPROVED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    const Card = ({ list }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
        );
    };

    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={approvedPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>

        </SafeAreaView>
    )
}

const RejectedPO = ({ navigation }) => {
    // const { loading } = useSelector(state => state.auth)
    const { poList, loading } = useSelector(state => state.poList)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let rejectedPO = []

    if (poList) {
        rejectedPO = poList.filter(function (li) {
            return li.status == "REJECTED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

        const Card = ({ list }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
             <FlatList
              showsVerticalScrollIndicator={false}
                data={rejectedPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}

const PendingForApprovalPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let pendingForApprovalPO = []
    if (poList) {
        pendingForApprovalPO = poList.filter(function (li) {
            return li.status == "PENDING_FOR_APPROVAL"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
       
        const Card = ({ list }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
           <FlatList
                showsVerticalScrollIndicator={false}
 data={pendingForApprovalPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}

const InProgressPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let inProgressPO = []
    if (poList) {
        inProgressPO = poList.filter(function (li) {
            return li.status == "IN_PROGRESS"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
    
        const Card = ({ list }) => {
            return (
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={ inProgressPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}


const SoCreatedPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let soCreatedPO = []
    if (poList) {
        soCreatedPO = poList.filter(function (li) {
            return li.status == "SO_CREATED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
    
        const Card = ({ list }) => {
            return (
                <TouchableOpacity  onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={ soCreatedPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}


const DeliveredPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let deliveredPO = []
    if (poList) {
        deliveredPO = poList.filter(function (li) {
            return li.status == "DELIVERED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
    
        const Card = ({ list }) => {
            return (
                <TouchableOpacity  onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
             <FlatList
                showsVerticalScrollIndicator={false}
                 data={deliveredPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}


const PartialdPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let partialdPO = []
    if (poList) {
        partialdPO = poList.filter(function (li) {
            return li.status == "PARTIAL"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

        const Card = ({ list }) => {
            return (
                 <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
          <FlatList
                showsVerticalScrollIndicator={false}
                 data={partialdPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}


const PartialDeliveredPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let partialDeliveredPO = []
    if (poList) {
        partialDeliveredPO = poList.filter(function (li) {
            return li.status == "PARTIALLY_DELIVERED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
    
        const Card = ({ list }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}


                data={partialDeliveredPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
        </SafeAreaView>
    )
}


const CompletedPO = ({ navigation }) => {
    const { poList, loading } = useSelector(state => state.poList)

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const { user } = useSelector(state => state.auth)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sortArray": [],
            "searchCriteria": [
                { "key": "buyerUserId", "value": user.employerUserId, "operation": "EQUAL" }
            ]
        }
        dispatch(getPOList(bodyData))
    }, []);

    let completedPO = []
    if (poList) {
        completedPO = poList.filter(function (li) {
            return li.status == "COMPLETED"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");
    
        const Card = ({ list }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}>
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
            );
        };
    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}


                data={completedPO || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.container}>
                <Text style={{ flex: 1, justifyContent: 'center', textAlign: 'center', color: 'red' }}>No Products Found...</Text>
            </View>
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